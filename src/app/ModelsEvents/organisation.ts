import { Evenement } from "./evenement";
import { Organisateur } from "./organisateur";

export class Organisation {
   public id!: number;
  public  name!: string;
  public  evenement!: Evenement;
   public organisateur!: Organisateur;
   public id_evenement!: number;
   public id_organisateur!: number;
  
}
