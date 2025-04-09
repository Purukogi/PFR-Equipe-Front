import { Injectable } from '@angular/core';
import { Employe } from '../interfaces/employe';
import { Router } from '@angular/router';


/**
 * Ce service sert uniquement à faire passer les détails d'un employe de l'Employe-Item vers le formulaire de modification
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeDetailsService {
  employe ?: Employe;
  
  //id restaurant ici du à sa présence dans les endpoint du back
  id_restaurant ?: number;
  
  constructor(private router : Router) { }
  
  afficherDetails(id_restaurant: number, employe: Employe) {
    this.employe = employe;
    this.id_restaurant = id_restaurant; 
    this.router.navigate(['/modification-employe'])
  }

}
