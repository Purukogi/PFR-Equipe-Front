import { Component, Input } from '@angular/core';
import { Reservation } from '../../../../interfaces/reservation';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  assignerTable() {
    if (this.reservation?.id && !this.reservation.numeroTable) {
      this.router.navigate(['/reservations/attribuer-table', this.reservation.id]);
    }
  }
}
