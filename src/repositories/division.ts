/** @class Repository for Divisions */
'use strict';
export class DivisionRepository {
    entities: any;
    sequelize: any;

    constructor(entities: any, sequelize: any) {
        this.entities = entities;
        this.sequelize = sequelize;
    }

    /**
     * Checks whether a division is active
     * @param {string} id - unique identifier for the division
     * @return {boolean} returns true if division is active
     */
    divisionIsActive = async (id: string) => {
        let div = await this.entities.findByPk(id);

        if (div && div.isInactive == false) {
            return true;
        }

        return false;
    }
}
