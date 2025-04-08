import { Routes } from '@angular/router';
import { FormulaireConnexionComponent } from './components/admin/formulaire-connexion/formulaire-connexion.component';
import { NavigationEmployeComponent } from './components/global/navigation-employe/navigation-employe.component';
import { ReservationListeComponent } from './components/reservation/reservation-liste/reservation-liste.component';

export const routes: Routes = [
    {path : "login", component : FormulaireConnexionComponent},
    {path : "navigation-employe", component : NavigationEmployeComponent},
    {path : "reservations/:id", component : ReservationListeComponent},
    {path : "**", redirectTo : "/login"}
];
