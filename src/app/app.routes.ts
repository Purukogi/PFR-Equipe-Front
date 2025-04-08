import { Routes } from '@angular/router';
import { FormulaireConnexionComponent } from './components/admin/formulaire-connexion/formulaire-connexion.component';
import { NavigationEmployeComponent } from './components/global/navigation-employe/navigation-employe.component';
import { ReservationListeComponent } from './components/reservation/reservation-liste/reservation-liste.component';
import { NavigationAdminComponent } from './components/global/navigation-admin/navigation-admin.component';
import { RestaurantListeComponent } from './components/admin/restaurant-liste/restaurant-liste.component';

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent},
    {path : "reservations/:id", component : ReservationListeComponent},
    {path : "navigation-admin", component : NavigationAdminComponent},
    {path : "restaurant-liste", component : RestaurantListeComponent},
    {path : "**", redirectTo : "/login"}
];
