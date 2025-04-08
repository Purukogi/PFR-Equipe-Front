import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../interfaces/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http : HttpClient) { }

  getEmployes(id_restaurant : number) { 
    return this.http.get<Employe[]>("http://localhost:8080/admin/" + id_restaurant.toString());
  }

  addEmploye(id_restaurant : number, employe : Employe) {
    return this.http.post("http://localhost:8080/admin/" + id_restaurant.toString(), employe);
  }

}
