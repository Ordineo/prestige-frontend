import {capture, instance, mock, verify, when} from 'ts-mockito';
import {Observable} from 'rxjs/Rx';
import {EndorsementService} from '../../../services/endorsement.service';
import {EndorsementFeedComponent} from './endorsement-feed.component';
import {UserService} from '../../../services/user.service';
import {Account} from '../../../models/account';

describe('EndorsementFeedComponent', () => {

  let componentUnderTest: EndorsementFeedComponent;

  let userService: UserService;
  let endorsementService: EndorsementService;

  beforeEach(() => {
    userService = mock(UserService);
    endorsementService = mock(EndorsementService);

    componentUnderTest = new EndorsementFeedComponent(
      instance(endorsementService),
      instance(userService));
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      when(endorsementService.getEndorsements()).thenReturn(Observable.empty());
    });

    it('should get current user', () => {
      const account = new Account();
      when(userService.getCurrentUser()).thenReturn(account);

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.currentUser).toEqual(account);
    });

    it('should get the endorsements', () => {
      componentUnderTest.ngOnInit();

      expect(componentUnderTest.endorsements).toEqual(jasmine.any(Observable));
    });

    it('should subscribe to the updateEndorsementsEvent', () => {
      componentUnderTest.ngOnInit();


      const [firstArg] = capture(endorsementService.subscribeToUpdateEndorsementsEvents).last();
      expect(firstArg).toEqual(jasmine.any(Function));

      firstArg();
      verify(endorsementService.getEndorsements()).called();
    });

  });

});
