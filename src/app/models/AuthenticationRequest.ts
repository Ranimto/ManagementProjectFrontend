import { Role } from "./Role";

export class AuthenticationRequest {
    email?: string;
    password?: string;
    role?: Role;
    token?:string
  }