"use strict";

const getHashParams = (window) => {
  const hashParams = {};
  let e;
  let r = /([^&;=]+)=?([^&;]*)/g;
  let q = window.location.hash.substring(1);
  console.log(window.location);
  console.log(`q: ${q}`);
  while ((e = r.exec(q))) {
    console.log(e);
    console.log(e[1]);
    console.log(e[2]);
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export default getHashParams;
