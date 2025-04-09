import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableRestaurant } from '../interfaces/table-restaurant';

@Injectable({
  providedIn: 'root'
})
export class TableRestaurantService {
  private BASE_URL = "http://localhost:8080/tables";

  constructor(private client: HttpClient) { }

  get_tables(idRestaurant: number) {
    return this.client.get<TableRestaurant[]>(`${this.BASE_URL}/all/${idRestaurant}`);
  }

  get_tables_occupees(idRestaurant: number) {
    return this.client.get<TableRestaurant[]>(`${this.BASE_URL}/occupees/${idRestaurant}`);
  }

}
