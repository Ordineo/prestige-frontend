import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

const limit: BehaviorSubject<number> = new BehaviorSubject<number>(10); // import 'rxjs/BehaviorSubject';

@Injectable()
export class PrestigeService {

  constructor(private http: Http) {
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
    return this.http.get(environment.apiPrestigesEndpoint)
      .map(result => {
        return result.json()._embedded;
      });
  }

  add(prestige: any) {
    return this.http.post(environment.apiPrestigesEndpoint, prestige);
  }

}
