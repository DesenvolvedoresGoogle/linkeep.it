var checkForAccessToken = function(doneCallback) {
  chrome.cookies.get({
    'url': www,
    'name': 'access_token'
  }, function(cookie) {
    if (cookie != null) {
      var accessToken = cookie.value;
      localStorage.access_token = accessToken;
      doneCallback(accessToken);
    } else {
      doneCallback(null);
    }
  });
}

var requestLinks = function() {
  if (navigator.onLine) {
    function sendLinksLoaded(links) {
      delay = DEFAULT_CONNECTIVITY_DELAY;

      setData('links', links);

      updateIcon();

      //linksLoaded = true;
      var event = new CustomEvent('links_loaded', {});
      window.dispatchEvent(event);
    }

    var links = getData('links');
    if (links) {
      sendLinksLoaded(links);
    } else {
      get(api + '/v1/links', function(status, response) {
        if (status == 200) {
          links = JSON.parse(response);
          sendLinksLoaded(links);
        } else if (status != 401) {
          setTimeout(function() {
            delay = Math.min(600000, delay * 2);
            requestLinks();
          }, delay);
        }
      });
    }

  } else {
    var interval = setInterval(function() {
      if (navigator.onLine) {
        delay = DEFAULT_CONNECTIVITY_DELAY;
        requestLinks();
        clearInterval(interval);
      } else {
        log('waiting connectivity to requestUser');
      }
    }, DEFAULT_CONNECTIVITY_DELAY);
  }
};

var signOut = function() {
  var accessToken = localStorage.access_token;

  delete localStorage.access_token;
  delete localStorage[accessToken];
  delete localStorage[accessToken + 'links'];

  chrome.cookies.remove({
    'url': www,
    'name': 'access_token'
  });

  updateIcon();

  var event = new CustomEvent('signed_out', {});
  dispatchEvent(event);
};

var updateIcon = function() {
  var accessToken = localStorage.access_token;
  var suffix = '';

  if (!accessToken) {
    suffix = '-off';
  }

  chrome.browserAction.setIcon({
    'path': {
      '19': 'images/logo19' + suffix +'.png',
      '38': 'images/logo38' + suffix + '.png'
    }
  });
}
