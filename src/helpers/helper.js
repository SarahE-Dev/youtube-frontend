export function decodeHTML(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


