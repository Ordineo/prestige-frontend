import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PrestigeHttp} from './prestige-http.service';


@Injectable()
export class CategoryService {

  private categoriesEndpoint = '/endorsements-service/categories';

  constructor(private http: PrestigeHttp) {
  }

  public getCategories() {
    return this.http
      .get(`${environment.endPoint}${this.categoriesEndpoint}`, true)
      .map(result => result.json())
      .map(resJson => resJson._embedded.categories || []);
  }

}
