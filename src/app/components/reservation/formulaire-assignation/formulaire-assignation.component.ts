import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { TableRestaurantService } from '../../../services/table-restaurant.service';

@Component({
  selector: 'app-formulaire-assignation',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulaire-assignation.component.html',
  styleUrl: './formulaire-assignation.component.css'
})
export class FormulaireAssignationComponent {
  reservation?: Reservation;
  numeroTable?: number;
  tablesDisponibles: TableRestaurant[] = [];
  tableSelectionnee?: TableRestaurant;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {}
  
  ngOnInit() {
    /**
     * Récupération de l'id de réservation dans l'URL
     * Appel de la foction chargerTablesDisponibles
     */
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.reservationService.get_reservation_by_id(id).subscribe(
        (data) => {
          console.log("Données reçues du backend:", data);
          this.reservation = data;
          this.chargerTablesDisponibles(id);
        },
        (error) => {
          console.error('Erreur lors du chargement de la réservation', error);
          this.router.navigate(['/reservations', this.reservation?.idRestaurant]);
        }
      );
    } else {
      this.router.navigate(['/reservations', this.reservation?.idRestaurant]);
    }
  }

  chargerTablesDisponibles(idReservation: string) {
    if (this.reservation?.idRestaurant) {
      // Appel à l'endpoint pour récupérer les tables disponibles
      this.reservationService.get_tables_disponibles(
        this.reservation.idRestaurant.toString(), 
        idReservation
      ).subscribe(
        (tables) => {
          this.tablesDisponibles = tables;
        },
        (error) => {
          console.error('Erreur lors du chargement des tables disponibles', error);
        }
      );
    }
  }

  selectionnerTable(table: TableRestaurant) {
    this.tableSelectionnee = table;
    this.numeroTable = table.numeroTable;
  }
  
  onSubmit() {
    if (this.reservation && this.numeroTable) {
      if (this.reservation.idRestaurant) {
        // Option 1: Utiliser l'endpoint d'attribution de table existant
        this.reservationService.attribuer_table(
          this.reservation.idRestaurant.toString(),
          this.reservation.id.toString(),
          { numeroTable: this.numeroTable }
        ).subscribe(
          () => {
            this.router.navigate(['/reservations', this.reservation?.idRestaurant]);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la réservation', error);
          }
        );
      } else {
        // Option 2: Mettre à jour la réservation avec le numéro de table
        const updatedReservation = {
          ...this.reservation,
          numeroTable: this.numeroTable
        };
        
        this.reservationService.update_reservation(updatedReservation).subscribe(
          () => {
            this.router.navigate(['/reservations', this.reservation?.idRestaurant]);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la réservation', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.router.navigate(['/reservations', this.reservation?.idRestaurant]);
  }
}

