import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Http, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

const limit: BehaviorSubject<number> = new BehaviorSubject<number>(10); // import 'rxjs/BehaviorSubject';

@Injectable()
export class PrestigeService {

  constructor(private http: Http, private requestOptions: RequestOptions) {
    requestOptions.headers.append('Authorization', sessionStorage.getItem('Authorization'));
  }

  getPrestiges() {
    // return this.af.database.list('/prestiges', {
    //   query: {
    //     orderByChild: 'created',
    //     // limitToFirst: 5 // todo: add pagination
    //   }
    // })
    //   .map(result => (result));
  }

  addPrestige(prestige: any) {
    // return this.af.database.list('/prestiges').push(prestige)
  }

  addTest(data: any) {
    // return this.af.database.list('/test').push(data)
  }

  get() {
    return this.http.get(environment.apiEndorsementsEndpoint, this.requestOptions)
      .map(result => {
        return result.json()._embedded;
      });
  }

  add(prestige: any) {
    console.log(prestige);
    prestige.categories = Array(prestige.categories);
    return this.http.post(environment.apiEndorsementsEndpoint, prestige);
  }

}
