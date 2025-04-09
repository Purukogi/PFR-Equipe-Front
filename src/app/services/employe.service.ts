import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../interfaces/employe';
import { Observer } from '../interfaces/observer';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  
  //Liste des composants qui observent le service
  observers : Observer[] = [];
  
  constructor(private http : HttpClient) { }
  
  getEmployes(id_restaurant : number) { 
    return this.http.get<Employe[]>("http://localhost:8080/admin/" + id_restaurant.toString());
  }
  
  addEmploye(id_restaurant : number, employe : Employe) {
    return this.http.post("http://localhost:8080/admin/" + id_restaurant.toString(), employe);
  }
  
  deleteEmploye(id_restaurant : number, id_employe : number) {
    return this.http.delete("http://localhost:8080/admin/" + id_restaurant.toString() + "/" + id_employe.toString());
  }
  
  updateEmploye(id_restaurant : number, aModifier: Employe) {
    return this.http.put("http://localhost:8080/admin/" + id_restaurant.toString() + "/" + aModifier.id!.toString(), aModifier);
  }

  //ajoute un composant pour observer le service
  subscribe(observer : Observer){
    this.observers.push(observer);
  }
  
  //notifie les observers d'un changement par le service
  notify(){
    this.observers.forEach(o => o.notify());
  }
  
}
