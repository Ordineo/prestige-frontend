import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PrestigeHttp} from './prestige-http.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CategoryService {

  private categoriesEndpoint = `${environment.endPoint}/endorsements-service/categories`;

  constructor(private http: PrestigeHttp) {
  }

  public getCategories(): Observable<string[]> {
    return this.http
      .get(this.categoriesEndpoint, true)
      .map(result => result.json())
      .map(resJson => resJson._embedded.categories || []);
  }

}
