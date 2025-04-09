import { Component } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../../../interfaces/commande';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-detail-commande-caisse',
  imports: [CommonModule],
  templateUrl: './detail-commande-caisse.component.html',
  styleUrl: './detail-commande-caisse.component.css'
})
export class DetailCommandeCaisseComponent {
  idCommande!: number; 
  commande: Commande = { 
    idCommande: 0,
    statut: '', 
    idReservation: 0,
    assoCommandesPlatsDto: []
  };

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private router: Router
  ) {}
  
  ngOnInit() {
    const idCommandeParam = this.route.snapshot.paramMap.get('idCommande');
    if (idCommandeParam) {
      this.idCommande = +idCommandeParam;
      this.commandeService.get_commande_by_id(this.idCommande).subscribe({
        next: (commande) => {
          this.commande = commande;
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des détails de la commande.");
        }
      });
    }
  }

  reglerCommande() {
    this.commandeService.update_statut_payee(this.idCommande).subscribe({
      next: (commande) => {
        this.commande = commande;
        const modalElement = document.getElementById('confirmationModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du statut.");
      }
    });
  }

  confirmerSuppression() {
    const modalElement = document.getElementById('confirmationModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement!);
    modalInstance?.hide();
    setTimeout(() => {
      this.commandeService.delete_commande(this.idCommande).subscribe({
        next: (msg) => {
          this.router.navigate(['/caisse']);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de la commande.");
        }
      });
    }, 300);
  }
  
  getTotal(): number {
    return this.commande.assoCommandesPlatsDto.reduce((acc, item) => {
      return acc + (item.plat.prix * item.quantite);
    }, 0);
  }

  imprimerNote() {
    const originalContents = document.body.innerHTML;
    const printContents = document.getElementById('ticket-impression')?.innerHTML;
  
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    } else {
      console.error("Impossible d’imprimer : contenu non trouvé.");
    }
  }
}
