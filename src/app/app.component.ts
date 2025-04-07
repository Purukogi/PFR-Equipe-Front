import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/global/header/header.component";
import { FooterComponent } from "./components/global/footer/footer.component";
import { SalleComponent } from "./components/commande/salle/salle.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SalleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PFR-Equipe-Front';
}
