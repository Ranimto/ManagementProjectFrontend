import { RequisitionStatus } from "./RequisitionStatus";
import { RequisitionLine } from "./requisition-line";
import { User } from "./user";

export class Requisition {
    public id !: number;
    public  name !: String;
    public  purpose !: String;
    public  details !: String;
    public  requestedDate !: Date;
    public  requisitionDate !: Date ;
    public  amount !: number ;
    public requisitionStatus !: RequisitionStatus;
    public user !: User;
    public requisitionLines !: RequisitionLine;
}
