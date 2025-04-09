import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { ReservationService } from '../../../services/reservation.service';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { Router } from '@angular/router';
import { Reservation } from '../../../interfaces/reservation';

@Component({
  selector: 'app-formulaire-creation-resa',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulaire-creation-resa.component.html',
  styleUrl: './formulaire-creation-resa.component.css'
})
export class FormulaireCreationResaComponent {
  nomClient: string = '';
  date: string = '';
  heure: string = '';
  nbPersonne: number = 1;
  tablesDisponibles: TableRestaurant[] = [];
  idRestaurant: string;
  idReservation?: number;

  constructor(
    private reservationService: ReservationService,
    private tableService: TableRestaurantService,
    private router: Router
  ) {
    // Récupération de l'id du restaurant dans le localstorage
    const id = localStorage.getItem('id_restaurant');
    this.idRestaurant = id ? id : '';
  }

  rechercherTablesDisponibles() {
    if (this.date && this.heure && this.nbPersonne > 0) {
      const horaireReservation = new Date(`${this.date}T${this.heure}`);
      
      this.tableService.getTablesLibres(
        this.idRestaurant, 
        horaireReservation.toISOString(), 
        this.nbPersonne
      ).subscribe({
        next: (tables) => {
          this.tablesDisponibles = tables;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des tables disponibles', error);
          alert('Une erreur est survenue lors de la recherche des tables disponibles');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis');
    }
  }

  selectionnerTable(table: TableRestaurant) {
    if (this.nomClient && this.date && this.heure && this.nbPersonne > 0) {
      const horaireReservation = new Date(`${this.date}T${this.heure}`);

      const reservation: Reservation = {
        id: 1,
        nomClient: this.nomClient,
        numeroTable: table.numeroTable,
        horaireReservation: horaireReservation,
        nbPersonne: this.nbPersonne,
        statut: 'Confirmée',
        idRestaurant: parseInt(this.idRestaurant)
      };

      this.reservationService.add_reservation(this.idRestaurant, reservation)
        .subscribe({
          next: () => {
            this.router.navigate(['/reservations']);
          },
          error: (error) => {
            console.error('Erreur lors de la création de la réservation', error);
            alert('Une erreur est survenue lors de la création de la réservation');
          }
        });
    }
  }
}
