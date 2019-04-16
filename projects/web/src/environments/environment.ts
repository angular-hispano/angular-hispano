// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCCOKoq4IZydpU5uchHCFUDKV7ZMcvKszc',
    authDomain: 'angular-latino.firebaseapp.com',
    databaseURL: 'https://angular-latino.firebaseio.com',
    projectId: 'angular-latino',
    storageBucket: 'angular-latino.appspot.com',
    messagingSenderId: '1050547922973',
    appId: '1:1050547922973:web:52c1921415662799'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
