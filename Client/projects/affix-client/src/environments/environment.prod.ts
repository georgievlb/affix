export const environment = {
  production: true,
  port: 6606,
  apiUrl: "localhost",
  bucketName: "affix-images",
  authority: 'https://localhost:5505/',
  clientId: 'affix_client_spa',
  redirect_uri: 'https://localhost:6606/signin-callback',
  post_logout_redirect_uri: 'https://localhost:6606/signout-callback',
  response_type: "code",
  scope: "openid profile AffixAPI"
};