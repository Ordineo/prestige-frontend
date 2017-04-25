import {AccountService} from './account.service';
import {ResponseOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

describe('AccountService', () => {
  let accountService;

  describe('When user logs in right', () => {
    beforeEach(() => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ***token***');

      const mockResponse = new Response(new ResponseOptions({
        headers: headers,
        status: 200
      }));

      let httpMock = getMockHttp({post: mockResponse});
      accountService = new AccountService(httpMock);
    });

    it('you should get a response header with token', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.headers.toJSON().Authorization[0]).toBe('Bearer ***token***');
      })
    });

    it('you should get a status 200', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.status).toBe(200);
      })
    });
  });


  describe(('When user is not registerd yet'), () => {
    beforeEach(() => {
      const mockResponse = new Response(new ResponseOptions({
        body: {
          error: 'Unauthorized',
          message: 'Authentication Failed: Cannot pass null or empty values to constructor',
        },
        status: 401
      }));

      let httpMock = getMockHttp({post: mockResponse});
      accountService = new AccountService(httpMock);
    });

    it('you should get an error message', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.json().message).toBe('Authentication Failed: Cannot pass null or empty values to constructor');
      })
    });

    it('you should get an error', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.json().error).toBe('Unauthorized');
      })
    });

    it('you should get status 401', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.status).toBe(401);
      })
    });
  });

  describe('When user gives gives bad credentials', () => {
    beforeEach(() => {
      const mockResponse = new Response(new ResponseOptions({
        body: {
          error: 'Unauthorized',
          message: 'Authentication Failed: Bad credentials',
        },
        status: 401
      }));

      let httpMock = getMockHttp({post: mockResponse});
      accountService = new AccountService(httpMock);
    });

    it('should get an error message when user enters bad credentials', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.json().message).toBe('Authentication Failed: Bad credentials');
      })
    });

    it('should get an error when user enters bad credentials', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.json().error).toBe('Unauthorized');
      })
    });

    it('should get status 401 when user enters bad credentials', () => {
      accountService.login('test', 'password').subscribe((result) => {
        expect(result.status).toBe(401);
      })
    });
  });
});

function getMockHttp(methods): any {
  const mockHttp = jasmine.createSpyObj('mockHttp', Object.keys(methods));

  if ('get' in methods) {
    mockHttp.get.and.returnValue(Observable.of(methods.get));
  }
  if ('post' in methods) {
    mockHttp.post.and.returnValue(Observable.of(methods.post));
  }
  if ('patch' in methods) {
    mockHttp.patch.and.returnValue(Observable.of(methods.patch));
  }
  if ('put' in methods) {
    mockHttp.put.and.returnValue(Observable.of(methods.put));
  }
  if ('delete' in methods) {
    mockHttp.delete.and.returnValue(Observable.of(methods.delete));
  }

  return mockHttp;
}
