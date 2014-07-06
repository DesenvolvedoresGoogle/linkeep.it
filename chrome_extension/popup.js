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
