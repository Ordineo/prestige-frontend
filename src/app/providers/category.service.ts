import {Injectable} from '@angular/core';
import {AngularFire} from  'angularfire2';


@Injectable()
export class CategoryService {

  constructor(private af: AngularFire) {
  }

  getCategories() {
    return this.af.database.object('/categories')
      .map(result => (result))
  }
}
