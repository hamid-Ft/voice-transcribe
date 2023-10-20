import { useCallback, useEffect, useState } from "react";

const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new recognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);

  const handleListen = useCallback(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setText(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }, [isListening]);

  const handleNotes = () => {
    setNotes([...notes, text]);
    setText("");
  };

  useEffect(() => {
    handleListen();
  }, [handleListen]);

  return {
    text,
    isListening,
    notes,
    setNotes,
    handleListen,
    handleNotes,
    setIsListening,
    hasRecognitionSupport: !!mic,
  };
};

export default useSpeechRecognition;
