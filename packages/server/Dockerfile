FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --quiet

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "run", "start" ]