# Using speech command to change flexbox justify-content value.

## Warning: The SpeechRecognition API is currently only available in Chrome 69 and Chrome for Android 69: partial support with prefix webkit. Also, it requires a microphone.

How to use:
- Press the "Click to start" button in the bottom.
- The browser might prompt you to allow microphone access.
![Grant mic access](https://i.imgur.com/cwVTn8u.png "Mic access prompt on Chrome")
- Say one of the words displayed on the page.
- See its effect on the boxes on the top of the page.

The full documentation on the Web Speech API can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) on MDN.

### Properties, Event Handlers, and Methods used in this project:
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
