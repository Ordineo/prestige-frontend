let protocol = 'http';
let domain = 'example.com';

// Node-Red Config
let port = '6969';
let baseEndpoint = '/testing-service';

let url = protocol + '://' + domain + ':' + port + baseEndpoint;

export const environment = {
  production: true,

  apiUsersEndpoint: url + '/users',
  apiPrestigesEndpoint: url + '/prestiges',
  apiRolesEndpoint: url + '/roles',
  apiPrestigeLikesEndpoint: url + '/prestigeLikes',
  apiCategoriesEndpoint: url + '/categories',
  apiProfileEndpoint: url + '/profiles'
};
