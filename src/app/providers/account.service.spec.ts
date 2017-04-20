import {TestBed, async, inject} from '@angular/core/testing';
import {AccountService} from './account.service';
import {HelpFunctions} from "../shared/helpers/helpFunctions";
import {ResponseOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

describe('AccountService', () => {
  beforeEach(() => {
  });

  it('should get a response header with token when logged in right', () => {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ***token***');

    const mockResponse = new Response(new ResponseOptions({
      headers: headers,
      status: 200
    }));

    let httpMock = HelpFunctions.getMockHttp({post: mockResponse});
    let accountService = new AccountService(httpMock);

    accountService.login("test", "password").subscribe((result) => {
      expect(result.headers.toJSON().Authorization[0]).toBe('Bearer ***token***');
    })
  });

  it('should get a status 200 when logged in right', () => {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ***token***');

    const mockResponse = new Response(new ResponseOptions({
      headers: headers,
      status: 200
    }));

    let httpMock = HelpFunctions.getMockHttp({post: mockResponse});
    let accountService = new AccountService(httpMock);

    accountService.login("test", "password").subscribe((result) => {
      expect(result.status).toBe(200);
    })
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

});
