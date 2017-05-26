let protocol = 'http';
let domain = 'localhost';

// Node-Red Config
let port = '1880';
let baseEndpoint = '';

let url = protocol + '://' + domain + ':' + port + baseEndpoint;

export const environment = {
  production: false,

  apiUsersEndpoint: url + '/users',
  apiEndorsementsEndpoint: url + '/prestiges',
  apiRolesEndpoint: url + '/roles',
  apiPrestigeLikesEndpoint: url + '/likes',
  apiCategoriesEndpoint: url + '/categories',
  // apiProfileEndpoint: url + '/profiles'
};
