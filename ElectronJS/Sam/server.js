const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const exec = require('child_process').execFile;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/',function(req,res) {
    res.setHeader('200','ok',{'Content-type' : 'text/html; charset = utf8'});
    res.sendFile(__dirname + "/index.html");
  });

const execute = (fileName, params, path) => {
    let promise = new Promise((resolve, reject) => {
        exec(fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
}

app.post('/transcript', function(req, res) {
    let data = req.body.data
        switch(data){
            case 'notepad': execute('notepad++.exe',[],'C:\\Program Files (x86)\\Notepad++')
            break;
            
            case 'player': execute('MusicBee.exe',[],'C:\\Program Files (x86)\\MusicBee')
            break;

            case 'steam': execute('Steam.exe',[],'E:\\games\\Steam')
            break;

            case 'vscode': execute('Code.exe',[],'C:\\Program Files\\Microsoft VS Code\\Code.exe')
            break;

            case 'guitarpro': execute('GuitarPro.exe',[],'G:\\Guitar pro\\Guitar Pro 6')
            break;
            
            case 'taskmanager': execute('taskmgr.exe',[],'C:\\Windows\\System32')
            break;
            
            case 'chrome': execute('Chrome.exe',[],"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe")
            break;
            
            default: console.warn('не опознано')
            break;
        }    
        res.send('success!')
    })

app.listen(8010);