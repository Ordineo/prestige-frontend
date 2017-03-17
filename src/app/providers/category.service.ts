import {Injectable, Inject} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {Http} from "@angular/http";
import {APP_CONFIG} from "../app.config";


@Injectable()
export class CategoryService {

  constructor(private af: AngularFire, private http: Http, @Inject(APP_CONFIG) private config) {
  }

  getCategories() {
    return this.af.database.object('/categories')
      .map(result => (result))
  }

  get() {
    return this.http.get(this.config.apiCategoriesEndpoint)
      .map(result => (result.json()._embedded));
  }

}
