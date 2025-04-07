import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-formulaire-connexion',
  imports: [FormsModule],
  templateUrl: './formulaire-connexion.component.html',
  styleUrl: './formulaire-connexion.component.css'
})
export class FormulaireConnexionComponent {

  login : string = "";
  mdp : string = "";

  constructor (private service : AuthenticationService) {}

  connexion() {
    this.service.connexion(this.login, this.mdp)
      .subscribe(response => {
        console.log("employe connecté");        
        this.service.store_user(response)});
  }
}
