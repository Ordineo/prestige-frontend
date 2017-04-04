let protocol = 'http';
let domain = 'localhost';

// Node-Red Config
let port = '1880';
let baseEndpoint = '';

let url = protocol + '://' + domain + ':' + port + baseEndpoint;

export const environment = {
  production: false,

  apiUsersEndpoint: url + '/users',
  apiPrestigesEndpoint: url + '/prestiges',
  apiRolesEndpoint: url + '/roles',
  apiPrestigeLikesEndpoint: url + '/prestigeLikes',
  apiCategoriesEndpoint: url + '/categories',
  apiProfileEndpoint: url + '/profiles'
};
