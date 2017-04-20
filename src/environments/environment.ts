// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let protocol = 'http';
let domain = 'localhost';

// Node-Red Config
let port = '8585';
let baseEndpoint = '/employee-service';

let url = protocol + '://' + domain + ':' + port + baseEndpoint;

export const environment = {
  production: false,

  apiUsersEndpoint: url + '/users',
  apiPrestigesEndpoint: url + '/prestiges',
  apiRolesEndpoint: url + '/roles',
  apiPrestigeLikesEndpoint: url + '/prestigeLikes',
  apiCategoriesEndpoint: url + '/categories',
  apiProfileEndpoint: url + '/profiles',
  apiLoginEndpoint: url + '/login'
};
