import useMediaRecorder from "../hooks/useMediaRecorder";

function Page() {
  const {
    mediaStream,
    mediaRecorder,
    isRecording,
    recordedChunks,
    startRecording,
    stopRecording,
  } = useMediaRecorder();

  console.log(mediaStream);
  console.log(mediaRecorder);
  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={() => {}}>Transcribe Audio</button>

      {recordedChunks.length > 0 && (
        <audio controls>
          <source src={URL.createObjectURL(new Blob(recordedChunks))} />
        </audio>
      )}
    </div>
  );
}

export default Page;
