import {Headers, Http, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export abstract class PrestigeHttp extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              protected userService: UserService) {
    super(backend, options);
  }

  public get(url: string, authenticated, options?: RequestOptionsArgs): Observable<Response> {
    if (authenticated) {
      options = this.addAuthenticationHeader(options);
    }
    return super.get(url, options);
  }

  public post(url: string, body: object, authenticated: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (authenticated) {
      options = this.addAuthenticationHeader(options);
    }
    return super.post(url, body, options);
  }

  public put(url: string, body: object, authenticated: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (authenticated) {
      options = this.addAuthenticationHeader(options);
    }
    return super.put(url, body, options);
  }

  public delete(url: string, authenticated: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (authenticated) {
      options = this.addAuthenticationHeader(options);
    }
    return super.delete(url, options);
  }

  private addAuthenticationHeader(options: RequestOptionsArgs | undefined) {
    const resultOptions: RequestOptionsArgs = options || {};
    const headers: Headers = resultOptions.headers || new Headers();
    resultOptions.headers = headers;

    if (!headers.has('Authorization')) {
      headers.append('Authorization', `Bearer ${this.userService.getCurrentUserToken()}`);
    }

    return resultOptions;
  }

}
