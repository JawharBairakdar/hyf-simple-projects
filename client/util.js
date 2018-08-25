'use strict'
{

  function createAndAppend(name, parent, options = {}) {
    const tag = document.createElement(name);
    parent.appendChild(tag);
    Object.keys(options).forEach((attr) => {
      const value = options[attr];
      if (attr === 'html') {
        tag.innerHTML = value;
      } else {
        tag.setAttribute(attr, value);
      }
    });
    return tag;
  }

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }
  window.fetchJSON = fetchJSON
  window.createAndAppend = createAndAppend
}