const config = {
    actions:[
        {       
            transcript: 'как переводится',
            perform: 'translate'
        },
        {
            transcript: 'включи музыку',
            perform: 'music'
        },
        {
            transcript: 'погода',
            perform: 'weather'
        },
        {
            transcript: 'открой notepad',
            perform: 'notepad'
        },
        {
            transcript: 'открой player',
            perform: 'player'
        },
        {
            transcript: 'открой steam',
            perform: 'steam'
        },
        {
            transcript: 'открой vs code',
            perform: 'vscode'
        },
        {
            transcript: 'диспетчер задач',
            perform: 'taskmanager'
        },
        {
            transcript: 'открой гитар про',
            perform: 'guitarpro'
        }       
    ],
    hotwords: ['Sam', 'Сэм'],
    parent: window.opener
}

export default config