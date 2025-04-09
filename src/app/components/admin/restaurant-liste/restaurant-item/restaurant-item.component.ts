import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../../interfaces/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-item',
  imports: [],
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.css'
})
export class RestaurantItemComponent {
  
  @Input()
  restaurant ?: Restaurant;
  
  constructor(private router : Router){}
  
  afficherEmployes() {
    this.router.navigate(['employe-liste', this.restaurant?.id]);
  }

}
