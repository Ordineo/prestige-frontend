import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  // public selectedEmployee: { name: string };
  public employees: { name: string }[] = [{name: 'Michael'}, {name: 'Pieter'}, {name: 'Tom'}, {name: 'Joris'}, {name: 'Ines'}, {name: 'Dries'}, {name: 'Ruben'}, {name: 'Tim'}];
}
