import { Component, OnInit } from '@angular/core';
import { Employe } from '../../../interfaces/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { EmployeItemComponent } from "./employe-item/employe-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe-liste',
  imports: [EmployeItemComponent, CommonModule],
  templateUrl: './employe-liste.component.html',
  styleUrl: './employe-liste.component.css'
})
export class EmployeListeComponent implements OnInit {
  
  id ?: number;
  employes : Employe[] = [];
  
  constructor(private route : ActivatedRoute,
              private service : EmployeService,
              private router : Router) {}
    
    ngOnInit(): void {    
      this.route.paramMap.subscribe(params => {
        let id_param = params.get("id");
        
        if (id_param) {
          this.id = Number.parseInt(id_param);
          this.service.getEmployes(this.id).subscribe(
            response => this.employes = response
          );
        }
        
      });
    }

    ajouterEmployer() {
      this.router.navigate(['/creation-employe', this.id]);   
    }

  }
