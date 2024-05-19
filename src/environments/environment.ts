// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDjiK6e8x7oXP4fcV8RfnEG4rlnak5VKDk',
    authDomain: 'bit2me-trading.firebaseapp.com',
    databaseURL:
      'https://bit2me-trading-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'bit2me-trading',
    storageBucket: 'bit2me-trading.appspot.com',
    messagingSenderId: '353175042330',
    appId: '1:353175042330:web:aac1063fe10bbe740d14a3',
  },
  apiDomain: (resource: string) =>
    `https://${resource}-iivwz62j7q-uc.a.run.app`,
  defaultQuoteCurrency: 'USDT',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
