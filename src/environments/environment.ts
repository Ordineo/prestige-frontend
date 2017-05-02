// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const protocol = 'http';
const domain = 'localhost';

// Node-Red Config
const port = '8585';
const baseEndpoint = '/employee-service';

const url = protocol + '://' + domain;

export const environment = {
  production: false,

  apiUsersEndpoint: url + ':9900/employees-service/employees',
  apiPrestigesEndpoint: url + ':9900/endorsements-service/endorsements',
  apiRolesEndpoint: url + ':9900/employees-service/roles',
  apiPrestigeLikesEndpoint: url + ':9900/endorsements-service/prestigeLikes',
  apiCategoriesEndpoint: url + ':9900/endorsements-service/categories',
  apiProfileEndpoint: url + ':8082/profile',

  apiLoginEndpoint: url + ':9900/employees-service/login',
  apiRegisterEndpoint: url + ':9900/employees-service/register'
};
