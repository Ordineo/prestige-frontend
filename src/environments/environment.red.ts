const protocol = 'http';
const domain = 'localhost';

// Node-Red Config
const port = '1880';
const baseEndpoint = '';

export const environment = {
  production: false,
  endPoint: `${protocol}://${domain}:${port}${baseEndpoint}`
};

