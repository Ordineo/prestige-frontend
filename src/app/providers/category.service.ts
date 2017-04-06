import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {environment} from '../../environments/environment';


@Injectable()
export class CategoryService {

  constructor(private http: Http) {
  }

  getCategories() {
    // return this.af.database.object('/categories')
    //   .map(result => (result))
  }

  get() {
    return this.http.get(environment.apiCategoriesEndpoint)
      .map(result => (result.json()._embedded));
  }

}
