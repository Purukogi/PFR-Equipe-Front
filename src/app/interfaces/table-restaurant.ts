import { Reservation } from "./reservation";

export interface TableRestaurant {
    id: number;
    numeroTable: number;
    nbPlaces: number;
    
    estOccupee: boolean;
    reservation?: Reservation;
}
