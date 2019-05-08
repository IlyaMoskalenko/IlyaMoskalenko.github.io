"use strict"

const electron = require('electron')
const ipc = electron.ipcRenderer

const PARAMS = {
    appName:                  'Sam',
    userName:                 'Ilya',
    voiceRecognitionLanguage: 'ru',
    voiceSpeakingLanguage:    'Russian Male',
    confirmationSound:        new Howl({src: ['assets/audio/appointed.mp3']}),
    activationSound:          new Howl({src: ['assets/audio/definite.mp3']})
}

const RESPONDS = {
    resHello:                 "Привет",
    resGreeting:              ["Да?", "Слушаю", "Чем могу помочь?"],
    resGoodbye:               ["До скорого",　"Пока"],
    resQuickSpeech:           ['Bla','BlaBla','BlaBlaBla'],
    resTranslate:             "Перевожу...",
    resOpen:                  "Открываю...",
} 

const FUNCTIONS = {
    renderMessage(msg, callback, params) {
        // params = params || null
      
        // params = { class: className, }
      
        params = typeof params !== 'undefined' ?  params : null
        setTimeout(function(){
          console.log(msg);
          let dialog = document.getElementById('dialog-wrap')
          let dialogHTML = dialog.innerHTML
          dialog.innerHTML = dialogHTML + `
            <div class="message ${params.messageClass}" >
              <p class="text-message alert ${params.alertClass}" role="alert"> ${msg}</p>
            </div>
          `
          callback(msg)
        }, params.delay)
    },
    handleInput() {
        let input = document.getElementById('input')
            input.addEventListener('change', function(e){
              let res = e.target.value
              e.target.value = ''
              if (res in VOICE_COMMANDS) {
                FUNCTIONS.renderMessage(res, VOICE_COMMANDS[res], {messageClass: 'message-right', alertClass: 'alert-success', delay: 0})
              }
            })
    },
    randomSentence(arr) {
        if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
        return arr;
    },
    greeting() {
        PARAMS.activationSound.play()
        let resGreeting = FUNCTIONS.randomSentence(RESPONDS.resGreeting)
        FUNCTIONS.renderMessage(resGreeting, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    hello() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(RESPONDS.resHello, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    goodbye() {
        PARAMS.confirmationSound.play()
        let resGoodbye = FUNCTIONS.randomSentence(RESPONDS.resGoodbye)
        FUNCTIONS.renderMessage(resGoodbye, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    currentTime() {
        PARAMS.confirmationSound.play()
        let time = moment().format("YYYY год MM месяц DD день HH час mm минуты");
        FUNCTIONS.renderMessage(time, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    quickSpeech() {
        PARAMS.confirmationSound.play()
        let resQuickSpeech = FUNCTIONS.randomSentence(RESPONDS.resQuickSpeech)
        FUNCTIONS.renderMessage(resQuickSpeech, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    repeatLastSentence() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(lastSentence, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
    },
    chrome() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(RESPONDS.resOpen, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
        ipc.send('open-application', 'chrome')
    },
    notepad() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(RESPONDS.resOpen, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
        ipc.send('open-application', 'notepad')
    },
    taskmanager() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(RESPONDS.resOpen, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
        ipc.send('open-application', 'taskmanager')
    },
    vscode() {
        PARAMS.confirmationSound.play()
        FUNCTIONS.renderMessage(RESPONDS.resOpen, say, {messageClass: 'message-left', alertClass: 'alert-primary', delay: 400})
        ipc.send('open-application', 'vscode')
    },
}

const VOICE_COMMANDS = {
    'Привет':                 FUNCTIONS.hello,
    'Сэм':                    FUNCTIONS.greeting,
    'Пока':                   FUNCTIONS.goodbye,
    'Время':                  FUNCTIONS.currentTime,
    'Говори':                 FUNCTIONS.quickSpeech,
    'Повтори':                FUNCTIONS.repeatLastSentence,
    'Перевод *tag':           FUNCTIONS.translate,
    'хром':                   FUNCTIONS.chrome,
    'нотпад':                 FUNCTIONS.notepad,
    'диспетчер задач':        FUNCTIONS.taskmanager,
    'код':                    FUNCTIONS.vscode,
}