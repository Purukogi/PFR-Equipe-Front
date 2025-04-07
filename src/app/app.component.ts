import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationEmployeComponent } from "./components/global/navigation-employe/navigation-employe.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationEmployeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PFR-Equipe-Front';
}
