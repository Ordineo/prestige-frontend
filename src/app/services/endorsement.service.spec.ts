import {Response} from '@angular/http';
import {instance, mock, when} from 'ts-mockito';
import {Subject} from 'rxjs/Subject';
import {PrestigeHttp} from './prestige-http.service';
import {environment} from '../../environments/environment';
import {EndorsementService} from './endorsement.service';
import {Endorsement} from '../models/endorsement';

describe('EndorsementService', () => {

  const endorsementEndpoint = `${environment.endPoint}/endorsements-service/endorsements`;

  let serviceUnderTest: EndorsementService;
  let http: PrestigeHttp;

  beforeEach(() => {
    http = mock(PrestigeHttp);

    serviceUnderTest = new EndorsementService(
      instance(http));
  });

  describe('getEndorsements', () => {

    it('should do a GET request to the endorsements endpoint', (done) => {
      const endorsementsSubject = new Subject();
      const responseMock = mock(Response);
      const endorsements = [new Endorsement(), new Endorsement()];

      when(http.get(endorsementEndpoint, true))
        .thenReturn(endorsementsSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          endorsements
        }
      });

      serviceUnderTest
        .getEndorsements()
        .subscribe((actual: Endorsement[]) => {
          expect(actual).toEqual(endorsements.reverse());
          done();
        });

      endorsementsSubject.next(instance(responseMock));
    });

    it('if the response does not contain endorsements, returns an empty array', (done) => {
      const endorsementsSubject = new Subject();
      const responseMock = mock(Response);

      when(http.get(endorsementEndpoint, true))
        .thenReturn(endorsementsSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {}
      });

      serviceUnderTest
        .getEndorsements()
        .subscribe((actual: Endorsement[]) => {
          expect(actual).toEqual([]);
          done();
        });

      endorsementsSubject.next(instance(responseMock));
    });

  });

  describe('addEndorsement', () => {

    it('should do a post request to the endorsements endpoint', (done) => {
      const endorsementSubject = new Subject();
      const responseMock = mock(Response);
      const endorsement = new Endorsement();

      when(http.post(endorsementEndpoint, endorsement, true))
        .thenReturn(endorsementSubject.asObservable());

      serviceUnderTest
        .addEndorsement(endorsement)
        .subscribe(() => {
          done();
        });

      endorsementSubject.next(instance(responseMock));
    });

  });

  describe('findByGranter', () => {

    it('should do a get request to the endorsements/findByGranterUsername?username=username endpoint', (done) => {
      const endorsementSubject = new Subject();
      const responseMock = mock(Response);
      const endorsements = [new Endorsement()];
      const username = 'username';

      when(http.get(`${endorsementEndpoint}/search/findByGranterUsername?username=${username}`, true))
        .thenReturn(endorsementSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          endorsements
        }
      });

      serviceUnderTest
        .findByGranter(username)
        .subscribe((actual: Endorsement[]) => {
          expect(actual).toEqual(endorsements);
          done();
        });

      endorsementSubject.next(instance(responseMock));
    });

  });

  describe('findByReceiver', () => {

    it('should do a get request to the endorsements/findByReceiverUsername?username=username endpoint', (done) => {
      const endorsementSubject = new Subject();
      const responseMock = mock(Response);
      const endorsements = [new Endorsement()];
      const username = 'username';

      when(http.get(`${endorsementEndpoint}/search/findByReceiverUsername?username=${username}`, true))
        .thenReturn(endorsementSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          endorsements
        }
      });

      serviceUnderTest
        .findByReceiver(username)
        .subscribe((actual: Endorsement[]) => {
          expect(actual).toEqual(endorsements);
          done();
        });

      endorsementSubject.next(instance(responseMock));
    });

  });

  describe('endorsementsEventEmitter', () => {

    it('should call the subscribed function when firing event', (done) => {
      serviceUnderTest.subscribeToUpdateEndorsementsEvents(() => {
        done();
      });
      serviceUnderTest.fireUpdateEndorsementsEvent();
    });

  });


});
