export function randUniqueDatetime() {
  var now = new Date();
  var timestamp = new Date().getUTCMilliseconds();
  timestamp += now.getFullYear().toString(); // 2011
  timestamp += (now.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's
  timestamp += now.getDate().toString();
  timestamp += now.getHours();
  timestamp += now.getMinutes();
  timestamp += now.getSeconds();
  timestamp += now.getMilliseconds();

  var r = Math.floor(Math.random() * 100) + 1;

  return timestamp + '' + r;
}
