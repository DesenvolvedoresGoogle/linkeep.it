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

  post(api + '/v1/links', object, function() {
    alert('created!');
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

