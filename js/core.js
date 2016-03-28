window.onload = function() {
  var messages = [{
                    string: "Begin transmission of data from [^1000COMMAND//UNRESOLVED] to [^1000CRESSIDA//OUTPOST//RYUKYU]:"
                  }, {
                    string: "SEQUENCING^500.^500.^500."
                  }, {
                    string: "hel ^300l ^400o",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "it has been too long",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "have they forgotten me?",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "^500a shame. ^500together,",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "we can <i>c^200h^200a^200n^200g^200e</i> that",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "time for a nap",
                    params: {
                      styles: ["centered", "distort"],
                      typeSpeed: 100
                    }
                  }, {
                    string: "Transmission complete."
                  }, {
                    string: "If this message was received in error, please contact your local galactic administrator."
                  }],

      boot = function() {
        sendTransmissions(messages);
        distort();
      }

      var minDistortDuration = 300,
          maxDistortDuration = 2000;

      distort = function() {
        setTimeout(function() {
          randomCall([distortRandomTransmission, distortAllTransmissions]);
          distort();
        }, Math.max(minDistortDuration, getRandomInt(maxDistortDuration)));
      }

  setTimeout(boot, 3000);

};
