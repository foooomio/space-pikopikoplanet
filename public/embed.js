(function () {
  'use strict';

  window.SPACE_PIKOPIKOPLANET = window.SPACE_PIKOPIKOPLANET || {};
  window.SPACE_PIKOPIKOPLANET.origin =
    window.SPACE_PIKOPIKOPLANET.origin || 'https://space.pikopikopla.net';
  window.SPACE_PIKOPIKOPLANET.selector =
    window.SPACE_PIKOPIKOPLANET.selector || '.space-pikopikoplanet-embed';

  if (window.SPACE_PIKOPIKOPLANET.loaded) return;

  const findFrame = function (windowObject) {
    const selector = window.SPACE_PIKOPIKOPLANET.selector;
    const frames = document.querySelectorAll(selector);
    for (let i = 0, l = frames.length; i < l; i++) {
      if (frames[i].contentWindow === windowObject) {
        return frames[i];
      }
    }
  };

  const handleMessage = function (event) {
    if (event.origin === window.SPACE_PIKOPIKOPLANET.origin) {
      const iframe = findFrame(event.source);
      if (iframe && event.data.height) {
        iframe.style.height = event.data.height;
      }
    }
  };

  window.addEventListener('message', handleMessage);
  window.SPACE_PIKOPIKOPLANET.loaded = true;
})();
