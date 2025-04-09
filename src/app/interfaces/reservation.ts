export interface Reservation {
    id: number;
    numeroTable?: number;
    nomClient: string;
    nbPersonne: number;
    horaireReservation: Date;
    statut: string;
    idRestaurant: number;
}
