// Must export the config

export const gatekeeperConfig = {
  development: {
    client_id: 'f520e476e9ead285c974',
    redirect_uri: 'http://localhost:4200/auth',
    gatekeeper: 'http://localhost:9999'
  },
  production: {}
};
