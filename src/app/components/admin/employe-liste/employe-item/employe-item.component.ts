import { Component, Input } from '@angular/core';
import { Employe } from '../../../../interfaces/employe';
import { EmployeService } from '../../../../services/employe.service';
import { Router } from '@angular/router';
import { EmployeDetailsService } from '../../../../services/employe-details.service';

@Component({
  selector: 'app-employe-item',
  imports: [],
  templateUrl: './employe-item.component.html',
  styleUrl: './employe-item.component.css'
})
export class EmployeItemComponent {
  
  @Input()
  employe ?: Employe;
  
  //cet input est juste là parce qu'on demande l'id restaurant dans l'endpoint de delete du back
  @Input()
  id_restaurant ?: number;
  
  constructor(private service : EmployeService,
              private detailsService : EmployeDetailsService,
              private router : Router) {}
    
    supprimerEmploye() {
      this.service.deleteEmploye(this.id_restaurant!, this.employe?.id!).subscribe(
        _ => {
          console.log("Employe supprimé avec succès");
          //On notifie à notre service qu'un changement a été effectué dans la BDD, afin que les observers soient notifiés à leur tour
          //cela leurs permet de mettre à jour leurs données sans avoir à refresh la page 
          this.service.notify();
        }     
      );
    }

    detailsEmploye() {
      this.detailsService.afficherDetails(this.id_restaurant!, this.employe!);    
    }
    
  }
  