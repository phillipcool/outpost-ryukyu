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
 * The message object has three values: the text [string] to broadcast, and two optional
 * choices:
 *            [styles] - optional classes to apply to the element
 *            [params] - values to override certain behavior
**/
var sendTransmission = function (message, callback) {
  //set default message params
  message.params = $.extend(
    {
      terminator: "\n\n"
    }, message.params);
  originalCallback = callback || doNothing;
  var transmission = $('#screen').append("<span></span>").children().last();
  transmission.addClass(message.styles.join(' '));
  callback = function() {
    transmission.addClass('full');
    originalCallback();
  }
  transmission.typed({
    strings: [message.string + message.params.terminator],
    typeSpeed: message.params.speed,
    callback: callback,
    onCharTyped: scrollToBottom,
  })
}

/**
 * Sends an array of transmissions to the main screen. Takes optional callback function.
 * The transmission object has two parameters: an array [styles] of classes to apply,
 * and the string [message] to be broadcasted.
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
