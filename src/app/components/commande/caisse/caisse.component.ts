import { Component } from '@angular/core';
import { Commande } from '../../../interfaces/commande';
import { CommandeService } from '../../../services/commande.service';
import { CommonModule } from '@angular/common';
import { CommandeCaisseComponent } from './commande-caisse/commande-caisse.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-caisse',
  imports: [CommonModule, CommandeCaisseComponent],
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.css'
})
export class CaisseComponent {
  commandesServies: Commande[] = [];
  idRestaurant: number = 0;

  constructor(
    private commandeService: CommandeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('id_restaurant');

    if (storedId) {
      this.idRestaurant = parseInt(storedId, 10);

      this.commandeService.get_commandes_servies().subscribe(commandes => {
        this.commandesServies = commandes.map(commande => {
          const numeroTable = this.getNumeroTableForCommande(commande.idCommande);
          return {
            ...commande,
            numeroTable: numeroTable
          };
        });
      });
    }
  }

  getNumeroTableForCommande(idCommande: number): number | undefined {
    const numeroTable = localStorage.getItem(idCommande.toString());
    return numeroTable ? parseInt(numeroTable, 10) : undefined;
  }

  display_commande(idCommande: number, numeroTable: number) {
    this.router.navigate(['/detail-commande-caisse', idCommande, numeroTable]);
  }
}