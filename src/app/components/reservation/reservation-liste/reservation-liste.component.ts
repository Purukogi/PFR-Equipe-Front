import { Component } from '@angular/core';
import { ReservationItemComponent } from "./reservation-item/reservation-item.component";
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { isToday, isAfter, parseISO } from 'date-fns';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-liste',
  standalone: true,
  imports: [ReservationItemComponent, CommonModule, RouterModule],
  templateUrl: './reservation-liste.component.html',
  styleUrl: './reservation-liste.component.css'
})
export class ReservationListeComponent {
  reservations : Reservation[] = [];
  reservationsDuJour : Reservation[] = [];
  reservationsFutures: Reservation[] = [];
  idRestaurant: string;

  constructor(private service: ReservationService) {
    // Récupération de l'id du restaurant dans le localstorage pour afficher les réservations de ce restaurant
    const id = localStorage.getItem('id_restaurant');
    this.idRestaurant = id ? id : '';

    service.get_reservations(this.idRestaurant).subscribe(response => {
      this.reservations = response;

      const now = new Date();

      this.reservationsDuJour = this.reservations.filter(res => {
        const resDate = new Date(res.horaireReservation);
        return isToday(resDate);
      })

      this.reservationsFutures = this.reservations.filter(res => {
        const resDate = new Date(res.horaireReservation);
        return isAfter(resDate, now) && !isToday(resDate);
      });
    }); 
  }
}
