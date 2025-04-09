import { Component } from '@angular/core';
import { Employe } from '../../../interfaces/employe';
import { EmployeDetailsService } from '../../../services/employe-details.service';
import { EmployeService } from '../../../services/employe.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-modification-employe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulaire-modification-employe.component.html',
  styleUrl: './formulaire-modification-employe.component.css'
})
export class FormulaireModificationEmployeComponent{
  
  employe ?: Employe;

  id_restaurant ?: number;
  
  formulaire_modification : FormGroup;
  
  constructor(private detailService : EmployeDetailsService,
              private service : EmployeService,
              private router : Router){
      this.employe = this.detailService.employe;
      this.id_restaurant = this.detailService.id_restaurant;
      this.formulaire_modification = new FormGroup({
        nom : new FormControl(this.employe?.nom, Validators.required),
        prenom : new FormControl(this.employe?.prenom, Validators.required),
        login : new FormControl(this.employe?.login, Validators.required),
        email : new FormControl(this.employe?.email),
        telephone : new FormControl(this.employe?.telephone)
      });
    }
    
    modifierEmploye() {
      let aModifier : Employe = this.formulaire_modification.value;
      aModifier.id = this.employe?.id!;
      this.service.updateEmploye(this.id_restaurant!, aModifier).subscribe(
        _ => {
          console.log("Employé modifié avec succès");
          this.router.navigate(['/employe-liste', this.id_restaurant]);
        });
    }

    afficher_erreur(field : string, error : string) {
      return this.formulaire_modification?.get(field)?.dirty
      && this.formulaire_modification?.get(field)?.errors?.[error];
    }
    

  }
