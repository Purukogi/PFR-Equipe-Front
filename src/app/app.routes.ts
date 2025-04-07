import { Routes } from '@angular/router';
import { FormulaireConnexionComponent } from './components/admin/formulaire-connexion/formulaire-connexion.component';
import { NavigationEmployeComponent } from './components/global/navigation-employe/navigation-employe.component';
import { SalleComponent } from './components/commande/salle/salle.component';
import { FormulaireCreationComponent } from './components/commande/formulaire-creation/formulaire-creation.component';

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent},
    {path : "salle", component : SalleComponent},
    {path : "creation-commande/:idCommande/:numeroTable", component : FormulaireCreationComponent},
    {path : "**", redirectTo : "/login"}
];
