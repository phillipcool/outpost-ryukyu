!function($) {
  var Typed = function(el, options) {
    // chosen element to manipulate text
    this.el = $(el);
    // options
    this.options = $.extend({}, $.fn.typed.defaults, options);
    // typing speed
    this.typeSpeed = this.options.typeSpeed;
    // typing speed humanizing factor
    this.typeSpeedRandOffset = this.options.typeSpeedRandOffset
    // input strings of text
    this.string = this.options.string;
    // character number position of current string
    this.strPos = 0;
    // the order of strings
    this.sequence = [];
    // All systems go!
    this.init();
  };

  Typed.prototype = {
    constructor: Typed,
    init: function() {
      // Start typing
      var self = this;
      self.typewrite(self.string, self.strPos);
    },
    // pass current string state to each function, types 1 char per call
    typewrite: function(curString, curStrPos) {
      // varying values for setTimeout during typing
      // can't be global since number changes each time loop is executed
      var humanize = Math.round(Math.random() * this.typeSpeedRandOffset) + this.typeSpeed;
      var self = this;

      // contain typing function in a timeout humanized delay
      self.timeout = setTimeout(function() {
        // check for an escape character before a pause value
        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
        // single ^ are removed from string
        var charPause = 0;
        var substr = curString.substr(curStrPos);
        if (substr.charAt(0) === '^') {
          var skip = 1; // skip atleast 1
          if (/^\^\d+/.test(substr)) {
            substr = /\d+/.exec(substr)[0];
            skip += substr.length;
            charPause = parseInt(substr);
          }

          // strip out the escape character and pause value so they're not printed
          curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
        }

        // skip over html tags while typing
        var curChar = curString.substr(curStrPos).charAt(0)
        if (curChar === '<' || curChar === '&') {
          var tag = '';
          var endTag = '';
          if (curChar === '<') {
            endTag = '>'
          } else {
            endTag = ';'
          }
          while (curString.substr(curStrPos).charAt(0) !== endTag) {
            tag += curString.substr(curStrPos).charAt(0);
            curStrPos++;
          }
          curStrPos++;
          tag += endTag;
        }

        // timeout for any pause after a character
        self.timeout = setTimeout(function() {
          if (curStrPos === curString.length) {
          // animation that occurs on the last typed string
          self.options.callback();
          // quit
          return;
          } else {
            // start typing each new char into existing string
            // curString: arg, self.el.html: original text inside element
            var nextString = curString.substr(0, curStrPos + 1);
            self.options.onCharTyped(nextString.slice(-1));
            self.el.html(nextString);

            // add characters one by one
            curStrPos++;
            // loop the function
            self.typewrite(curString, curStrPos);
          }
          // end of character pause
        }, charPause);

        // humanized value for typing
      }, humanize);
    }
  };

  $.fn.typed = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data('typed'),
        options = typeof option == 'object' && option;
      if (!data) $this.data('typed', (data = new Typed(this, options)));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.typed.defaults = {
    string: "default",
    // typing speed
    typeSpeed: 5,
    // typing speed humanizing factor
    typeSpeedRandOffset: 0,
    // callback for when the typing is finished
    callback: function() {},
    //callback after each typed character
    onCharTyped: function() {},
  };
}(window.jQuery);
