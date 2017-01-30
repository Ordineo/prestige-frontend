import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'prestiges',
  templateUrl: './prestige.component.html'
})
export class PrestigesComponent {
  prestiges: FirebaseObjectObservable<any[]>;

  constructor(af: AngularFire) {
    this.prestiges = af.database.object('/prestiges');
  }


}
