const setCookie = (ckname,ckvalue) => {
    const now = new Date();
    now.setTime(now.getTime() + (2*60*60*1000));
    let expires = "expires=" + now.toUTCString();
    document.cookie = ckname + "=" + ckvalue + ";" + expires + ";path=/; SameSite=lax; Secure";
  }
  
const getCookie = (ckname) => {
    let name = ckname + "=";
    let cookie = document.cookie;
    let ca = cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

export {setCookie, getCookie};