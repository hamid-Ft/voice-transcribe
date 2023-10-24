import { useState } from "react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import axios from "axios";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const assemblyAPI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: apiKey,
    "conten-type": "application/json",
  },
});

const initialState = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0,
  },
};

const Assembly = () => {
  const [audioDetails, setAudioDetails] = useState(initialState);

  const [transcript, setTranscript] = useState({ id: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (transcript.id && transcript.status !== "completed" && isLoading) {
        try {
          const { data: transcriptData } = await assemblyAPI.get(
            `/transcript/${transcript.id}`
          );
          setTranscript({ ...transcript, ...transcriptData }); // till "completed" status
        } catch (error) {
          console.error(error);
        }
      } else {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, transcript]);

  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };
  const handleReset = () => {
    setAudioDetails({ ...initialState });
    setTranscript({ id: "" });
  };
  const handleAudioUpload = async (audioFile) => {
    setIsLoading(true);

    const { data: uploadResponse } = await assemblyAPI.post(
      "/upload",
      audioFile
    );

    const { data } = await assemblyAPI.post("/transcript", {
      audio_url: uploadResponse.upload_url,
      sentiment_analysis: true,
      entity_detection: true,
      iab_categories: true,
    });
    setTranscript({ id: data.id });
  };

  return (
    <>
      <div>
        <Recorder
          record={true}
          audioURL={audioDetails.url}
          handleAudioStop={handleAudioStop}
          handleAudioUpload={handleAudioUpload}
          handleReset={handleReset}
        />
      </div>
      <div>
        {transcript.text && transcript.status === "completed"
          ? transcript.text
          : "Loading..."}
      </div>
    </>
  );
};

export default Assembly;
