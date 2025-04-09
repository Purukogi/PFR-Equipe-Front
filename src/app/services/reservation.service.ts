import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { TableRestaurant } from '../interfaces/table-restaurant';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = "http://localhost:8080/reservations/";
  private TABLE_URL = "http://localhost:8080/tables/";

  constructor(private client: HttpClient) { }

  get_reservations(id_restaurant: string) {
    return this.client.get<Reservation[]>(this.BASE_URL + id_restaurant);
  }

  accepter_avec_resa(idTable: number, reservation: Reservation) {
    return this.client.put<Reservation>(`${this.TABLE_URL}${idTable}`, reservation);
  }

  accepter_sans_resa(idTable: number, nbPersonne: number, id_restaurant: string) {
    // Création d'une nouvelle réservation pour un client sans réservation
    const newReservation = {
      nomClient: 'sans_resa',
      nbPersonne: nbPersonne,
      horaireReservation: new Date(),
      statut: 'Présent',
      idRestaurant: id_restaurant
    };

    return this.client.put<Reservation>(`${this.TABLE_URL}${idTable}`, newReservation);
  }

  // Ajout d'une nouvelle réservation
  add_reservation(id_restaurant: string, reservation: Reservation) {
    return this.client.post(this.BASE_URL + id_restaurant, reservation);
  }

  // Récupérer une réservation par son ID
  get_reservation_by_id(idReservation: string) {
    return this.client.get<Reservation>(`${this.BASE_URL}reservation/${idReservation}`);
  }

  // Mettre à jour une réservation
  update_reservation(reservation: Reservation) {
    return this.client.put(this.BASE_URL + reservation.id, reservation);
  }
  
  attribuer_table(idRestaurant: string, idReservation: string, table: {numeroTable: number}) {
    return this.client.put<Reservation>(`${this.BASE_URL}${idRestaurant}/${idReservation}`, table);
  }

  get_tables_disponibles(idRestaurant: string, idReservation: string) {
    return this.client.get<TableRestaurant[]>(`${this.BASE_URL}${idRestaurant}/${idReservation}`);
  }
}
