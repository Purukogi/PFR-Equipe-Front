import { Component } from '@angular/core';
import { Reservation } from '../../../../interfaces/reservation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-item',
  imports: [CommonModule],
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.css'
})
export class ReservationItemComponent {
  reservation ?: Reservation;

  
}
