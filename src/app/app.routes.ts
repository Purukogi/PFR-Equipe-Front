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

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent},
    {path : "reservations/:id", component : ReservationListeComponent},
    {path : "navigation-admin", component : NavigationAdminComponent},
    {path : "restaurant-liste", component : RestaurantListeComponent},
    {path : "employe-liste/:id", component : EmployeListeComponent},
    {path : "creation-employe/:id", component : FormulaireCreationEmployeComponent},
    {path : "salle", component : SalleComponent},
    {path : "creation-commande/:idCommande/:numeroTable", component : FormulaireCreationComponent},
    {path : "detail-commande-salle/:idCommande/:numeroTable", component : DetailCommandeSalleComponent},
    {path : "**", redirectTo : "/login"}
];
