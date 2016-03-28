/**
 * Null function. Used for setting optional function calls.
**/
var doNothing = function () {};

/**
 * When this is called, if the screen isn't scrolled down to the bottom,
 * it will be.
**/
var scrollToBottom = function () {
  $screen = $('#screen');
  if ($screen.scrollTop() !== $screen[0].scrollHeight) {
    $screen.scrollTop($screen[0].scrollHeight);
  }
}

/**
 * Send one message as a transmission to the main screen. Takes optional callback function.
 * The message object has three values: the text [string] to broadcast, and the [params] styles.
**/
var sendTransmission = function (message, callback) {
  //set default message params
  var params = $.extend(
    {
      terminator: "\n\n",
      typeSpeedRandOffset: 35,
      styles: []
    }, message.params);
  originalCallback = callback || doNothing;
  var transmission = $('#screen').append("<span></span>").children().last();
  transmission.addClass(params.styles.join(' '));
  callback = function() {
    transmission.addClass('full');
    originalCallback();
  }
  transmission.typed({
    string: message.string + params.terminator,
    typeSpeed: params.typeSpeed,
    typeSpeedRandOffset: params.typeSpeedRandOffset,
    callback: callback,
    onCharTyped: scrollToBottom,
  })
}

/**
 * Sends an array of transmissions to the main screen. Takes optional callback function.
 * The message objects in the array should be the same as defined in sendTransmission
**/
var sendTransmissions = function (messages, callback) {
  if (messages.length == 0) {
    callback = callback || doNothing;
    callback();
    return;
  } else {
    sendTransmission(messages[0], function () {
      sendTransmissions(messages.slice(1), callback);
    });
  }
}

// List of valid distortions
var distortions = ['#', '/', '?', '%'],
    distortionProbability = 0.3, //in range [0, 1]
    distortionDuration = 75; //milliseconds

/**
 * Randomly distort a distortable and fully-typed transmission on the screen.
**/
var distortRandomTransmission = function () {
  var transmissions = $('span.full.distort:in-viewport'),
      originalTransmission = $(transmissions[getRandomInt(transmissions.length)]);
      originalText = originalTransmission.text();
      distortedText = distortString(originalText, distortions, distortionProbability);
      distortedTransmission = originalTransmission.clone().text(distortedText);
      originalTransmission.replaceWith(distortedTransmission);
      setTimeout(function() {
        distortedTransmission.replaceWith(originalTransmission);
      }, distortionDuration)
}

/**
 * Distort all distortable, fully-typed transmissions on the screen.
**/
var distortAllTransmissions = function () {
  var transmissions = $('span.full.distort:in-viewport'),
      distortedTransmissions = transmissions.clone();
      distortedTransmissions.each(function () {
        var transmission = $(this),
            distortedText = distortString(transmission.text(), distortions, distortionProbability);
        transmission.text(distortedText);
      })
      $swap(transmissions, distortedTransmissions);
      setTimeout(function() {
        $swap(distortedTransmissions, transmissions);
      }, distortionDuration)
}
