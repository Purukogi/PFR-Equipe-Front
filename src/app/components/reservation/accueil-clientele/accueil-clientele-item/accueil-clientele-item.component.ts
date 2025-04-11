import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableRestaurant } from '../../../../interfaces/table-restaurant';
import { Router } from '@angular/router';
import { Reservation } from '../../../../interfaces/reservation';

@Component({
  selector: 'app-accueil-clientele-item',
  imports: [CommonModule],
  templateUrl: './accueil-clientele-item.component.html',
  styleUrl: './accueil-clientele-item.component.css'
})
export class AccueilClienteleItemComponent {
  @Input()
  table_restaurant ?: TableRestaurant;
  @Input()
  reservation ?: Reservation;

  constructor(private router: Router) {}

}
