import { Plat } from "./plat";

export interface Commande {
    idCommande : number;
    statut : string;
    idReservation : number;
    assoCommandesPlatsDto: {
      plat: Plat;
      quantite: number;
    }[];
    numeroTable?: number;
}
