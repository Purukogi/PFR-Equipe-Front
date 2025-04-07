import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormulaireConnexionComponent } from "./components/admin/formulaire-connexion/formulaire-connexion.component";

@Component({
  selector: 'app-root',
  imports: [FormulaireConnexionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PFR-Equipe-Front';
}
