import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeService } from '../../../services/employe.service';
import { Employe } from '../../../interfaces/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulaire-creation-employe',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulaire-creation-employe.component.html',
  styleUrl: './formulaire-creation-employe.component.css'
})
export class FormulaireCreationEmployeComponent implements OnInit {
  
  id_restaurant : number = 0;

  formulaire_creation : FormGroup;
  
  constructor(private service : EmployeService,
              private route : ActivatedRoute,
              private router : Router) {
                this.formulaire_creation = new FormGroup({
                  nom : new FormControl("", Validators.required),
                  prenom : new FormControl("", Validators.required),
                  login : new FormControl("", Validators.required),
                  email : new FormControl(""),
                  telephone : new FormControl("")
                });
              }

  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      let id_param = params.get("id");
        
      if (id_param) {
        this.id_restaurant = Number.parseInt(id_param);          
      }
        
    });
  }

  ajouterEmploye() {
    if(this.formulaire_creation.valid){
      let aAjouter : Employe = this.formulaire_creation.value;
      
      this.service.addEmploye(this.id_restaurant, aAjouter).subscribe(
        _ => {
          console.log("Employé ajouté avec succes");
          this.router.navigate(['/employe-liste', this.id_restaurant]);
        }
      );
    }
  }

  afficher_erreur(field : string, error : string) {
    return this.formulaire_creation?.get(field)?.dirty
        && this.formulaire_creation?.get(field)?.errors?.[error];
  }

}
