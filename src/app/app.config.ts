import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');


let protocol = 'http';
let domain = 'localhost';

// Back-end config
// var port = '8585';
// var baseEndpoint = '/employee-service';

// Node-Red Config
let port = '1880';
let baseEndpoint = '';

let url = protocol + '://' + domain + ':' + port + baseEndpoint;

export interface IAppConfig {
  apiUsersEndpoint: string;
  apiPrestigesEndpoint: string;
  apiRolesEndpoint: string;
  apiPrestigeLikesEndpoint: string;
  apiCategoriesEndpoint: string;
  apiProfileEndpoint: string;
}
export const AppConfig: IAppConfig = {
  apiUsersEndpoint: url + '/users',
  apiPrestigesEndpoint: url + '/prestiges',
  apiRolesEndpoint: url + '/roles',
  apiPrestigeLikesEndpoint: url + '/prestigeLikes',
  apiCategoriesEndpoint: url + '/categories',
  apiProfileEndpoint: url + '/profiles'
};
