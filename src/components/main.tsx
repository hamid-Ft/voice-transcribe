import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Main = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onClick={startListening}>Start Listening</button>
          </div>
          <div>
            <button onClick={stopListening}>Stop Listening</button>
          </div>

          {isListening && <div>Your Browser is currently listening</div>}
          {text}
        </>
      ) : (
        <h1>Your Browser has no Support</h1>
      )}
    </div>
  );
};

export default Main;
