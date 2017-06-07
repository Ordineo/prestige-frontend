// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const protocol = 'http';
const domain = 'prestige.westeurope.cloudapp.azure.com';
const port = '9900';

const url = `${protocol}://${domain}:${port}`;

export const environment = {
  production: false,
  endPoint: url,

  apiRolesEndpoint: url + ':9900/employees-service/roles',
  apiPrestigeLikesEndpoint: url + ':9900/endorsements-service/likes',
  // apiProfileEndpoint: url + ':8082/profile',


  apiRegisterEndpoint: url + ':9900/employees-service/register'
};
