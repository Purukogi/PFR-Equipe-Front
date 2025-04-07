import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = "http://localhost:8080/reservations/"

  constructor(private client: HttpClient) { }

  get_reservations() {
    return this.client.get<Reservation[]>(this.BASE_URL + "id_restaurant");
  }
}
