import { Component } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';
import { RestaurantService } from '../../../services/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-liste',
  imports: [CommonModule],
  templateUrl: './restaurant-liste.component.html',
  styleUrl: './restaurant-liste.component.css'
})
export class RestaurantListeComponent {
  restaurants : Restaurant[] = [];

  constructor (private service : RestaurantService) {
    this.getRestaurants();
  }

  getRestaurants() {
    this.service.getRestaurants().subscribe(response => this.restaurants = response);    
  }

}

