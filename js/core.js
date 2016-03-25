window.onload = function() {
  var messages = ["Begin alphanumeric transmission of data to [^1000CRESSIDA//OUTPOST//RYUKYU]:",
                  "SEQUENCING^500.^500.^500.",
                  "hello.wakeup",
                  "Transmission complete.",
                  "If this message was received in error, please contact your local galactic administrator."],

      boot = function() {
        sendTransmissions(messages);
        distort();
      }

      distort = function() {
        setTimeout(function() {
          console.log('hi');
          distortRandomTransmission();
          distort();
        }, Math.max(250, getRandomInt(3000)));
      }

  setTimeout(boot, 3000);

};
