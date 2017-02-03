import {Injectable} from '@angular/core';
import {AngularFire} from  'angularfire2';


@Injectable()
export class PrestigeService {

  constructor(private af: AngularFire) {
  }

  getCategories() {
    return this.af.database.object('/prestiges')
      .map(result => (result))
  }

}
