import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observer } from '../../../interfaces/observer';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, Observer{
  
  last_url : string = "login";

  constructor (private service : NavigationService) {}

  ngOnInit(): void {
    this.service.subscribe(this);
  }

  notify(): void {
    this.last_url = this.service.last_url;
    console.log("the url has been updated to " + this.last_url);
    
  }
}
