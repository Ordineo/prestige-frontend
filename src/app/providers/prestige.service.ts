import {Injectable, Inject} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {BehaviorSubject, Observable} from "rxjs";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';
import {IAppConfig, APP_CONFIG} from "../app.config";

const limit: BehaviorSubject<number> = new BehaviorSubject<number>(10); // import 'rxjs/BehaviorSubject';

@Injectable()
export class PrestigeService {

  constructor(private af: AngularFire, private http: Http, @Inject(APP_CONFIG) private config) {
  }

  getPrestiges() {
    return this.af.database.list('/prestiges', {
      query: {
        orderByChild: 'created',
        // limitToFirst: 5 // todo: add pagination
      }
    })
      .map(result => (result));
  }

  addPrestige(prestige: any) {
    return this.af.database.list('/prestiges').push(prestige)
  }

  addTest(data: any) {
    return this.af.database.list('/test').push(data)
  }

  get() {
    return this.http.get(this.config.apiPrestigesEndpoint)
      .map(result => {
        return result.json()._embedded;
      });
  }

  add(prestige: any) {
    return this.http.post(this.config.apiPrestigesEndpoint, prestige);
  }

}
