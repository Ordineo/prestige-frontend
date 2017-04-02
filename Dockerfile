FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package_docker.json /usr/src/app/package.json
COPY server.js /usr/src/app
RUN npm install

# Bundle app source
COPY dist/ /usr/src/app

# Expose the port the app runs in
EXPOSE 80

CMD [ "npm", "start" ]
