export interface ResetPasswordRequest {
    id?: string;
    email: string;
    expiresAt: any;
    userId?: string;
}