import { Component, OnInit } from '@angular/core';
import { TableRestaurant } from '../../../interfaces/table-restaurant';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { AccueilClienteleItemComponent } from "./accueil-clientele-item/accueil-clientele-item.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { isToday } from 'date-fns';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-accueil-clientele',
  standalone: true,
  imports: [AccueilClienteleItemComponent, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './accueil-clientele.component.html',
  styleUrls: ['./accueil-clientele.component.css']
})
export class AccueilClienteleComponent implements OnInit {

  tables: TableRestaurant[] = [];
  reservations: Reservation[] = [];
  idRestaurant: string = '';

  tableSelectionnee?: TableRestaurant;
  reservationSelectionnee?: Reservation;
  tableModal: any;
  formulaireReservation: FormGroup;

  constructor(
    private serviceTable: TableRestaurantService, 
    private serviceReservation: ReservationService,
    private fb: FormBuilder
  ) {    
    // Initialisation du formulaire
    this.formulaireReservation = this.fb.group({
      nomClient: ['', Validators.required],
      nbPersonne: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = localStorage.getItem('id_restaurant');
    this.idRestaurant = id ? id : '';
    
    // Initialiser la modal Bootstrap
    this.initialiserModal();

    if (this.idRestaurant) {
      const idRestaurantNum = parseInt(this.idRestaurant);
      
      if (!isNaN(idRestaurantNum)) {
        this.chargerDonnees();
      }
    }
  }

  chargerDonnees(): void {
    const idRestaurantNum = parseInt(this.idRestaurant);
    
    // Charger d'abord les réservations
    this.serviceReservation.get_reservations(this.idRestaurant).subscribe({
      next: (response) => {
        this.reservations = response.filter(res => {
          const dateRes = new Date(res.horaireReservation);
          return isToday(dateRes);
        });
        console.log('Réservations du jour récupérées:', this.reservations);
        
        // Puis charger les tables
        this.serviceTable.get_tables(idRestaurantNum).subscribe({
          next: (tablesResponse) => {
            // Sauvegarder toutes les tables
            const toutesLesTables = tablesResponse;
            
            // Filtrer les tables qui n'ont pas de réservation avec statut "Présent"
            this.tables = toutesLesTables.filter(table => {
              const reservation = this.obtenirReservationPourTable(table.numeroTable);
              return !reservation || reservation.statut !== "Présent";
            });
            
            console.log('Tables filtrées:', this.tables);
          },
          error: (erreur) => {
            console.error('Erreur lors du chargement des tables:', erreur);
          }
        });
      },
      error: (erreur) => {
        console.error('Erreur lors du chargement des réservations:', erreur);
      }
    });
  }

  initialiserModal(): void {
    // Attendre que le DOM soit chargé
    setTimeout(() => {
      const element = document.getElementById('tableModal');
      if (element) {
        // Initialiser la modal Bootstrap
        this.tableModal = new bootstrap.Modal(element);
      }
    }, 100);
  }

  obtenirReservationPourTable(numeroTable: number): Reservation | undefined {
    return this.reservations.find(r => r.numeroTable === numeroTable && r.statut !== "Présent");
  }

  // Méthode pour ouvrir la modale de table
  ouvrirModalTable(table: TableRestaurant): void {
    this.tableSelectionnee = table;
    this.reservationSelectionnee = this.obtenirReservationPourTable(table.numeroTable);
    
    if (!this.reservationSelectionnee) {
      // Réinitialiser le formulaire pour une nouvelle réservation
      this.formulaireReservation.reset({
        nomClient: '',
        nbPersonne: 1
      });
    }
    
    if (this.tableModal) {
      this.tableModal.show();
    } else {
      console.error('Modal non initialisée');
      this.initialiserModal();
      setTimeout(() => {
        if (this.tableModal) this.tableModal.show();
      }, 200);
    }
  }

  // Méthode pour confirmer une réservation existante
  accepterReservation(): void {
    if (this.reservationSelectionnee && this.tableSelectionnee) {
      // Mettre à jour le statut de la réservation à "Présent"
      const reservationMiseAJour: Reservation = {
        ...this.reservationSelectionnee,
        statut: 'Présent'
      };
      
      this.serviceReservation.accepter_avec_resa(
        this.tableSelectionnee.id, 
        reservationMiseAJour
      ).subscribe({
        next: (response) => {
          console.log('Réservation mise à jour:', response);
          
          // Mettre à jour la liste des réservations
          const index = this.reservations.findIndex(r => r.id === this.reservationSelectionnee!.id);
          if (index !== -1) {
            this.reservations[index] = response;
          }
          
          // Supprimer la table de la liste d'affichage car elle est maintenant occupée
          this.tables = this.tables.filter(t => t.numeroTable !== this.tableSelectionnee!.numeroTable);
          
          this.tableModal.hide();
        },
        error: (erreur) => {
          console.error('Erreur lors de la mise à jour de la réservation:', erreur);
        }
      });
    }
  }

  // Méthode pour créer une nouvelle réservation (client sans réservation)
  creerNouvelleReservation(): void {
    if (this.tableSelectionnee && this.formulaireReservation.valid) {
      const valeursFormulaire = this.formulaireReservation.value;

      const reservation = {
        idTable: this.tableSelectionnee.id,  
        numeroTable: this.tableSelectionnee.numeroTable,  
        statut: 'Présent', 
        idRestaurant: this.idRestaurant, 
        horaireReservation: new Date().toISOString(), 
        nbPersonne: valeursFormulaire.nbPersonne, 
        nomClient: valeursFormulaire.nomClient 
      };

      this.serviceReservation.accepter_sans_resa(
        reservation.idTable,
        reservation.nbPersonne, 
        reservation.idRestaurant,
        reservation.numeroTable
      ).subscribe({
        next: (response) => {
          console.log('Nouvelle réservation créée:', response);
          
          // Ajouter la nouvelle réservation à la liste
          this.reservations.push(response);
          
          // Supprimer la table de la liste d'affichage car elle est maintenant occupée
          this.tables = this.tables.filter(t => t.numeroTable !== this.tableSelectionnee!.numeroTable);
          
          this.tableModal.hide();
        },
        error: (erreur) => {
          console.error('Erreur lors de la création de la réservation:', erreur);
        }
      });
    }
  }
}