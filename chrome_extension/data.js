var setData = function(key, value) {
  if (!localStorage.access_token) return;
  
  if (!localStorage[localStorage.access_token]) {
    localStorage[localStorage.access_token] = JSON.stringify({});
  }

  if (key == 'links') {
    localStorage[localStorage.access_token + key] = JSON.stringify(value);
    return;
  }

  var userData = JSON.parse(localStorage[localStorage.access_token]);
  
  if (value) {
    userData[key] = value;
  } else {
    delete userData[key];
  }

  localStorage[localStorage.access_token] = JSON.stringify(userData);
}

var getData = function(key) {
  if (localStorage.access_token && localStorage[localStorage.access_token]) {
    if (key == 'links') {
      var targets = localStorage[localStorage.access_token + key];
      if (targets) {
        return JSON.parse(targets);
      } else {
        return null;
      }
    }
    return JSON.parse(localStorage[localStorage.access_token]);
  } else {
    return null;
  }
}
