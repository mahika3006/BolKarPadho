import { useState, useRef, useEffect, useCallback } from 'react';
import { AudioRecording } from '../types';
import { stopAllSpeech, transcribeWithGnani } from '../services/speech';

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  recordingDuration: number;
  audioLevel: number; // 0 to 100 for live reactive visualizer
  recordedAudio: AudioRecording | null;
  firstRecording: AudioRecording | null;
  latestRecording: AudioRecording | null;
  transcript: string;
  error: string | null;
  isTranscribing: boolean;
  startRecording: (languageCode?: string) => Promise<void>;
  stopRecording: () => Promise<AudioRecording | null>;
  clearRecordings: () => void;
  setSimulatedTranscript: (spokenText: string) => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [recordedAudio, setRecordedAudio] = useState<AudioRecording | null>(null);
  const [firstRecording, setFirstRecording] = useState<AudioRecording | null>(null);
  const [latestRecording, setLatestRecording] = useState<AudioRecording | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const recognitionRef = useRef<any>(null);
  const speechRecognitionTranscriptRef = useRef<string>('');
  const currentLangCodeRef = useRef<string>('en-IN');
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Release microphone on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (_) {}
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (_) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
    };
  }, []);

  const startRecording = useCallback(async (languageCode: string = 'en-IN') => {
    // CRITICAL: Never play reference audio while the mic is recording
    stopAllSpeech();
    setError(null);
    setTranscript('');
    audioChunksRef.current = [];
    speechRecognitionTranscriptRef.current = '';
    currentLangCodeRef.current = languageCode;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      // Web Audio API live analyzer for visual frequency meter
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.5;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          audioContextRef.current = audioCtx;
          analyserRef.current = analyser;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateVolume = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const avg = sum / bufferLength;
            setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateVolume);
          };
          updateVolume();
        }
      } catch (_) {}

      // Initialize browser SpeechRecognition if supported
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = languageCode;

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            const clean = current.trim();
            speechRecognitionTranscriptRef.current = clean;
            setTranscript(clean);
          };

          recognition.onerror = (event: any) => {
            console.warn('[SpeechRecognition Notice]', event.error);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('SpeechRecognition could not be started:', e);
        }
      }

      // Initialize MediaRecorder for student playback
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/wav';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100); // 100ms chunk interval
      startTimeRef.current = Date.now();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 200);

    } catch (err: any) {
      console.error('Microphone access failed:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission was denied. Please allow microphone access in your browser address bar.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone or use the simulation mode.');
      } else {
        setError(`Microphone error: ${err.message || 'Unable to start recording'}`);
      }
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<AudioRecording | null> => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (_) {}
      audioContextRef.current = null;
    }
    setAudioLevel(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      recognitionRef.current = null;
    }

    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === 'inactive') {
        setIsRecording(false);
        resolve(null);
        return;
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm'
        });
        const duration = Date.now() - startTimeRef.current;
        const audioUrl = URL.createObjectURL(audioBlob);

        // Always release the microphone track immediately
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        const newRecording: AudioRecording = {
          id: `rec-${Date.now()}`,
          url: audioUrl,
          blob: audioBlob,
          durationMs: duration,
          timestamp: Date.now(),
          transcript: speechRecognitionTranscriptRef.current
        };

        setRecordedAudio(newRecording);
        setLatestRecording(newRecording);

        // Preserve first attempt for side-by-side comparison
        setFirstRecording(prev => prev ? prev : newRecording);

        setIsRecording(false);

        // If Web Speech didn't catch transcript, attempt Gnani STT on the recorded blob
        if (!speechRecognitionTranscriptRef.current.trim()) {
          setIsTranscribing(true);
          const gnaniTranscript = await transcribeWithGnani(audioBlob, currentLangCodeRef.current);
          setIsTranscribing(false);
          if (gnaniTranscript) {
            setTranscript(gnaniTranscript);
            newRecording.transcript = gnaniTranscript;
          }
        }

        resolve(newRecording);
      };

      try {
        recorder.stop();
      } catch (e) {
        console.error('Error stopping MediaRecorder:', e);
        setIsRecording(false);
        resolve(null);
      }
    });
  }, []);

  const clearRecordings = useCallback(() => {
    if (firstRecording?.url) URL.revokeObjectURL(firstRecording.url);
    if (latestRecording?.url && latestRecording.url !== firstRecording?.url) {
      URL.revokeObjectURL(latestRecording.url);
    }
    setRecordedAudio(null);
    setFirstRecording(null);
    setLatestRecording(null);
    setTranscript('');
    setError(null);
    setRecordingDuration(0);
    setAudioLevel(0);
  }, [firstRecording, latestRecording]);

  const setSimulatedTranscript = useCallback((spokenText: string) => {
    setTranscript(spokenText);
    setError(null);
  }, []);

  return {
    isRecording,
    recordingDuration,
    audioLevel,
    recordedAudio,
    firstRecording,
    latestRecording,
    transcript,
    error,
    isTranscribing,
    startRecording,
    stopRecording,
    clearRecordings,
    setSimulatedTranscript
  };
}
