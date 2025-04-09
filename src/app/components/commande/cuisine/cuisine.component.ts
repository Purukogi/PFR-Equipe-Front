import { Component } from '@angular/core';
import { Commande } from '../../../interfaces/commande';
import { CommandeService } from '../../../services/commande.service';
import { CommonModule } from '@angular/common';
import { CommandeCuisineComponent } from './commande-cuisine/commande-cuisine.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cuisine',
  imports: [CommonModule, CommandeCuisineComponent],
  templateUrl: './cuisine.component.html',
  styleUrl: './cuisine.component.css'
})
export class CuisineComponent {
  commandesEnCuisine : Commande[] = [];
  commandeSelectionnee: number = 0;
  modalInstance: any;

  constructor(private commandeService: CommandeService) {}

  ngOnInit() {
    this.getCommandesEnCuisine();
  }

  getCommandesEnCuisine() {
    this.commandeService.get_commandes_en_cuisine().subscribe({
      next: (commandes) => {
        this.commandesEnCuisine = commandes;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes en cuisine', err);
      }
    });
  }

  ouvrirPopup(idCommande: number) {
    this.commandeSelectionnee = idCommande;

    const modalEl = document.getElementById('popupStatut');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    } else {
      console.error('Élément Modal avec l\'id "popupStatut" non trouvé');
    }
  }

  changerStatut() {
    if (!this.commandeSelectionnee) return;

    this.commandeService.update_statut_prete(this.commandeSelectionnee)
      .subscribe({
        next: (res) => {
          this.modalInstance.hide();
          this.getCommandesEnCuisine();
        },
        error: (err) => {
          console.error('Erreur de mise à jour', err);
        }
      });
  }
}
