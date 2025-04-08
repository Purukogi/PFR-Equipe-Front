export interface Reservation {
    numeroTable?: number;
    nomClient: string;
    nbPersonne: number;
    horaireReservation: Date;
    statut: string;
    idRestaurant: number;
}
