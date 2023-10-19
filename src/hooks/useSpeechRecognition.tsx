import { useEffect, useState } from "react";

let recognition: SpeechRecognition | null = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // console.log("onResultEvent : ", event.results[0][0].transcript);
      setText((prev) => (prev += " " + event.results[0][0].transcript));
      setIsListening(false);
      recognition?.stop();
    };
  }, []);
  const startListening = () => {
    setIsListening(true);
    recognition?.start();
  };
  const stopListening = () => {
    setText("");
    setIsListening(false);
    recognition?.stop();
  };
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
