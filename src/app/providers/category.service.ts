import {Injectable, Inject} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {Http} from "@angular/http";
import {environment} from '../../environments/environment';


@Injectable()
export class CategoryService {

  constructor(private af: AngularFire, private http: Http) {
  }

  getCategories() {
    return this.af.database.object('/categories')
      .map(result => (result))
  }

  get() {
    return this.http.get(environment.apiCategoriesEndpoint)
      .map(result => (result.json()._embedded));
  }

}
