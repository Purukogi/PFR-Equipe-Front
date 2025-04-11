import { Routes } from '@angular/router';
import { FormulaireConnexionComponent } from './components/admin/formulaire-connexion/formulaire-connexion.component';
import { NavigationEmployeComponent } from './components/global/navigation-employe/navigation-employe.component';
import { ReservationListeComponent } from './components/reservation/reservation-liste/reservation-liste.component';
import { NavigationAdminComponent } from './components/global/navigation-admin/navigation-admin.component';
import { RestaurantListeComponent } from './components/admin/restaurant-liste/restaurant-liste.component';
import { EmployeListeComponent } from './components/admin/employe-liste/employe-liste.component';
import { FormulaireCreationEmployeComponent } from './components/admin/formulaire-creation-employe/formulaire-creation-employe.component';
import { SalleComponent } from './components/commande/salle/salle.component';
import { FormulaireCreationComponent } from './components/commande/formulaire-creation/formulaire-creation.component';
import { DetailCommandeSalleComponent } from './components/commande/detail-commande-salle/detail-commande-salle.component';
import { FormulaireAssignationComponent } from './components/reservation/formulaire-assignation/formulaire-assignation.component';
import { FormulaireModificationEmployeComponent } from './components/admin/formulaire-modification-employe/formulaire-modification-employe.component';
import { CuisineComponent } from './components/commande/cuisine/cuisine.component';
import { CaisseComponent } from './components/commande/caisse/caisse.component';
import { authAdminGuard } from './guards/auth-admin.guard';
import { authEmployeGuard } from './guards/auth-employe.guard';
import { DetailCommandeCaisseComponent } from './components/commande/detail-commande-caisse/detail-commande-caisse.component';
import { AccueilClienteleComponent } from './components/reservation/accueil-clientele/accueil-clientele.component';

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent, canActivate : [authEmployeGuard]},
    {path : "accueil-clientele", component : AccueilClienteleComponent, canActivate : [authEmployeGuard]},
    {path: 'reservations/attribuer-table/:id', component: FormulaireAssignationComponent, canActivate : [authEmployeGuard]},
    {path : "reservations/:id", component : ReservationListeComponent, canActivate : [authEmployeGuard]},
    {path : "navigation-admin", component : NavigationAdminComponent, canActivate : [authAdminGuard]},
    {path : "restaurant-liste", component : RestaurantListeComponent, canActivate : [authAdminGuard]},
    {path : "employe-liste/:id", component : EmployeListeComponent, canActivate : [authAdminGuard]},
    {path : "creation-employe/:id", component : FormulaireCreationEmployeComponent, canActivate : [authAdminGuard]},
    {path : "modification-employe", component : FormulaireModificationEmployeComponent, canActivate : [authAdminGuard]},
    {path : "salle", component : SalleComponent, canActivate : [authEmployeGuard]},
    {path : "creation-commande/:idCommande/:numeroTable", component : FormulaireCreationComponent, canActivate : [authEmployeGuard]},
    {path : "detail-commande-salle/:idCommande/:numeroTable", component : DetailCommandeSalleComponent, canActivate : [authEmployeGuard]},
    {path : "detail-commande-caisse/:idCommande/:numeroTable", component : DetailCommandeCaisseComponent, canActivate : [authEmployeGuard]},
    {path : "cuisine", component : CuisineComponent, canActivate : [authEmployeGuard]},
    {path : "caisse", component : CaisseComponent, canActivate : [authEmployeGuard]},
    {path : "**", redirectTo : "/login"}
];
