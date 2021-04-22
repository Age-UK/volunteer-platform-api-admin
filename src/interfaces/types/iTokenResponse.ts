import { DecodedToken } from './iDecodedToken';

export interface TokenResponse {
    success:boolean;
    token?: DecodedToken;
}