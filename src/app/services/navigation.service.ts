import { Injectable } from '@angular/core';
import { Observer } from '../interfaces/observer';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  last_url : string = "login";

  observers : Observer[] = [];
  
  constructor() { }

  updateLastUrl(url : string) : void {
    console.log(url);    
    this.last_url = url;
    this.notify();
  }

  subscribe(obs : Observer) {
    this.observers.push(obs);
  }

  notify() {
    this.observers.forEach(o => o.notify());
  }
}
