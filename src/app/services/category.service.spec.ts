import {Response} from '@angular/http';
import {instance, mock, when} from 'ts-mockito';
import {Subject} from 'rxjs/Subject';
import {PrestigeHttp} from './prestige-http.service';
import {environment} from '../../environments/environment';
import {CategoryService} from './category.service';

describe('CategoryService', () => {

  const categoriesEndpoint = `${environment.endPoint}/endorsements-service/categories`;

  let serviceUnderTest: CategoryService;
  let http: PrestigeHttp;

  beforeEach(() => {
    http = mock(PrestigeHttp);

    serviceUnderTest = new CategoryService(
      instance(http));
  });

  describe('getCategories', () => {

    it('should do a request to the categories endpoint', (done) => {
      const categoriesSubject = new Subject();
      const responseMock = mock(Response);
      const categories = ['category1', 'category2'];

      when(http.get(categoriesEndpoint, true))
        .thenReturn(categoriesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          categories: categories
        }
      });

      serviceUnderTest
        .getCategories()
        .subscribe((actual: string[]) => {
          expect(actual).toEqual(categories);
          done();
        });

      categoriesSubject.next(instance(responseMock));
    });

  });

});
