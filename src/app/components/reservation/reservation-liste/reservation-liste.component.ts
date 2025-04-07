import { Component } from '@angular/core';
import { ReservationItemComponent } from "./reservation-item/reservation-item.component";
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-liste',
  imports: [ReservationItemComponent],
  templateUrl: './reservation-liste.component.html',
  styleUrl: './reservation-liste.component.css'
})
export class ReservationListeComponent {
  reservations : Reservation[] = [];

  constructor(private service: ReservationService) {  
    service.get_reservations().subscribe(response => {
      this.reservations = response;
    })
  }
}
