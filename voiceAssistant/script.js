import config from '/config.js'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let App = {
    config
    ,content: {
        input:  document.getElementById('input'),
        dialog:  document.getElementById('dialog-wrap'),
    }
    ,methods: {
        send(result, to) {
            let json = JSON.stringify({data: result})
		    let xhr = new XMLHttpRequest();
                xhr.open('POST', to, true)
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.onload = function(){

                }
                xhr.send(json);
        }
        ,implement(action, transcript) {
            switch (action.perform) {
                case "translate" : {
                    let translate = transcript.slice(16,)
                    window.open(`https:\/\/translate.google.by\/?hl=ru&tab=wT&authuser=0#view=home&op=translate&sl=en&tl=ru&text=${translate}`)
                    break;
                }
                case "music" : {
                    window.open("https:\/\/vk.com\/audios131698336");
                    break;
                }
                case "weather" : {
                    window.open("https:\/\/www.gismeteo.by\/weather-minsk-4248");
                    break;
                }
                case 'notepad' : {
                    App.methods.send('notepad', '/sam/transcript')
                    break;
                }
                case 'player' : {
                    App.methods.send('player', '/sam/transcript')
                    break;
                }
                case 'steam' : {
                    App.methods.send('steam', '/sam/transcript')
                    break;
                }
                case 'vscode' : {
                    App.methods.send('vscode', '/sam/transcript')
                    break;
                }
                case 'guitarpro' : {
                    App.methods.send('guitarpro', '/sam/transcript')
                    break;
                }
                case 'taskmanager' : {
                    App.methods.send('taskmanager', '/sam/transcript')
                    break;
                }

            }
        }
        ,checkAction(transcript, actions) {
            let implement = App.methods.implement
            actions.forEach(action => {
                if (transcript.includes(action.transcript)) {
                    implement(action, transcript)
                    return 0
                }
            })
            window.open(`https:\/\/www.google.by\/search?q=${transcript}`)
        }
        ,getTranscript(e) { 
            return Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('').capitalize()
        }
        ,recognize() {
            let recognition       = new webkitSpeechRecognition()
            let confirmationSound = new Howl({src: ['./Sound/appointed.mp3']})
            let activationSound   = new Howl({src: ['./Sound/definite.mp3']})
            let actions 	   	  = App.config.actions
            let parent 	     	  = App.config.parent
            let input             = App.content.input
            let dialog            = App.content.dialog
            let getTranscript     = App.methods.getTranscript
            let checkAction       = App.methods.checkAction
            let send              = App.methods.send
            let firstActivation   = null
                recognition.lang = 'ru-RU';
                recognition.interimResults = true

                recognition.addEventListener('result', (e) => {
                    let transcript = getTranscript(e)
                    let hotword = App.config.hotwords.some((el)=> transcript == el)

                    if (e.results[0].isFinal) {
                        if(hotword){
                            firstActivation = true
                            activationSound.play()
                            transcript = ''
                        }
                        if(!hotword && firstActivation) {
                            firstActivation = false
                            input.value = transcript         
                            confirmationSound.play()
                            checkAction(transcript.toLowerCase(), actions)
                            let dialogHtml = dialog.innerHTML
                                dialog.innerHTML = dialogHtml + `
                                    <div class="message message-right" >
                                        <p class="text-message alert alert-success" role="alert"> ${transcript}</p>
                                    </div>
                                `
                        }
                    } else {
                        if(firstActivation){
                            input.value = transcript
                        }
                    }
                })
                
                recognition.addEventListener('start', () => {
                    // console.log('recognition started')
                })
                recognition.addEventListener('end', () => {
                    input.value = ''
                    
                    // console.log("recognition ended");   
                    recognition.start()
                })
                recognition.addEventListener('error', () => {
                    console.log('recognition error')
                })
          
                recognition.start()
        }
    }
    ,Init() {
        let parent = this.config.parent
        let recognize = this.methods.recognize
            recognize()
        parent.console.log('Sam is now ON')
        
    }
}
App.Init()

