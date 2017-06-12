import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export abstract class BaseHttpClient {

    constructor(
        protected http: Http,
        protected userService: UserService) { }

    protected get(url: string, authenticated, options?: RequestOptionsArgs): Observable<Response> {
        if (authenticated) {
            options = this.addAuthenticationHeader(options);
        }
        return this.http
            .get(url, options);
    }

    protected post(url: string, body: object, authenticated: boolean, options?: RequestOptionsArgs): Observable<Response> {
        if (authenticated) {
            options = this.addAuthenticationHeader(options);
        }
        return this.http
            .post(url, body, options);
    }

    protected put(url: string, body: object, authenticated: boolean, options?: RequestOptionsArgs): Observable<Response> {
        if (authenticated) {
            options = this.addAuthenticationHeader(options);
        }
        return this.http
            .put(url, body, options);
    }

    protected delete(url: string, authenticated: boolean, options?: RequestOptionsArgs) {
        if (authenticated) {
            options = this.addAuthenticationHeader(options);
        }
        return this.http
            .delete(url, options);
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
