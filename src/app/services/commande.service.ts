import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../interfaces/commande';
import { Plat } from '../interfaces/plat';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private BASE_URL = 'http://localhost:8080/commandes';

  constructor(private client : HttpClient) {}

  add_commande(idTable: number) {
    return this.client.post<Commande>(`${this.BASE_URL}/creation?table=${idTable}`, {});
  }

  getPlatsParCategorie(idRestaurant: number) {
    return this.client.get<{ [categorie: string]: Plat[] }>(
      `http://localhost:8080/plats/${idRestaurant}`
    );
  }

  ajouterPlatsCommande(idCommande: number, commande: Commande) {
    return this.client.put<Commande>(`${this.BASE_URL}/${idCommande}`, commande);
  }
  

}
