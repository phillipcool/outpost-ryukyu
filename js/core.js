window.onload = function() {
  var messages = ["Begin alphanumeric transmission of data to [^1000CRESSIDA//OUTPOST//RYUKYU]:",
                  "SEQUENCING^500.^500.^500.",
                  "hello.wakeup",
                  "Transmission complete.",
                  "If this message was received in error, please contact your local galactic administrator."];

  setTimeout(function() {
    sendTransmissions(messages);
  }, 3000);

};
