'use strict';

// Require annyang
const annyang = require('annyang')

if (annyang) {
  annyang.setLanguage(PARAMS.voiceRecognitionLanguage)
  annyang.addCommands(VOICE_COMMANDS);
  
  annyang.addCallback('resultMatch', function(res){
    renderMessage(res, say, {messageClass: 'message-right', alertClass: 'alert-success', delay: 0})
  })
  // annyang.debug();

  // annyang.start();
  FUNCTIONS.handleInput()
  console.log('Voice recognition ready');
}

var lastSentence = null;

function say(msg, callback) {
  console.log('Pause annyang');
  console.log('Saying: ' + msg);
  lastSentence=msg;
  annyang.abort();

  function voiceErrorCallback() {
      console.log("Voice error");
  }

  function voiceEndCallback() {
      console.log('Resume annyang');
  }

  var parameters = {
      onerror: voiceErrorCallback,
      onend: voiceEndCallback
  }

  responsiveVoice.speak(msg, PARAMS.voiceSpeakingLanguage, parameters);
  annyang.start();
}