// Using the APIs SpeechRecognition, SpeechGrammarList,
// and SpeechRecognitionEvent
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//Declare available phrases for voice commands.
//Process it to grammar form for input in SpeechGrammarList
let justifyContent = ['center', 'around', 'between', 'end', 'start'];
let grammar = '#JSGF V1.0; grammar justifyContent; public <justifyContent> = ' + justifyContent.join(' | ') + ' ;'

//Linking the phrases to flexbox justify-content value.
let jcOperation = ['center', 'space-around', 'space-between', 'flex-end', 'flex-start'];
let jcDict = {};
for (let i in justifyContent){
    jcDict[justifyContent[i]] = jcOperation[i];
}

//Construct new SpeechRecognition and SpeechGrammarList object.
let recognition = new SpeechRecognition();
let recognitionList = new SpeechGrammarList();

//Using the grammar for the SpeechRecognition object;
recognitionList.addFromString(grammar, 1);
recognition.grammars = recognitionList;

//Setting the language to English.
//No interim results.
//Return only one speech recognition result with no alternatives.
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

container = document.querySelector('.container');
options = document.querySelector('.options');
output = document.querySelector('.output');
startButton = document.querySelector('.listen');

//Display available phrase options.
let actionHTML = '';
justifyContent.forEach((v)=>{
    actionHTML += `<span class="option"> ${v} </span>`;
});
options.innerHTML += actionHTML;

//Start speech recognition when a user clicks the button.
startButton.onclick = ()=>{
    console.log('start listening...');
    recognition.start();
    startButton.textContent = 'Listening...';
}

//use onresult event handler to handle a matched result.
recognition.onresult = (event)=>{
    //get the phrase and confidence value for the speech input.
    flexJC = event.results[0][0].transcript.toLowerCase();
    confidence = event.results[0][0].confidence;
    console.log(confidence);
    console.log(flexJC);
    output.textContent = `Phrase received: ${flexJC}. `;

    //Check if the phrase is one of the available options.
    if (flexJC in jcDict){
        container.style.justifyContent = jcDict[flexJC];
    }
    else{
        output.textContent += `The input does not match any available options`;
        console.log('The input does not match flex justiy content options');
    }
}

//function to end recognition and refresh the button text.
let refreshStatus = ()=>{
    recognition.stop();
    startButton.textContent = 'Click to start';
}

//When speech ended, use onspeechend event handler to stop recognition process.
recognition.onspeechend = ()=>{
    refreshStatus();
}

//Event handler for when the speech phrases matches nothing.
recognition.onnomatch = (event)=>{
    output.textContent = "Unable to recognize any phrase.";
    refreshStatus();
}

//Event handler for when there is an error.
recognition.onerror = (event)=>{
    output.textContent = `Error occurred in recognition: ${event.error}`;
    refreshStatus();
}
