import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Commande } from '../../../../interfaces/commande';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-cuisine',
  imports: [CommonModule],
  templateUrl: './commande-cuisine.component.html',
  styleUrl: './commande-cuisine.component.css'
})
export class CommandeCuisineComponent {
  @Input() commande!: Commande;
  @Output() ouvrirPopup = new EventEmitter<number>();

  constructor() {}

  onClickCommande(idCommande: number) {
    this.ouvrirPopup.emit(idCommande);
  }
  
}
