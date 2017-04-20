// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let protocol = 'http';
let domain = 'localhost';

// Node-Red Config
let port = '8585';
let baseEndpoint = '/employee-service';

let url = protocol + '://' + domain;

export const environment = {
  production: false,

  apiUsersEndpoint: url + ':8081/employee',
  apiPrestigesEndpoint: url + ':8082/endorsement',
  apiRolesEndpoint: url + ':8081/role',
  apiPrestigeLikesEndpoint: url + ':8082/prestigeLike',
  apiCategoriesEndpoint: url + ':8082/categorie',
  apiProfileEndpoint: url + ':8082/profile',

  apiLoginEndpoint: url + ':8081/login',
  apiRegisterEndpoint: url + ':8081/register'
};
