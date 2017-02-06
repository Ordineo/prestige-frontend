import {Injectable} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {BehaviorSubject} from "rxjs";

const limit: BehaviorSubject<number> = new BehaviorSubject<number>(10); // import 'rxjs/BehaviorSubject';

@Injectable()
export class PrestigeService {

  constructor(private af: AngularFire) {
  }

  getPrestiges() {
    return this.af.database.list('/prestiges', {
      query: {
        orderByChild: 'created',
        // limitToFirst: 5 // todo: add pagination
      }
    })
      .map(result => (result))
  }

  addPrestige(prestige: any) {
    return this.af.database.list('/prestiges').push(prestige)
  }

  addTest(data: any) {
    return this.af.database.list('/test').push(data)
  }

}
