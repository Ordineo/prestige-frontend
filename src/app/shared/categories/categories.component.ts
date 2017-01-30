import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: FirebaseObjectObservable<any[]>;

  constructor(af: AngularFire) {
    this.categories = af.database.object('/categories');
  }


}
