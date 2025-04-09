import { Component, OnInit } from '@angular/core';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { CommonModule } from '@angular/common';
import { TableItemComponent } from './table-item/table-item.component';
import { Router } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-salle',
  imports: [CommonModule, TableItemComponent],
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.css'
})
export class SalleComponent implements OnInit{
  tables: TableRestaurant[] = [];
  idRestaurant : number = 0;
  numeroTable: number = 0;


  constructor(
    private tableService : TableRestaurantService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem("id_restaurant");
    if (storedId) {
      this.idRestaurant = parseInt(storedId, 10);
      this.tableService.get_tables(this.idRestaurant).subscribe(toutes => {
        this.tableService.get_tables_occupees(this.idRestaurant).subscribe(occupees => {
          const occupeesIds = occupees.map(t => t.id);
          this.tables = toutes.map(table => ({
            ...table,
            estOccupee: occupeesIds.includes(table.id)
          }));
        });
      });
    } else {
    console.error("id_restaurant non trouvé dans le localStorage");
    }
  }


  check_or_add_commande(idTable: number, numeroTable: number) {
    this.commandeService.get_commande_by_table(idTable).subscribe({
      next: (commande) => {
        if (commande && commande.idCommande) {
          this.router.navigate(['/detail-commande-salle', commande.idCommande, numeroTable]);
        } else {
          this.add_commande(idTable, numeroTable);
        }
      },
      error: (err) => {
        if (err.status === 204) {
          this.add_commande(idTable, numeroTable);
        } else {
          console.error("Erreur lors de la vérification de commande :", err);
        }
      }
    });
  }

  add_commande(idTable: number, numeroTable: number) {
    this.commandeService.add_commande(idTable).subscribe({
      next: (commande) => {
        localStorage.setItem(commande.idCommande.toString(), numeroTable.toString());
        this.router.navigate(['/creation-commande', commande.idCommande, numeroTable]);
      },
      error: (err) => {
        console.error("Erreur création commande :", err);
      }
    });
  }


}
