import { Component, OnInit } from '@angular/core';
import { Employe } from '../../../interfaces/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { EmployeItemComponent } from "./employe-item/employe-item.component";
import { CommonModule } from '@angular/common';
import { Observer } from '../../../interfaces/observer';

@Component({
  selector: 'app-employe-liste',
  imports: [EmployeItemComponent, CommonModule],
  templateUrl: './employe-liste.component.html',
  styleUrl: './employe-liste.component.css'
})
export class EmployeListeComponent implements OnInit, Observer{
  
  id_restaurant ?: number;
  employes : Employe[] = [];
  
  constructor(private route : ActivatedRoute,
              private service : EmployeService,
              private router : Router) {}
    
    ngOnInit(): void {    

      //On dit à notre component d'observer EmployeService
      this.service.subscribe(this);

      this.route.paramMap.subscribe(params => {
        let id_param = params.get("id");
        
        if (id_param) {
          this.id_restaurant = Number.parseInt(id_param);
          this.service.getEmployes(this.id_restaurant).subscribe(
            response => this.employes = response
          );
        }
      });
    }

    ajouterEmployer() {
      this.router.navigate(['/creation-employe', this.id_restaurant]);   
    }

    //Implementation de la méthode qui notifie ce component d'une update de la part de EmployeService
    notify(){
      if(this.id_restaurant){
        this.service.getEmployes(this.id_restaurant).subscribe(
          response => this.employes = response
        );
      }
    }

  }
