var linksLoaded;
var delay = DEFAULT_CONNECTIVITY_DELAY;

function main() {
  log('main function');

  if (localStorage.access_token) {
    log('Signed in with API key ' + localStorage.access_token);
    requestLinks();
  } else {
    log('Access Token not found on local storage');
    checkForAccessToken(function(accessToken) {
      if (accessToken) {
        main();
      } else {
        setTimeout(function() {
          main();
        }, DEFAULT_CONNECTIVITY_DELAY);
      }
    });
  }
}

main();
