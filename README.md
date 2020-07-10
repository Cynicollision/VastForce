# VastForce
VastForce

## Build/Develop
![Unit tests](https://github.com/Cynicollision/VastForce/workflows/Unit%20tests/badge.svg)
### Prerequisites
```
npm install -g @angular/cli
npm install -g gulp
npm install -g typescript
```
### Client (Angular)
Install dependencies, run unit and end-to-end tests:
```
cd client
npm install
ng test
ng e2e
```
Then start the development server:
```
ng serve
```
### Server (Node/Express)
Install dependencies, compile TypeScript, run tests:
```
npm install
tsc -p server
npm test
```
Then start the server:
```
node app
```
Note: Use `tsc -w` and `npm run test-watch` while actively developing.
### Packaging
Copy production Angular build output to folder served by the Express app:
```
gulp publish
```
### MongoDB setup
Install MongoDB, then run the following to create the development database and user (credentials must match server/Config.ts):
```
mongo
use vastforce
db.createUser({ user: "localdev", pwd: "l0cald3v", roles: [ { role: "readWrite", db: "vastforce-dev" } ], passwordDigestor:"server" })
```
### Deploy to Heroku
Full build and deploy process. Release branch must have built .js output included.
```
git checkout release
git merge master
gulp publish
tsc -p server
git commit -m <version>
git push heroku release:master
```
## Dependency Status
Client 

[![Dependency Status (client)](https://david-dm.org/Cynicollision/VastForce/status.svg?path=client)](https://david-dm.org/Cynicollision/VastForce?path=client)
[![Dependency Status (client)](https://david-dm.org/Cynicollision/VastForce/dev-status.svg?path=client)](https://david-dm.org/Cynicollision/VastForce?path=client&type=dev)

Server

[![Dependency Status (server)](https://david-dm.org/Cynicollision/VastForce/status.svg)](https://david-dm.org/Cynicollision/VastForce)
[![Dependency Status (server)](https://david-dm.org/Cynicollision/VastForce/dev-status.svg?type=dev)](https://david-dm.org/Cynicollision/VastForce?type=dev)
