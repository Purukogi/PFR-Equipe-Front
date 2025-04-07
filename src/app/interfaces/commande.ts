export interface Commande {
    idCommande : number;
    statut : string;
    idReservation : number;
    assoCommandesPlatsDto: {
        plat: {
          nom: string;
        };
        quantite: number;
      }[];
}
