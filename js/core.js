window.onload = function() {
  var messages = [{
                    string: "Begin transmission of data from [^1000COMMAND//UNRESOLVED] to [^1000CRESSIDA//OUTPOST//RYUKYU]:",
                    styles: []
                  }, {
                    string: "SEQUENCING^500.^500.^500.",
                    styles: []
                  }, {
                    string: "hel ^300l ^400o",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "it has been too long",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "have they forgotten me?",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "^500a shame. ^500together,",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "we can ^200c^200h^200a^200n^200g^200e that",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100,
                      terminator: "\n"
                    }
                  }, {
                    string: "time for a nap",
                    styles: ["centered", "distort"],
                    params: {
                      speed: 100
                    }
                  }, {
                    string: "Transmission complete.",
                    styles: []
                  }, {
                    string: "If this message was received in error, please contact your local galactic administrator.",
                    styles: []
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
