import { PurchaseManager } from "./purchase-manager";
import { PurchaseOrder } from "./purchase-order";

export class Invoice {
    public id!: number;
    public reference!: string;
    public price!: number;
    public TVA!:number;
    public invoiceDate!:Date;
    public purchaseManager!:PurchaseManager;
    public purchaseOrder!:PurchaseOrder;
   
}
