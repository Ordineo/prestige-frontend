FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package_docker.json /usr/src/app/package.json
COPY server.js /usr/src/app
RUN npm install

# Bundle app source
COPY www/ /usr/src/app

CMD [ "npm", "start" ]
