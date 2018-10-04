var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let justifyContent = ['center', 'around', 'between', 'end', 'start'];
let grammar = '#JSGF V1.0; grammar justifyContent; public <justifyContent> = ' + justifyContent.join(' | ') + ' ;'

let jcOperation = ['center', 'space-around', 'space-between', 'flex-end', 'flex-start'];
let jcDict = {};
for (let i in justifyContent){
    jcDict[justifyContent[i]] = jcOperation[i];
}

let recognition = new SpeechRecognition();
let recognitionList = new SpeechGrammarList();

recognitionList.addFromString(grammar, 1);

recognition.grammars = recognitionList;

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

container = document.querySelector('.container');
options = document.querySelector('.options');
output = document.querySelector('.output');
startButton = document.querySelector('.listen');

let actionHTML = '';
justifyContent.forEach((v)=>{
    actionHTML += `<span class="option"> ${v} </span>`;
});
options.innerHTML += actionHTML;

startButton.onclick = ()=>{
    console.log('start listening...');
    recognition.start();
    startButton.textContent = 'Listening...';
}

recognition.onresult = (event)=>{
    flexJC = event.results[0][0].transcript.toLowerCase();
    confidence = event.results[0][0].confidence;
    console.log(confidence);
    console.log(flexJC);
    output.textContent = `Phrase received: ${flexJC}. `;
    if (flexJC in jcDict){
        container.style.justifyContent = jcDict[flexJC];
    }
    else{
        output.textContent += `The input does not match any available options`;
        console.log('The input does not match flex justiy content options');
    }
}

recognition.onspeechend = ()=>{
    recognition.stop();
    startButton.textContent = 'Click to start';
}

recognition.onnomatch = (event)=>{
    output.textContent = "Unable to recognize any phrase.";
}

recognition.onerror = function(event) {
    output.textContent = `Error occurred in recognition: ${event.error}`;
}
