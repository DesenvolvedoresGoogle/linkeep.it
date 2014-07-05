function main() {
  log('main function');

  if (localStorage.api_key) {
    log('Signed in with API key ' + localStorage.api_key);
    // bootstrap();
  } else {
    log('checking for cookie');
    checkForApiKeyCookie(function(apiKey) {
      if (apiKey) {
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
