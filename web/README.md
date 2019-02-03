#My Notes
Useful links:

https://code.visualstudio.com/

https://nodejs.org/en/
https://angular.io/
https://cli.angular.io/

https://expressjs.com/
https://expressjs.com/en/starter/generator.html

https://www.mockaroo.com/

Set up debugging for the Angular app:
see: https://github.com/Microsoft/vscode-recipes/tree/master/Angular-CLI


** General Setup
node version 10.14.1
install angular cli
install express cli
install Visual Studio Code
inside Visual Studio Code:
    - install the "Debugger for Chrome" extension

** Express Server Notes
Create a new express app (using express cli):
express --git
need to: 
npm install --save nodemon
npm install --save jsonwebtoken


** Angular Notes
Create a new angular app (using Angular cli):
ng new web  --commit  --routing --style=scss --prefix=lm

Install Angular Material
(note: don't need to install @angular/animations because it was installed by the cli)
//npm install --save @angular/material @angular/cdk @angular/animations
npm install --save @angular/material @angular/cdk

note: also install gesture support:
npm install --save hammerjs
and add the following to main.ts:
import 'hammerjs'

update index.html to add the google fonts
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

NOTE: when generating items you can use --dry-run to see what will happen without actually doing it

to create a new module:
ng generate module <modulename> --routing

to generate a new component
ng generate component <component name>
ex:
    ng generate component messages/message-list
    ng generate component home
    ng generate component users/user-list
    ng generate component components/register

to generate services:
ng generate service <service name>
ex:
    ng generate service messages/services/message
    ng generate service services/authentication

to make Http requests, we need to add the HttpClient:
npm install --save @angular/common/http
and add it to the modules that will need to use it

for proxy api request to nodejs:
add a proxy.conf.json next to package.json that has:
{
    "/api": {
      "target": "http://localhost:3000",
      "secure": true
    },
    "/auth": {
        "target": "http://localhost:3000",
        "secure": false
      }
}

in angular.json you need to tell it to use a proxy:
 "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "web:build",
            "proxyConfig": "proxy.conf.json"
          },
          "configurations": {
            "production": {
              "browserTarget": "web:build:production"
            }
          }
        },


to use ag grid:
https://www.ag-grid.com/angular-getting-started/
npm install --save ag-grid-community ag-grid-angular

add the following for styles:
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham.css";




# Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
