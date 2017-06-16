import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { instance, mock, when } from 'ts-mockito';

describe('AppComponent', () => {

  let componentUnderTest: AppComponent;

  let userService: UserService;

  beforeEach(() => {
    userService = mock(UserService);

    componentUnderTest = new AppComponent(instance(userService));
  });

  describe('isUserLoggedIn', () => {

    it('when userService returns false, returns false', () => {
      const result = false;
      when(userService.isUserLoggedIn()).thenReturn(result);

      const actual = componentUnderTest.isUserLoggedIn();

      expect(actual).toEqual(result);
    });


    it('when userService returns true, returns true', () => {
      const result = true;
      when(userService.isUserLoggedIn()).thenReturn(result);

      const actual = componentUnderTest.isUserLoggedIn();

      expect(actual).toEqual(result);
    });

  });

});
