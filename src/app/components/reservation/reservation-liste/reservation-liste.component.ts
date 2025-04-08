import { Component } from '@angular/core';
import { ReservationItemComponent } from "./reservation-item/reservation-item.component";
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-liste',
  standalone: true,
  imports: [ReservationItemComponent, CommonModule],
  templateUrl: './reservation-liste.component.html',
  styleUrl: './reservation-liste.component.css'
})
export class ReservationListeComponent {
   reservations : Reservation[] = [];

  constructor(private service: ReservationService) {  
    service.get_reservations(1).subscribe(response => {
      console.log("Données reçues:", JSON.stringify(response));
      this.reservations = response;
    })
  }
}
