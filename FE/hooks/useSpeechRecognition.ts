import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechRecognitionStatus =
  | "idle"
  | "listening"
  | "processing"
  | "error";

interface UseSpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseSpeechRecognitionReturn {
  isSupported: boolean;

  status: SpeechRecognitionStatus;
  isListening: boolean;

  transcript: string;
  error: string | null;

  start: () => void;
  stop: () => void;
  toggle: () => void;
  reset: () => void;
}

const useSpeechRecognition = ({
  language = "en-US",
  continuous = false,
  interimResults = true,
  onResult,
  onStart,
  onEnd,
  onError,
}: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [status, setStatus] = useState<SpeechRecognitionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);

  const isListening = status === "listening";

  useEffect(() => {
  onStartRef.current = onStart;
  onEndRef.current = onEnd;
  onResultRef.current = onResult;
  onErrorRef.current = onError;
}, [onStart, onEnd, onResult, onError]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    // TODO: need to refactor support detection to avoid setState-in-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(Boolean(SpeechRecognition));
  }, []);

  useEffect(() => {
    if (!isSupported) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;

    recognition.onstart = () => {
      setStatus("listening");
      setError(null);
      onStartRef.current?.();
    };

    recognition.onend = () => {
      setStatus("idle");
      onEndRef.current?.();
    };

    recognition.onerror = (event) => {

      setError(event.error);
      setStatus("error");

      onErrorRef.current?.(event.error);
    };

    recognition.onresult = (event) => {

      let text = "";

      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      const transcript = text.trim();

      setTranscript(transcript);

      onResultRef.current?.(transcript);

      setStatus("idle");
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current = null;
      // recognition.abort();
      // recognitionRef.current = null;
    };
  }, [continuous, interimResults, isSupported, language]);

  const start = useCallback(() => {
    recognitionRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const toggle = useCallback(() => {
    if (!isSupported) {
      return;
    }
    switch (status) {
      case "idle":
        start();
        break;

      case "listening":
        stop();
        break;

      default:
        break;
    }
  }, [isSupported, status, start, stop]);

  const reset = useCallback(() => {
    setTranscript("");
    setError(null);
    setStatus("idle");
  }, []);

  return {
    isSupported,

    status,
    isListening,

    transcript,
    error,

    start,
    stop,
    toggle,
    reset,
  };
};

export default useSpeechRecognition;
