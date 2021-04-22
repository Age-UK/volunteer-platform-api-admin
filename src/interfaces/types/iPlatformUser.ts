export interface PlatformUser {
    userId:string;
    email:string;
    isActive:boolean;
    userType:string;
    role:string;
    forenames:string;
    surname:string;
    divisions?:any;
}