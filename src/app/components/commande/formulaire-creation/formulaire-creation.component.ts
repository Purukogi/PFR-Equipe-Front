import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from '../../../interfaces/plat';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../interfaces/commande';

@Component({
  selector: 'app-formulaire-creation',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulaire-creation.component.html',
  styleUrl: './formulaire-creation.component.css'
})
export class FormulaireCreationComponent {
  idCommande?: number;
  numeroTable?: number;
  idRestaurant: number = 0;

  platsParCategorie: { [categorie: string]: Plat[] } = {};
  quantites: { [nomPlat: string]: number } = {};
  messageConfirmation: string = '';

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCommande = Number(this.route.snapshot.paramMap.get('idCommande'));
    this.numeroTable = Number(this.route.snapshot.paramMap.get('numeroTable'));

    const idR = localStorage.getItem('id_restaurant');
    if (idR) {
      this.idRestaurant = Number(idR);
      this.chargerPlats(this.idRestaurant);
    } else {
      console.error("id_restaurant manquant");
    }
  }

  chargerPlats(idRestaurant: number) {
    this.commandeService.get_plats_par_categorie(idRestaurant).subscribe({
      next: (data) => {
        this.platsParCategorie = data;
        for (const plats of Object.values(data)) {
          plats.forEach(plat => {
            this.quantites[plat.nom] = 0;
          });
        }
      },
      error: (err) => console.error("Erreur chargement plats :", err)
    });
  }

  changerQuantite(nomPlat: string, delta: number) {
    const nouvelleQuantite = (this.quantites[nomPlat] || 0) + delta;
    this.quantites[nomPlat] = Math.max(0, nouvelleQuantite);
  }


  validerCommande() {
    if (!this.idCommande) return;

    const assoCommandesPlatsDto = Object.entries(this.quantites)
      .filter(([_, qty]) => qty > 0)
      .map(([nom, qty]) => ({
        plat: { nom },
        quantite: qty
      }));

    const commande: Commande = {
      idCommande: this.idCommande,
      statut: 'En cuisine',
      idReservation: 0,
      assoCommandesPlatsDto
    };

    this.commandeService.ajouter_plats_commande(this.idCommande, commande).subscribe({
      next: (res) => {
        this.messageConfirmation = "La commande a été envoyée en cuisine !";
        setTimeout(() => {
          this.router.navigate(['/salle']);
        }, 3000); 
      },
      error: (err) => console.error("Erreur mise à jour commande :", err)
    });
  }

  calculerTotal(): number {
    let total = 0;
  
    for (const categorie of Object.values(this.platsParCategorie)) {
      for (const plat of categorie) {
        const quantite = this.quantites[plat.nom] || 0;
        total += plat.prix * quantite;
      }
    }
  
    return total;
  }
}