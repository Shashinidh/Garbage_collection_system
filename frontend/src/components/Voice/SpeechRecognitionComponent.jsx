import React, { useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionComponent = () => {
  const { transcript, resetTranscript, startListening, listening } = useSpeechRecognition(); 

  useEffect(() => {
    if (transcript.toLowerCase().includes('insert')) { 
      window.location.href = '/insert'; 
      resetTranscript(); 
    }
  }, [transcript, resetTranscript]);

  return (
    <div>
      {/* Start button for speech recognition */}
      <button onClick={() => startListening()}>Start</button>

      {/* Display microphone status */}
      <p>Microphone: {listening ? 'on' : 'off'}</p>

      {/* Display transcript */}
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
