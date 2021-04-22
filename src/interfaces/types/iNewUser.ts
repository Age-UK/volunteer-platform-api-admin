export interface NewUser {
    email: string;
    isActive: boolean;
    salt?: any;
    hash?: string;
}