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

  get_plats_par_categorie(idRestaurant: number) {
    return this.client.get<{ [categorie: string]: Plat[] }>(
      `http://localhost:8080/plats/${idRestaurant}`
    );
  }

  ajouter_plats_commande(idCommande: number, commande: Commande) {
    return this.client.put<Commande>(`${this.BASE_URL}/${idCommande}`, commande);
  }

  get_commande_by_table(idTable: number) {
    return this.client.get<Commande>(`${this.BASE_URL}/par-table/${idTable}`);
  }

  get_commande_by_id(idCommande: number,) {
    return this.client.get<Commande>(`${this.BASE_URL}/${idCommande}`);
  }
  
  update_statut_servie(id: number) {
    return this.client.put<Commande>(`${this.BASE_URL}/${id}/servie`, {});
  }
  
  get_commandes_en_cuisine() {
    return this.client.get<Commande[]>(`${this.BASE_URL}/en-cuisine`);
  }

  update_statut_prete(id: number) {
    return this.client.put<Commande>(`${this.BASE_URL}/${id}/prete`, {});
  }

  get_commandes_servies() {
    return this.client.get<Commande[]>(`${this.BASE_URL}/servie`);
  }

  update_statut_payee(id: number) {
    return this.client.put<Commande>(`${this.BASE_URL}/${id}/payee`, {});
  }

  delete_commande(id: number) {
    return this.client.delete(`${this.BASE_URL}/${id}/suppression`, { responseType: 'text' });
  }
}
