import { Component } from '@angular/core';
import { Restaurant } from '../../../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-item',
  imports: [],
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.css'
})
export class RestaurantItemComponent {
  restaurant ?: Restaurant;
}
