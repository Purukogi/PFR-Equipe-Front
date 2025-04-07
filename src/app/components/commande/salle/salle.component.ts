import { Component, OnInit } from '@angular/core';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { CommonModule } from '@angular/common';
import { TableItemComponent } from './table-item/table-item.component';

@Component({
  selector: 'app-salle',
  imports: [CommonModule, TableItemComponent],
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.css'
})
export class SalleComponent implements OnInit{
  tables: TableRestaurant[] = [];
  idRestaurant = 1;

  constructor(private tableService : TableRestaurantService) {}

  ngOnInit(): void {
    // D'abord, on récupère toutes les tables
    this.tableService.get_tables(this.idRestaurant).subscribe(toutes => {
      // Ensuite, on récupère les tables occupées
      this.tableService.get_tables_occupees(this.idRestaurant).subscribe(occupees => {
        const occupeesIds = occupees.map(t => t.id);
        this.tables = toutes.map(table => ({
          ...table,
          estOccupee: occupeesIds.includes(table.id)
        }));
      });
    });
  }

}
