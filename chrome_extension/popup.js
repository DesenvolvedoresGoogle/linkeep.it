var bg = chrome.extension.getBackgroundPage();

var currentTab = function(callback) {
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function(tabs) {
    callback(tabs[0]);
  });
}

var fillInputs = function() {
  currentTab(function(tab) {
    var name = document.getElementById('link_name');
    var url = document.getElementById('link_url');

    name.value = tab.title;
    url.value = tab.url;
  });
}

fillInputs();

var newLinkSubmitted = function() {
  var link = {};

  link['name'] = document.getElementById('link_name').value;
  link['url'] = document.getElementById('link_url').value;
  link['tags'] = document.getElementById('link_tags').value;


  bg.post(bg.api + '/v1/links', link, function() {
    var saved = document.getElementById('saved-succesfully');
    saved.style.display = 'block';
    saved.style.opacity = '1.0';

    setTimeout(function() {
      window.close();
    }, 1300);
  });

  return false;
}

var onLoad = function() {
  document.new_link.onsubmit = newLinkSubmitted;
}

document.addEventListener('DOMContentLoaded', onLoad);

// escutar o evento de submit do form
// nao permitir o submit normal do html
// pegar os valores dos inputs
// chamar a funçao post criada pelo pessoal do linkeep.it

