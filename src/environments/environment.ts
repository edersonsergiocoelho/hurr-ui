// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:8080',
  apiUI: 'http://localhost:4200',
  apiMercadoPago: 'https://0b4b-177-195-148-178.ngrok-free.app/mercado-pago/webhook',
  publicKeyMercadoPago: 'TEST-c5ae5bd9-83f9-4d4f-932d-c9449af2cb3e'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
