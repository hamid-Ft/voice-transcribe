import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Speech = () => {
  const {
    text,
    notes,
    setNotes,
    setIsListening,
    isListening,
    handleNotes,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const removeNotes = () => {
    setNotes([]);
  };

  return (
    <div className="w-full min-h-[50vh] bg-blue-200 text-lg">
      {hasRecognitionSupport ? (
        <>
          <div className="flex  justify-center gap-12 pt-16">
            <button
              className="bg-red-400  hover:scale-105 transition-all p-4 rounded"
              onClick={() => setIsListening(true)}>
              {isListening ? <span>🔴</span> : <span> &nbsp;&nbsp; </span>}
              Start Listening 🎙️
            </button>

            <button
              className="bg-slate-400  hover:scale-105 transition-all  p-4 rounded"
              onClick={() => setIsListening(false)}>
              Stop Listening 🟥
            </button>
          </div>
          <p className="text-center pt-8" title="Transcribed Text">
            {text ? text : <span className="animate-pulse-fast"> | </span>}
          </p>
          <div className="text-center pt-10">
            {isListening && <div>Your Browser is currently listening</div>}
          </div>
          <div className="flex items-center justify-center text-center gap-12">
            <button
              className="bg-green-400  hover:scale-105 transition-all  p-4 rounded w-44"
              onClick={handleNotes}
              disabled={!notes}>
              {" "}
              Save Note{" "}
            </button>
            <button
              className="bg-red-500  hover:scale-105 transition-all  p-4 rounded w-44
              "
              onClick={removeNotes}
              disabled={!notes}>
              {" "}
              Delete Note{" "}
            </button>
          </div>
          <div className="text-center">
            {notes.map((note) => (
              <p key={note} className="p-1">
                {note}
              </p>
            ))}
          </div>
        </>
      ) : (
        <h1>Your Browser has no Support</h1>
      )}
    </div>
  );
};

export default Speech;
