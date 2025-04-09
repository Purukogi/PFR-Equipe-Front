import { Component } from '@angular/core';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { AccueilClienteleItemComponent } from "./accueil-clientele-item/accueil-clientele-item.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-accueil-clientele',
  standalone: true,
  imports: [AccueilClienteleItemComponent, CommonModule, RouterModule],
  templateUrl: './accueil-clientele.component.html',
  styleUrls: ['./accueil-clientele.component.css']
})
export class AccueilClienteleComponent {

  tables: TableRestaurant[] = [];
  tablesFiltrees: TableRestaurant[] = [];
  reservations: Reservation[] = [];
  idRestaurant: string = '';

  constructor(
    private tableRestaurantService: TableRestaurantService, 
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('id_restaurant');
    this.idRestaurant = id ? id : '';
    

    if (this.idRestaurant) {
      const idRestaurant = parseInt(this.idRestaurant);
      
      if (!isNaN(idRestaurant)) {
        // Charger les réservations d'abord
        this.reservationService.get_reservations(this.idRestaurant).subscribe({
          next: (response) => {
            this.reservations = response.filter(res => {
            const resDate = new Date(res.horaireReservation);
            return isToday(resDate);
            });
            console.log('Réservations du jour récupérées:', this.reservations);
          
        // Puis charger les tables
        this.tableRestaurantService.get_tables(idRestaurant).subscribe({
          next: (response) => {
            this.tables = response;
            this.filterTables();
          }
        });;
        }
      });
      }
    }
  }

  filterTables(): void {
    // Filtrer les tables qui n'ont pas de réservation avec statut "Présent"
    this.tablesFiltrees = this.tables.filter(table => {
      const reservation = this.getReservationForTable(table.numeroTable);
      return !reservation || reservation.statut !== "Présent";
    });
    console.log('Tables filtrées:', this.tablesFiltrees);
  }

  getReservationForTable(numeroTable: number): Reservation | undefined {
    return this.reservations.find(r => r.numeroTable === numeroTable);
  }
}