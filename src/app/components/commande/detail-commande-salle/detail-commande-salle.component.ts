import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../interfaces/commande';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-commande-salle',
  imports: [CommonModule],
  templateUrl: './detail-commande-salle.component.html',
  styleUrl: './detail-commande-salle.component.css'
})
export class DetailCommandeSalleComponent implements OnInit {
  idCommande!: number; 
  commande: Commande = { 
    idCommande: 0,
    statut: '', 
    idReservation: 0,
    assoCommandesPlatsDto: []
  };

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService
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

  changerStatut() {
    if (this.idCommande) {
      this.commandeService.update_statut_servie(this.idCommande).subscribe({
        next: (commande) => {
          this.commande = commande; 
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour du statut.");
        }
      });
    }
  }
}
