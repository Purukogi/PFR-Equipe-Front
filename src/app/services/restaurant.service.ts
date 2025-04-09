import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) { }

  getRestaurants() { 
    return this.http.get<Restaurant[]>("http://localhost:8080/admin");
  }
  
}
