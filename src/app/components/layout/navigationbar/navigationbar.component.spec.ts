import {instance, mock, when} from 'ts-mockito';
import {UserService} from '../../../services/user.service';
import {NavigationBarComponent} from './navigationbar.component';

describe('NavigationBarComponent', () => {

  let componentUnderTest: NavigationBarComponent;

  let userService: UserService;

  beforeEach(() => {
    userService = mock(UserService);

    componentUnderTest = new NavigationBarComponent(
      instance(userService));
  });

  describe('getLoggedInUsername', () => {

    it('gets the username from the userService', () => {
      const username = 'username';
      when(userService.getCurrentUsername()).thenReturn(username);

      const actual = componentUnderTest.getLoggedInUsername();

      expect(actual).toEqual(username);
    });

  });

});
