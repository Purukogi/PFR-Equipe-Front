import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-employe',
  imports: [RouterModule],
  templateUrl: './navigation-employe.component.html',
  styleUrl: './navigation-employe.component.css'
})
export class NavigationEmployeComponent {
  idRestaurant: string;

  constructor() {
    const id = localStorage.getItem('id_restaurant');
    this.idRestaurant = id ? id : '';
  }
}
