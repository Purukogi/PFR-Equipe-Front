import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http : HttpClient) { }

  connexion(login: string, mdp: string) {
    return this.http.post<AuthResponse>("http://localhost:8080/login", {login: login, mdp : mdp});
  }

  store_user(response : AuthResponse): void {
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("id_restaurant", response.idRestaurant.toString());
  }

}

