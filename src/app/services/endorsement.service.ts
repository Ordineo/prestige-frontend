import { PrestigeHttp } from './prestige-http.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { Endorsement } from '../models/endorsement';

@Injectable()
export class EndorsementService {

  @Output() private updateEndorsementsEmitter: EventEmitter<boolean> = new EventEmitter();

  private endorsementsEndpoint = `${environment.endPoint}/endorsements-service/endorsements`;

  constructor(private http: PrestigeHttp) {
  }

  getEndorsements(): Observable<Endorsement[]> {
    return this.http
      .get(this.endorsementsEndpoint, true)
      .map(result => result.json())
      .map(resultJson => resultJson._embedded.endorsements || new Array<Endorsement>())
      .map((endorsements: Endorsement[]) => endorsements.reverse());
  }

  addEndorsement(endorsement: Endorsement): Observable<Response> {
    return this.http
      .post(this.endorsementsEndpoint, endorsement, true);
  }

  findByGranter(username: string): Observable<Endorsement[]> {
    return this.http
      .get(`${this.endorsementsEndpoint}/search/findByGranterUsername?username=${username}`, true)
      .map(result => result.json())
      .map(resultJson => resultJson._embedded ? resultJson._embedded.endorsements : []);
  }

  findByReceiver(username: string): Observable<Endorsement[]> {
    return this.http
      .get(`${this.endorsementsEndpoint}/search/findByReceiverUsername?username=${username}`, true)
      .map(result => result.json())
      .map(resultJson => resultJson._embedded ? resultJson._embedded.endorsements : []);
  }

  fireUpdateEndorsementsEvent() {
    this.updateEndorsementsEmitter.emit(true);
  }

  subscribeToUpdateEndorsementsEvents(action: () => void) {
    return this.updateEndorsementsEmitter.subscribe(action);
  }

}
