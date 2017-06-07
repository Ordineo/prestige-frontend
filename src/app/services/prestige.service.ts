import { BaseHttpClient } from './base-http-client.service';
import { Injectable, Inject, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Endorsement } from '../models/endorsement';

@Injectable()
export class EndorsementService extends BaseHttpClient {

  @Output() private updateEndorsementsEmitter: EventEmitter<boolean> = new EventEmitter();

  private prestigesEndpoint = `${environment.endPoint}/endorsements-service/endorsements`;

  getPrestiges() {
    return this.get(this.prestigesEndpoint, true)
      .map(result => result.json())
      .map(resultJson => resultJson._embedded.endorsements || []);
  }

  addPrestige(prestige: Endorsement): Observable<Response> {
    return this
      .post(this.prestigesEndpoint, prestige, true);
  }

  findByGranter(username: string): Observable<Endorsement[]> {
    return this
      .get(`${this.prestigesEndpoint}/search/findByGranterUsername?username=${username}`, true)
      .map(result => result.json())
      .map(resultJson => resultJson._embedded ? resultJson._embedded.endorsements : []);
  }

  findByReceiver(username: string): Observable<Endorsement[]> {
    return this
      .get(`${this.prestigesEndpoint}/search/findByReceiverUsername?username=${username}`, true)
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
