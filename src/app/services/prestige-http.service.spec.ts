import {BaseRequestOptions, Connection, Response, ResponseContentType, ResponseOptions} from '@angular/http';
import {instance, mock, when} from 'ts-mockito';
import {PrestigeHttp} from './prestige-http.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {UserService} from './user.service';
import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Mock} from 'protractor/built/driverProviders';
import getPrototypeOf = Reflect.getPrototypeOf;

describe('PrestigeHttpService', () => {

  let mockUserService = mock(UserService);

  const url = 'http://mockapi.io/mocks/';
  const token = 'token';

  beforeEach(() => {
    mockUserService = mock(UserService);

    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: UserService,
          useValue: instance(mockUserService)
        },
        {
          provide: PrestigeHttp,
          useFactory: (backend, options, userService) => new PrestigeHttp(backend, options, userService),
          deps: [MockBackend, BaseRequestOptions, UserService]
        }
      ]
    });
  });

  beforeEach(() => {
    when(mockUserService.getCurrentUserToken()).thenReturn(token);
  });

  describe('get', () => {

    it('should do an unauthenticated GET request when authenticated = false',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toBeNull();
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                body
              })
            ));

          });

          serviceUnderTest
            .get(url, false)
            .subscribe((res: Response) => {
              const actual = res.json();
              expect(actual).toEqual(body);
            });
        }))
    );

    it('the authorization header should be present when authenticated is true',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                body
              })
            ));

          });

          serviceUnderTest
            .get(url, true)
            .subscribe((res: Response) => {
              const actual = res.json();
              expect(actual).toEqual(body);
            });
        }))
    );

  });

  describe('post', () => {

    it('should do an unauthenticated POST request when authenticated is false',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toBeNull();
            expect(JSON.parse(conn.request.getBody())).toEqual(body);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 201
              })
            ));

          });

          serviceUnderTest
            .post(url, body, false)
            .subscribe(() => {
            });
        }))
    );

    it('the authorization header should be present when authenticated is true',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
            expect(JSON.parse(conn.request.getBody())).toEqual(body);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 201
              })
            ));

          });

          serviceUnderTest
            .post(url, body, true)
            .subscribe(() => {
            });
        }))
    );

  });

  describe('put', () => {

    it('should do an unauthenticated PUT request when authenticated is false',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toBeNull();
            expect(JSON.parse(conn.request.getBody())).toEqual(body);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 200
              })
            ));

          });

          serviceUnderTest
            .put(url, body, false)
            .subscribe(() => {
            });
        }))
    );

    it('the authorization header should be present when authenticated is true',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          const body = ['mock1', 'mock2'];

          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
            expect(JSON.parse(conn.request.getBody())).toEqual(body);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 200
              })
            ));

          });

          serviceUnderTest
            .put(url, body, true)
            .subscribe(() => {
            });
        }))
    );

  });

  describe('delete', () => {

    it('should do an unauthenticated DELETE request when authenticated is false',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toBeNull();
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 200
              })
            ));

          });

          serviceUnderTest
            .delete(url, false)
            .subscribe(() => {
            });
        }))
    );

    it('the authorization header should be present when authenticated is true',
      async(
        inject([PrestigeHttp, MockBackend], (serviceUnderTest: PrestigeHttp, mockBackend: MockBackend) => {
          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
            expect(conn.request.url).toEqual(url);

            conn.mockRespond(new Response(
              new ResponseOptions({
                status: 200
              })
            ));

          });

          serviceUnderTest
            .delete(url, true)
            .subscribe(() => {
            });
        }))
    );

  });

});
