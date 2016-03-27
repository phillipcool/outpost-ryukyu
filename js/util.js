/**
 * Returns a random integer in the range [0,n)
 */
function getRandomInt(n) {
    return Math.floor(n*Math.random());
}

/**
 * True if [char] is a white-space character
 */
function isWhitespace(char) {
    return /\s/.test(char);
}

/**
 * Replaces a list of jQuery elements with another list of jQuery elements
 * does not modify either list
 */
function $swap($l1, $l2) {
  $l1.each(function (index) {
    $(this).replaceWith($l2.eq(index));
  });
}

/**
 * Randomly call one of the functions in the array of callbacks
 * - presumes each element is a function
 */
function randomCall(callbackArray) {
  var functionToCall = callbackArray[getRandomInt(callbackArray.length)];
  functionToCall();
}

/**
 * Given a string and an array [distortions] of characters,
 * replace each non-whitespace character in string with a random character
 * in [distortions] with probability [probability]
**/
var distortString = function (string, distortions, probability) {
  var array = string.split(''),
      randomDistortion;
  array.forEach(function(item, index) {
    if (!isWhitespace(item) && Math.random() < probability) {
      randomDistortion = distortions[getRandomInt(distortions.length)];
      array[index] = randomDistortion;
    }
  });
  return array.join('');
}
