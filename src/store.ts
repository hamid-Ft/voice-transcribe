import { create } from "zustand";

type SpeechRecognitionStore = {
  text: string;
  isListening: boolean;
  notes: string[];
  setText: (text: string) => void;
  setIsListening: (isListening: boolean) => void;
  setNotes: (newNotes: string[]) => void;
};

const useSpeechRecognitionStore = create<SpeechRecognitionStore>((set) => ({
  text: "",
  isListening: false,
  notes: [],
  setText: (text) => set({ text }),
  setIsListening: (isListening) => set({ isListening }),
  setNotes: (newNotes) => set({ notes: newNotes }),
}));

export default useSpeechRecognitionStore;
