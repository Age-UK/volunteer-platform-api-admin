/** @class Repository for Volunteer actions */
'use strict';
var Op = require('sequelize').Op;
import { PlatformUser } from '../interfaces/types/iPlatformUser';
import { VolunteerRow } from '../interfaces/types/iVolunteerRow';
import { VolunteerProfile } from '../interfaces/types/iVolunteerProfile';
import { PagedTotal } from '../interfaces/types/iPagedTotal';
import { UserUtil } from '../modules/user-util';

export class VolunteerRepository {
    entities: any;
    userUtil: UserUtil;
    events: any;
    sequelize: any;

    constructor(entities: any, events: any, sequelize: any) {
        this.entities = entities;
        this.userUtil = new UserUtil();
        this.events = events;
        this.sequelize = sequelize;
    }

    /**
     * Checks whether the current PlatformUser can view a volunteers details
     * @param {object} PlatformUser - current platformuser
     * @param {string} volunteerId - target volunteer the user wishes to access
     * @return {boolean} returns boolean true if the user has permission to view the volunteer
     */
    userCanViewVolunteer = async (platformUser: PlatformUser, volunteerId: string) => {
        if (platformUser.role == 'Master Admin') {
            return true;
        }

        if (platformUser.role == 'volunteer') {
            let volunteer = await this.entities.volunteer.table.findOne({ where: { userId: platformUser.userId } });
            if (volunteer) {
                if (volunteer.id == volunteerId) {
                    return true;
                }
            }
            return false;
        }

        let volunteerDivisions = await this.entities.volunteerDivisionInterest.table.findAll({
            where: {
                volunteerId: volunteerId
            }
        });

        var matchingDivisions = 0;

        if (volunteerDivisions) {
            volunteerDivisions.map(function (iv) {
                if (platformUser.divisions.indexOf(iv.divisionId) !== -1) {
                    matchingDivisions = matchingDivisions + 1;
                }
            });

            if (matchingDivisions > 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Simple findById for a volunteer that includes division interests
     * @param {string} volunteerId - target volunteer
     * @return {object} returns volunter object
     */
    getVolunteerById = async (volunteerId: string): Promise<VolunteerProfile> => {
        let volunteer: VolunteerProfile = await this.entities.volunteer.table.findOne({ where: { id: volunteerId }, include: [{ model: this.entities.volunteerDivisionInterest.table, as: 'interests' }] });

        if (volunteer) {
            return volunteer;
        }

        return null;
    }

    /**
     * Returns a filterable (paginated) list of volunteers that the current user is authorised to see
     * @param {object} PlatformUser - current platformuser
     * @param {number} limt - limit used for paging (default 10)
     * @param {number} offset - offset used for paging
     * @param {string} sSearchTerm - search term entered by the user
     * @param {object} divisionFilter - string[] of valid division IDs - will limit the result set to volunteer in the supplied divisions
     * @param {object} statusFilter - string[] of valid volunteer statuses - will limit the result set to volunteer with the supplied statuses
     * @return {object} returns an array of VolunteerRow objects
     */
    getAuthorizedVolunteers = async (platformUser: PlatformUser, limit: number, offset: number, sSearchTerm: string, divisionFilter: string[], statusFilter: string[], seq: any): Promise<VolunteerRow[]> => {

        var sDivisions: string = '';
        var sStatuses: string = '';

        if (platformUser.role == 'Master Admin') {
            if (divisionFilter && divisionFilter.length > 0) {
                divisionFilter.map(function (div) {
                    sDivisions = sDivisions + '"' + div + '"' + ',';
                });
            } else {
                platformUser.divisions.map(function (div) {
                    sDivisions = sDivisions + '"' + div + '"' + ',';
                });
            }
        } else {
            platformUser.divisions.map(function (div) {
                sDivisions = sDivisions + '"' + div + '"' + ',';
            });
        }

        sDivisions = sDivisions.slice(0, -1);

        if (statusFilter && statusFilter.length > 0) {
            statusFilter.map(function (st) {
                sStatuses = sStatuses + '"' + st + '"' + ',';
            });
        }

        sStatuses = sStatuses.slice(0, -1);

        var idQuery = 'SELECT vo.id, vo.forenames, vo.surname, vo.email, vo.postcode, vo.status from volunteer vo where vo.id IN (SELECT DISTINCT(v.id) FROM volunteer v ' +
            'INNER JOIN volunteerDivisionInterest i ON v.id = i.volunteerId ' +
            'WHERE i.divisionId IN (' + sDivisions + ') ';

        if (statusFilter && statusFilter.length > 0) {
            idQuery = idQuery + 'AND v.status IN (' + sStatuses + ') ';
        }

        idQuery = idQuery + 'AND (v.forenames LIKE \'%' + sSearchTerm + '%\' ' +
            'OR v.surname LIKE \'%' + sSearchTerm + '%\' ' +
            'OR postcode LIKE \'%' + sSearchTerm + '%\' ' +
            'OR email LIKE \'%' + sSearchTerm + '%\' )) ORDER BY surname ASC LIMIT ' + offset.toString() + ',' + limit.toString() + ' ';

        let volData:VolunteerRow[] = await seq.query(idQuery, {
            type: seq.QueryTypes.SELECT
        });

        if (volData && volData.length > 0) {

            var volIds = [];
            var volunteerRowsResult = [];

            volData.map(function (v) {
                volIds.push(v.id);
            });

            var divisions = await this.entities.division.table.findAll();

            if (divisions) {
                var volunteerDivisionInterest = await this.entities.volunteerDivisionInterest.table.findAll({ where: {
                    volunteerId: {
                        [Op.in]: volIds
                    }
                }});
            }

            volData.map(function (vr) {
                var volunteerWithDivisions:VolunteerRow;
                var interestNames = [];
                var interestsForVolunteer = volunteerDivisionInterest.filter(vi => vi.volunteerId == vr.id);

                if (interestsForVolunteer) {
                    interestsForVolunteer.map(function (iv) {
                        let div = divisions.filter(i => i.id == iv.divisionId)[0];
                        interestNames.push(div.name);
                    });
                }

                volunteerWithDivisions = {
                    id: vr.id,
                    forenames: vr.forenames,
                    surname: vr.surname,
                    email: vr.email,
                    postcode: vr.postcode,
                    status: vr.status,
                    divisions: interestNames
                };
                volunteerRowsResult.push(volunteerWithDivisions);
            });

            return volunteerRowsResult;
        }

        return [];
    }

    /**
     * Returns the overall total number of volunteers that should be returned once filters and search terms have been applied
     * @param {object} PlatformUser - current platformuser
     * @param {string} sSearchTerm - search term entered by the user
     * @param {object} divisionFilter - string[] of valid division IDs - will limit the result set to volunteer in the supplied divisions
     * @param {object} statusFilter - string[] of valid volunteer statuses - will limit the result set to volunteer with the supplied statuses
     * @return {object} returns an array of VolunteerRow objects
     */
    getAuthorizedVolunteersTotal = async (platformUser: PlatformUser, sSearchTerm: string, divisionFilter: string[], statusFilter: string[], seq: any): Promise<PagedTotal> => {

        var sDivisions: string = '';
        var sStatuses: string = '';

        if (platformUser.role == 'Master Admin') {
            if (divisionFilter && divisionFilter.length > 0) {
                divisionFilter.map(function (div) {
                    sDivisions = sDivisions + '"' + div + '"' + ',';
                });
            } else {
                platformUser.divisions.map(function (div) {
                    sDivisions = sDivisions + '"' + div + '"' + ',';
                });
            }
        } else {
            platformUser.divisions.map(function (div) {
                sDivisions = sDivisions + '"' + div + '"' + ',';
            });
        }

        sDivisions = sDivisions.slice(0, -1);

        if (statusFilter && statusFilter.length > 0) {
            statusFilter.map(function (st) {
                sStatuses = sStatuses + '"' + st + '"' + ',';
            });
        }

        sStatuses = sStatuses.slice(0, -1);
        console.log('sStatuses ' + sStatuses);

        var idQuery = 'SELECT COUNT(vo.id) AS total from volunteer vo where vo.id IN (SELECT DISTINCT(v.id) FROM volunteer v ' +
            'INNER JOIN volunteerDivisionInterest i ON v.id = i.volunteerId ' +
            'WHERE i.divisionId IN (' + sDivisions + ') ';

        if (statusFilter && statusFilter.length > 0) {
            idQuery = idQuery + 'AND v.status IN (' + sStatuses + ') ';
        }

        idQuery = idQuery + 'AND (v.forenames LIKE \'%' + sSearchTerm + '%\' ' +
            'OR v.surname LIKE \'%' + sSearchTerm + '%\' ' +
            'OR postcode LIKE \'%' + sSearchTerm + '%\' ' +
            'OR email LIKE \'%' + sSearchTerm + '%\' ))';

        let volData = await seq.query(idQuery, {
            type: seq.QueryTypes.SELECT
        });

        if (volData && volData.length > 0) {

            let returnTotal: PagedTotal = volData[0];
            return returnTotal;
        }

        return {  total: 0  };
    }

}
