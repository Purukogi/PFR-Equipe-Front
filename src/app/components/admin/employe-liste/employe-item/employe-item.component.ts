import { Component, Input } from '@angular/core';
import { Employe } from '../../../../interfaces/employe';

@Component({
  selector: 'app-employe-item',
  imports: [],
  templateUrl: './employe-item.component.html',
  styleUrl: './employe-item.component.css'
})
export class EmployeItemComponent {

  @Input()
  employe ?: Employe;
}
