export interface VolunteerProfile {
    id: string;
    status: string;
    statusChangedAt: string;
    title: string;
    forenames: string;
    surname: string;
    telephone: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    town?: string;
    county?: string;
    postcode: string;
    country: string;
    stayingInTouch?: string;
    interests?: any;
}