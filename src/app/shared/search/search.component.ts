import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'search-employees',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  employees: any[] = ['Michael', 'Pieter', 'Tom', 'Joris', 'Ines', 'Dries', 'Ruben', 'Tim'];
}
