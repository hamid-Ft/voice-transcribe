import { useState, useEffect, useRef } from "react";
// import AssemblyAI from "assemblyai";

type MediaRecorderHook = {
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  isRecording: boolean;
  recordedChunks: Blob[];
  startRecording: () => void;
  stopRecording: () => void;
};

const useMediaRecorder = (): MediaRecorderHook => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // // Initialize AssemblyAI client
  // const client = new AssemblyAI({
  //   token: "01b35711f29f4fa98738baa18660c9bf",
  // });

  // Function to send audio to AssemblyAI for transcription
  // const sendAudioToAssemblyAI = async () => {
  //   if (recordedChunks.length === 0) {
  //     console.log("No recorded audio to transcribe.");
  //     return;
  //   }
  //   const audioBlob = new Blob(recordedChunks, { type: "audio/wav" });
  //   const audioUrl = URL.createObjectURL(audioBlob);

  //   try {
  //     const transcript = await client.transcripts.create({
  //       audio_url: audioUrl,
  //     });

  //     if (transcript.status === "error") {
  //       console.log(transcript.error);
  //     } else {
  //       console.log(transcript.text);
  //     }
  //   } catch (error) {
  //     console.error("Error transcribing audio:", error);
  //   }

  //   URL.revokeObjectURL(audioUrl);
  // };

  useEffect(() => {
    async function setupMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStreamRef.current = stream;
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }

    setupMediaStream();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        setIsRecording(false);

        // // When recording stops, send audio to AssemblyAI for transcription
        // sendAudioToAssemblyAI();
      };

      setMediaRecorder(recorder);
    }
  }, [mediaStream]);

  const startRecording = () => {
    if (mediaRecorder) {
      setRecordedChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  return {
    mediaStream,
    mediaRecorder,
    isRecording,
    recordedChunks,
    startRecording,
    stopRecording,
  };
};

export default useMediaRecorder;
