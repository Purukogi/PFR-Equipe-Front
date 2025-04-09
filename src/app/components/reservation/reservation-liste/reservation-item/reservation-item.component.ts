import { Component, Input } from '@angular/core';
import { Reservation } from '../../../../interfaces/reservation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.css'
})
export class ReservationItemComponent {
  @Input()
  reservation ?: Reservation;

  
}
