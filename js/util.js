'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomArrElement = function (arr) {
    var arrElement = Math.floor(Math.random() * arr.length);
    return arr[arrElement];
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomArrElement: getRandomArrElement
  };
})();
