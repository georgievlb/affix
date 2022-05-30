export const environment = {
  production: true,
  port: 443,
  apiUrl: "localhost",
  bucketName: "affix-images",
  authority: 'https://localhost:5005/', // TODO: CHANGE IT TO PROD
  clientId: 'affix_client_spa',
  redirect_uri: 'https://localhost:6006/signin-callback',
  post_logout_redirect_uri: 'https://localhost:6006/signout-callback',
  response_type: "code",
  scope: "openid profile AffixAPI"
};