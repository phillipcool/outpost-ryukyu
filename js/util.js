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
