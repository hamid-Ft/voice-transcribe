import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Speech = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div className="w-full min-h-screen bg-blue-200 text-lg">
      {hasRecognitionSupport ? (
        <>
          <div className="flex  justify-center gap-12 pt-20">
            <button
              className="bg-red-400  hover:scale-105 transition-all p-4 rounded"
              onClick={startListening}>
              Start Listening
            </button>

            <button
              className="bg-slate-400  hover:scale-105 transition-all  p-4 rounded"
              onClick={stopListening}>
              Stop Listening
            </button>
          </div>
          <p className="text-center pt-12" title="Transcribed Text">
            {text ? text : <span className="animate-pulse-fast"> | </span>}
          </p>
          <div className="text-center pt-20">
            {isListening && <div>Your Browser is currently listening</div>}
          </div>
        </>
      ) : (
        <h1>Your Browser has no Support</h1>
      )}
    </div>
  );
};

export default Speech;
