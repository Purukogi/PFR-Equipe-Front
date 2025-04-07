import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-connexion',
  imports: [FormsModule],
  templateUrl: './formulaire-connexion.component.html',
  styleUrl: './formulaire-connexion.component.css'
})
export class FormulaireConnexionComponent {

  login : string = "";
  mdp : string = "";

  constructor (private service : AuthenticationService, private router : Router) {}

  connexion() {
    this.service.connexion(this.login, this.mdp)
      .subscribe(response => {        
        this.service.store_user(response);
        this.router.navigate(['/navigation-employe']);
        });
  }
}
