var checkForApiKeyCookie = function(doneCallback) {
  chrome.cookies.get({
    'url': www,
    'name': 'api_key'
  }, function(cookie) {
    if (cookie != null) {
      var apiKey = cookie.value;
      localStorage.api_key = apiKey;
      doneCallback(apiKey);
    } else {
      doneCallback(null);
    }
  });
}
