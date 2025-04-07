import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/global/footer/footer.component";
import { HeaderComponent } from "./components/global/header/header.component";
import { RestaurantListeComponent } from "./components/admin/restaurant-liste/restaurant-liste.component";
import { FormulaireConnexionComponent } from "./components/admin/formulaire-connexion/formulaire-connexion.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PFR-Equipe-Front';
}
