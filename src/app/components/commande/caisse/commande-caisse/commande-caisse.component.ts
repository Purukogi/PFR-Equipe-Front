import { Component, Input } from '@angular/core';
import { Commande } from '../../../../interfaces/commande';

@Component({
  selector: 'app-commande-caisse',
  imports: [],
  templateUrl: './commande-caisse.component.html',
  styleUrl: './commande-caisse.component.css'
})
export class CommandeCaisseComponent {
  @Input() commande!: Commande;
}
