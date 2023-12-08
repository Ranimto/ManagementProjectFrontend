import { Role } from "./Role";
import { Requisition } from "./requisition";
import { Report } from "./report";

export class User {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public email!:string;
    public password!:string;
    public phone!:string;
    public imageURL!:string;
    public createdAt!:string;
    public tfaEnabled!: boolean;
    public secret !: String;
    public position!: string;
    public role!:Role;
    public requisitions!: Requisition;
    public reports !: Report;
}
