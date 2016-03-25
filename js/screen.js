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
var sendTransmission = function (string, callback) {
  originalCallback = callback || doNothing;
  var transmission = $('#screen').append("<span></span>").children().last();
  callback = function() {
    transmission.addClass('full');
    originalCallback();
  }
  transmission.typed({
    strings: [string + "\n\n"],
    callback: callback,
    onCharTyped: scrollToBottom,
  })
}

/**
 * Sends an array of transmissions to the main screen. Takes optional callback function.
**/
var sendTransmissions = function (strings, callback) {
  if (strings.length == 0) {
    callback = callback || doNothing;
    callback();
    return;
  } else {
    sendTransmission(strings[0], function () {
      sendTransmissions(strings.slice(1), callback);
    });
  }
}

/**
 * Randomly distort a transmission on the screen.
**/
var distortRandomTransmission = function () {
  var transmissions = $('span.full'),
      originalTransmission = $(transmissions[getRandomInt(transmissions.length)]);
      originalText = originalTransmission.text();
      distortedText = distortString(originalText, ['#', '/', '?', '%'], 0.2);
      distortedTransmission = originalTransmission.clone().text(distortedText);
      originalTransmission.replaceWith(distortedTransmission);
      setTimeout(function() {
        distortedTransmission.replaceWith(originalTransmission);
      }, 75)
}
