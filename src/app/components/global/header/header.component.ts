import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  
  last_url : string = "/login";

  constructor (private location : Location) {}

  goToLastUrl() : void {
    this.location.back();
  }

}
