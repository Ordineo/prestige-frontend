import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseHttpClient } from './base-http-client.service';


@Injectable()
export class CategoryService extends BaseHttpClient {

  private categoriesEndpoint = '/endorsements-service/categories';

  public getCategories() {
    return this.get(`${environment.endPoint}${this.categoriesEndpoint}`, true)
      .map(result => result.json())
      .map(resJson => resJson._embedded.categories || []);
  }

}
