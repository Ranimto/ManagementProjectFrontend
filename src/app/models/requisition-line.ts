import { ProductModel } from "./product";
import { Requisition } from "./requisition";

export class RequisitionLine {
    public  id !: number ;
    public  quantity !: number;
    public  unitPrice !: number;
    public product !: ProductModel;
    public totalAmount !: number;
    public nonCatalogItemDescription !: String;
    public requisition!: Requisition;
}
