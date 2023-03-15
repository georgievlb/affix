// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: "https://dev.lachezargeorgiev.com/api",
    clientUrl: "https://dev.lachezargeorgiev.com/home",
    bucketName: 'affix-images',
    authority: 'https://dev.lachezargeorgiev.com/is/',
    clientId: 'affix_client_spa',
    redirect_uri: 'https://dev.lachezargeorgiev.com/signin-callback',
    post_logout_redirect_uri: 'https://dev.lachezargeorgiev.com/signout-callback',
    response_type: 'code',
    scope: 'openid profile AffixAPI'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
