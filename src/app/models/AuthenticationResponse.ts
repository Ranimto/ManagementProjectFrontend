import { Role } from "./Role";

export interface AuthenticationResponse {
    accessToken?: string;
    refreshToken?:string;
    tfaEnabled?: string;
    secretImageUri?: string;
    role?: Role
  }