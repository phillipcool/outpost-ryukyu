/**
 * Null function. Used for setting optional function calls.
**/
var doNothing = function() {};

/**
 * When this is called, if the screen isn't scrolled down to the bottom,
 * it will be.
**/
var scrollToBottom = function() {
  $screen = $('#screen');
  if ($screen.scrollTop() !== $screen[0].scrollHeight) {
    $screen.scrollTop($screen[0].scrollHeight);
  }
}

/**
 * Send one transmission to the main screen. Takes optional callback function.
**/
var sendTransmission = function (transmission, callback) {
  callback = callback || doNothing;
  $('#screen').append("<span></span>")
              .children().last().typed({
                strings: [transmission + "\n\n"],
                callback: callback,
                onCharTyped: scrollToBottom,
              })
}

/**
 * Sends an array of transmissions to the main screen. Takes optional callback function.
**/
var sendTransmissions = function (transmissions, callback) {
  if (transmissions.length == 0) {
    callback = callback || doNothing;
    callback();
    return;
  } else {
    sendTransmission(transmissions[0], function () {
      sendTransmissions(transmissions.slice(1), callback);
    });
  }
}
