# Using speech command to change flexbox justify-content value.

**Warning: The SpeechRecognition API is currently only available in Chrome 69 and Chrome for Android 69: partial support with prefix webkit. Also, it requires a microphone.**

## How to run this project:
- Download the files
- Open index.html with the latest Google Chrome.

```bash
git clone https://github.com/MakeFang/web_speech_api.git
cd web_speech_api
open -a "Google Chrome" index.html
```

### How to use:
- Press the "Click to start" button at the bottom.
- The browser might prompt you to allow microphone access.
![Grant mic access](https://i.imgur.com/cwVTn8u.png "Mic access prompt on Chrome")
- Say one of the words displayed on the "available commands" list.
- See its effect on the boxes on the top of the page.

## Documentations
The full documentation on the Web Speech API can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) on MDN.

## Properties, Event Handlers, and Methods used in this project:

- SpeechRecognition interface: the main interface used for speech recognition.
    - SpeechRecognition.lang:
        - Sets the language that will be recognized. Set to English is this project.
    - SpeechRecognition.interimResults:
        - Controls whether interim results should be returned. Set to false in this project as we are only trying to recognize single words.
    - SpeechRecognition.maxAlternatives:
        - Specifies the max amount of alternative results from the speech recognition. Set to 1 for this projrct, but as one of the phrase "end" is commonly recognized as "and", I might try to explore alternative results in the future.
    - SpeechRecognition.start() and SpeechRecognition.stop()
    - Event Handlers:
        - SpeechRecognition.onresult:
            - When the service returns a result. Gives the words/phrases along with the confidence level.
        - SpeechRecognition.onspeechend:
            - When the speech is no longer detected.
        - SpeechRecognition.onnomatch:
            - When the service cannot detect significant recognition.
        - SpeechRecognition.onerror:
            - When the service encounters an error, e.g. when there is no speech detected.

- SpeechGrammarList interface and SpeechRecognition.grammars property:
    - Apparently grammars are not yet supported in Chrome, but is supported experimentally in Firefox.
    
### code samples

This section is incomplete. It does not yet contain all of the properties, methods, and event handlers used in this project.

```javascript
//Use the constructor for a new speech recognition object.
let recognition = new SpeechRecognition();

//set the language to be recognized to English (US).
recognition.lang = 'en-US';

//start the recognition process
recognition.start();

//Event handling when there is a result.
recognition.onresult = (event)=>{
    //get the phrase and confidence value for the speech input.
    speechInput = event.results[0][0].transcript.toLowerCase();
    speechConfidence = event.results[0][0].confidence;
    
    //log the speech input and the confidence in the console.
    console.log(speechInput);
    console.log(speechConfidence);
}
```

## Why use speech API?

- Accessibility:
    - An intuitive use for the speech api is to build a auto audio-to-text-transcription service for people with hearing disabilities.
    - It could also be useful for individuals that is not comfortable typing on a keyboard.
- Industrial:
    - A voice controlled tool could be useful when hands alone do not suffice. 
    - For example: When I'm driving, my hands are occupied. However, I can still talk, and so a voice controlled tool will be valuable here.
