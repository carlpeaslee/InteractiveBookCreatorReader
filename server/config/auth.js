/** Google Cloud API credentials that allows the application to
  * make calls to a Google API.
  * See {@link https://console.developers.google.com}
  * and replace each value with your own.
  * @todo replace each googleAuth value with your app's client credentials
  * @todo give yourself a unique secrect for your sessions
  * @module config/auth
  */
  var authConfigs = {
    googleAuth: {
      clientId: '809599790940-13po6vado7gkf4r8t17or2aluch99892.apps.googleusercontent.com',
      clientSecret: '-PJ9S3VqaOClzl3oGHDUzd6n',
      callbackUrl: 'http://localhost:5000/auth/google/callback',
    },

    sessionVars: {
      secret: 'carl',
    },
  };

module.exports = authConfigs;
