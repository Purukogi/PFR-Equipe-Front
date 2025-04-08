import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeService } from '../../../services/employe.service';
import { Employe } from '../../../interfaces/employe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-creation-employe',
  imports: [FormsModule],
  templateUrl: './formulaire-creation-employe.component.html',
  styleUrl: './formulaire-creation-employe.component.css'
})
export class FormulaireCreationEmployeComponent implements OnInit {
  prenom : string = "";
  nom : string = "";
  login : string = "";
  mdp : string = "";
  email : string = "";
  telephone : string = "";

  id_restaurant : number = 0;
  
  constructor(private service : EmployeService,
              private route : ActivatedRoute,
              private router : Router) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      let id_param = params.get("id");
        
      if (id_param) {
        this.id_restaurant = Number.parseInt(id_param);          
      }
        
    });
  }

  ajouterEmploye() {
    let aAjouter : Employe = {
      nom : this.nom,
      prenom : this.prenom,
      email : this.email,
      telephone : this.telephone,
      login : this.login,
    };
    
    this.service.addEmploye(this.id_restaurant, aAjouter).subscribe(
      response => {
        console.log("amployé ajouté avec succes");
        this.router.navigate(['/employe-liste', this.id_restaurant]);
      }
    );
  }
}
