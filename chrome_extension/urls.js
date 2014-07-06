var www = 'http://localhost:3000';
var api = 'http://localhost:3000/api';

var version = chrome.runtime.getManifest().version;
var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);

var userAgent = 'linkeep.it chrome extension ' + version + ' - (Chrome ' + chromeVersion + ')';

var DEFAULT_CONNECTIVITY_DELAY = 5 * 1000;

var get = function(url, callback) {
  url = url + "?token=" + localStorage.access_token;

  log('GET: ' + url);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('X-User-Agent', userAgent);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 401) signOut();
      callback(xhr.status, xhr.responseText);
    }
  };
  xhr.send();
};


var post = function(url, object, callback) {
  object['token'] = localStorage.access_token;
  
  log('POST: ' + url);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-User-Agent', userAgent);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 401) signOut();
      callback(xhr.status, xhr.responseText);
    }
  }
  xhr.send(JSON.stringify(object));
}
