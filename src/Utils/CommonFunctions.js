export function validateEmail(email) {
  var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  //   var reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return reg.test(email);
}

export function validateUserName(userName) {
  let reg = /^[a-z0-9]+$/i;
  return reg.test(userName);
}

export function validateUrl(url) {
  let reg =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return reg.test(url);
}
