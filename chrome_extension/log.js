var log = function(message) {
  var line;
  if (message instanceof Object || message instanceof Array) {
    line = message;
  } else {
    line = new Date().toLocaleString() + ' - ' + message;
  }

  console.log(line);
}
