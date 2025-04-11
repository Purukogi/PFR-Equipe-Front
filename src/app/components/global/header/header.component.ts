import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  
  constructor (private location : Location,
    private router : Router) {}
    
    goToLastUrl() : void {
      this.location.back();
    }
    
    redirectionNavigation() {
      console.log(this.router.url);
      
      if(localStorage.getItem("id_restaurant") == "0") {
        this.router.navigate(["/navigation-admin"]);
      }
      
      if(localStorage.getItem("id_restaurant") != null && localStorage.getItem("id_restaurant") != "0") {
        this.router.navigate(["/navigation-employe"]);
      }
    }
    
    isCurrentPageLogin() : boolean {
      return this.router.url == "/login";
    }
    
    isCurrentPageNavigation() : boolean {
      return this.router.url.includes("navigation");
    }
    
    logout() {
      localStorage.removeItem("id_restaurant");
      localStorage.removeItem("jwt");
      this.router.navigate(['/login']);
    }
  }
  