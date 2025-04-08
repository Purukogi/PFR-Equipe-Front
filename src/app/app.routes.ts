import { Routes } from '@angular/router';
import { FormulaireConnexionComponent } from './components/admin/formulaire-connexion/formulaire-connexion.component';
import { NavigationEmployeComponent } from './components/global/navigation-employe/navigation-employe.component';
import { ReservationListeComponent } from './components/reservation/reservation-liste/reservation-liste.component';
import { NavigationAdminComponent } from './components/global/navigation-admin/navigation-admin.component';
import { RestaurantListeComponent } from './components/admin/restaurant-liste/restaurant-liste.component';
import { SalleComponent } from './components/commande/salle/salle.component';
import { FormulaireCreationComponent } from './components/commande/formulaire-creation/formulaire-creation.component';
import { DetailCommandeSalleComponent } from './components/commande/detail-commande-salle/detail-commande-salle.component';
import { FormulaireCreationResaComponent } from './components/reservation/formulaire-creation-resa/formulaire-creation-resa.component';

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent},
    {path : "reservations/creer-resa", component : FormulaireCreationResaComponent},
    {path : "reservations/:id", component : ReservationListeComponent},
    {path : "navigation-admin", component : NavigationAdminComponent},
    {path : "restaurant-liste", component : RestaurantListeComponent},
    {path : "salle", component : SalleComponent},
    {path : "creation-commande/:idCommande/:numeroTable", component : FormulaireCreationComponent},
    {path : "detail-commande-salle/:idCommande/:numeroTable", component : DetailCommandeSalleComponent},
    {path : "**", redirectTo : "/login"}
];
