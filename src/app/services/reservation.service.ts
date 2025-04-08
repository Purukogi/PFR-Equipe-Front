import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = "http://localhost:8080/reservations/"

  constructor(private client: HttpClient) { }

  get_reservations(id_restaurant: string) {
    return this.client.get<Reservation[]>(this.BASE_URL + id_restaurant);
  }

  // Ajout d'une nouvelle réservation
  add_reservation(id_restaurant: string, reservation: Reservation) {
    return this.client.post(this.BASE_URL + id_restaurant, reservation);
  }
}
