// Require annyang
const annyang = require('annyang')

var CONFIG = {
    appName: 'Sam',
    userName: 'Ilya',

    voiceRecognitionLanguage: 'ru',
    voiceSpeakingLanguage: 'Russian Male',

    resHello: "Привет",

    resGreeting: ["Да?", "Слушаю", "Чем могу помочь?"],

    resGoodbye: ["До скорого",　"Пока"],

    resQuickSpeech: [],
}

var hello = function() {
    console.log(CONFIG.resHello);
    document.getElementById('caption').textContent = CONFIG.resHello;
    say(CONFIG.resHello);
  };

var greeting = function() {
    resGreeting = randomSentence(CONFIG.resGreeting)
    console.log(resGreeting);
    document.getElementById('caption').textContent = resGreeting;
    say(resGreeting);
  };

var goodbye = function() {
    resGoodbye = randomSentence(CONFIG.resGoodbye)
    console.log(resGoodbye);
    document.getElementById('caption').textContent = resGoodbye;
    say(resGoodbye);
  };

var moment = moment();

var currentTime = function(){
    console.log(moment.format("YYYY год MM месяц DD день HH час mm минуты"));
    document.getElementById('caption').textContent = moment.format("YYYY год MM месяц DD день HH час mm минуты");
    say(moment.format("YYYY год MM месяц DD день HH час mm минуты"));
}

var quickSpeech = function() {
    resQuickSpeech = randomSentence(CONFIG.resQuickSpeech)
    console.log(resQuickSpeech);
    document.getElementById('caption').textContent = resQuickSpeech;
    say(resQuickSpeech);
  };

var repeatLastSentence = function(){
    say(lastSentence);
};

var commands = {
  'Привет': hello,
  'Сэм': greeting,
  'Пока': goodbye,
  'Время': currentTime,
  'Говори': quickSpeech,
  'Повтори': repeatLastSentence,
}

if (annyang) {
  annyang.setLanguage(CONFIG.voiceRecognitionLanguage)
  annyang.addCommands(commands);

  annyang.debug();
  annyang.start();
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

  responsiveVoice.speak(msg, CONFIG.voiceSpeakingLanguage, parameters);
  annyang.start();
}

function randomSentence(arr) {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
}
