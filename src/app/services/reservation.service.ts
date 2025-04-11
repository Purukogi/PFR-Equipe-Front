import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { TableRestaurant } from '../interfaces/table-restaurant';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private URL_BASE = "http://localhost:8080/reservations/";
  private URL_TABLES = "http://localhost:8080/tables/";

  constructor(private client: HttpClient) { }

  private toLocalDate(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  get_reservations(id_restaurant: string) {
    return this.client.get<Reservation[]>(this.URL_BASE + id_restaurant);
  }

  accepter_avec_resa(idTable: number, reservation: Reservation) {
    reservation.horaireReservation = this.toLocalDate(new Date(reservation.horaireReservation));
    return this.client.put<Reservation>(`${this.URL_TABLES}${idTable}`, reservation);
  }

  accepter_sans_resa(idTable: number, nbPersonne: number, id_restaurant: string, numeroTable: number) {
    // Création d'une nouvelle réservation pour un client sans réservation
    const nouvelleReservation = {
      idTable: idTable,
      nomClient: 'sans_resa',
      nbPersonne: nbPersonne,
      horaireReservation: this.toLocalDate(new Date()),
      statut: 'Présent',
      idRestaurant: parseInt(id_restaurant),
      numeroTable: numeroTable,
      
    };

    return this.client.put<Reservation>(`${this.URL_TABLES}${idTable}`, nouvelleReservation);
  }

  // Ajout d'une nouvelle réservation
  ajouter_reservation(id_restaurant: string, reservation: Reservation) {
    reservation.horaireReservation = this.toLocalDate(new Date(reservation.horaireReservation));
    return this.client.post(this.URL_BASE + id_restaurant, reservation);
  }

  // Récupérer une réservation par son ID
  get_reservation_by_id(idReservation: string) {
    return this.client.get<Reservation>(`${this.URL_BASE}reservation/${idReservation}`);
  }

  // Mettre à jour une réservation
  update_reservation(reservation: Reservation) {
    reservation.horaireReservation = this.toLocalDate(new Date(reservation.horaireReservation));
    return this.client.put(this.URL_BASE + reservation.id, reservation);
  }
  
  attribuer_table(idRestaurant: string, idReservation: string, table: {numeroTable: number}) {
    return this.client.put<Reservation>(`${this.URL_BASE}${idRestaurant}/${idReservation}`, table);
  }

  get_tables_disponibles(idRestaurant: string, idReservation: string) {
    return this.client.get<TableRestaurant[]>(`${this.URL_BASE}${idRestaurant}/${idReservation}`);
  }
}