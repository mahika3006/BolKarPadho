import React, { useState } from 'react';
import { Lesson, CoachingLanguage, AudioRecording } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { cleanWord } from '../utils/alignment';
import { Volume2, Mic, Square, Play, RotateCcw, AlertCircle, Gauge, User } from 'lucide-react';
import { speakText, stopAllSpeech } from '../services/speech';

interface SentenceReaderProps {
  lesson: Lesson;
  coachingLang: CoachingLanguage;
  isRecording: boolean;
  recordingDuration: number;
  recordedAudio: AudioRecording | null;
  recordingError: string | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onClearRecordings: () => void;
  onOpenClinic: (word: string) => void;
}

export const SentenceReader: React.FC<SentenceReaderProps> = ({
  lesson,
  coachingLang,
  isRecording,
  recordingDuration,
  recordedAudio,
  recordingError,
  onStartRecording,
  onStopRecording,
  onClearRecordings,
  onOpenClinic
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>('Shivani');

  const strings = UI_TRANSLATIONS[coachingLang] || UI_TRANSLATIONS.en;

  // Play full sentence
  const handlePlaySentence = async () => {
    if (isRecording) return; // Never play reference audio while mic is recording
    setIsPlayingSentence(true);
    await speakText(
      lesson.sentence,
      lesson.languageCode,
      selectedVoice,
      playbackSpeed,
      () => setIsPlayingSentence(true),
      () => setIsPlayingSentence(false)
    );
  };

  // Play individual word when tapped
  const handleWordTap = async (word: string, index: number) => {
    if (isRecording) return; // Never play reference audio while mic is recording
    const cleaned = cleanWord(word);
    setActiveWordIndex(index);

    // If student taps the underlined tricky word, open Word Clinic as well
    if (cleaned === cleanWord(lesson.trickyWord)) {
      onOpenClinic(cleaned);
    }

    await speakText(
      word,
      lesson.languageCode,
      selectedVoice,
      playbackSpeed,
      () => setActiveWordIndex(index),
      () => setActiveWordIndex(null)
    );
  };

  // Play student's recorded audio
  const handlePlayStudentRecording = () => {
    if (!recordedAudio) return;
    stopAllSpeech();
    const audio = new Audio(recordedAudio.url);
    setIsPlayingRecorded(true);
    audio.onended = () => setIsPlayingRecorded(false);
    audio.onerror = () => setIsPlayingRecorded(false);
    audio.play();
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}s`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-4">
      {/* Workbook Page Container */}
      <section
        className="workbook-card p-6 sm:p-10 relative overflow-hidden transition-all"
        aria-label="Sentence Practice Card"
      >
        {/* Workbook Decorative Hole Punches on left */}
        <div className="hidden sm:flex flex-col justify-between absolute left-3 top-8 bottom-8 w-4 pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-paper-300 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-paper-300 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-paper-300 shadow-inner" />
        </div>

        {/* Workbook Header Tag & Audio Settings */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-paper-200">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-tealbrand-700 bg-tealbrand-50 px-2.5 py-1 rounded-md border border-tealbrand-500/20">
              {lesson.nativeName} ({lesson.languageName}) • {lesson.context}
            </span>
          </div>

          {/* Voice Controls: Speed (1.0x / 0.85x) & Voice (Shivani / Avinash) */}
          <div className="flex items-center gap-2 text-xs">
            {/* Speed toggle */}
            <button
              type="button"
              onClick={() => setPlaybackSpeed(prev => prev === 1.0 ? 0.85 : 1.0)}
              className={`px-2 py-1 rounded-md border font-bold flex items-center gap-1 transition-all ${playbackSpeed === 0.85
                  ? 'bg-tealbrand-100 border-tealbrand-500 text-tealbrand-800'
                  : 'bg-white border-paper-300 text-ink-600 hover:bg-paper-100'
                }`}
              title="Toggle Slow Pronunciation Speed"
            >
              <span>{playbackSpeed === 0.85 ? '🐢 0.85x (Slow)' : '⚡ 1.0x'}</span>
            </button>

            {/* Voice toggle */}
            <button
              type="button"
              onClick={() => setSelectedVoice(prev => prev === 'Shivani' ? 'Avinash' : 'Shivani')}
              className="px-2 py-1 rounded-md border border-paper-300 bg-white font-bold text-ink-700 hover:bg-paper-100 transition-all flex items-center gap-1"
              title="Switch between female and male Gnani teacher voices"
            >
              <span>{selectedVoice === 'Shivani' ? '👩 Shivani' : '👨 Avinash'}</span>
            </button>
          </div>
        </div>

        {/* DOMINATING PRACTICE SENTENCE */}
        <div className="py-6 sm:py-10 text-center">
          <div className="flex flex-wrap justify-center items-baseline gap-x-3 gap-y-4 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink-900 leading-snug">
            {lesson.targetWords.map((word, idx) => {
              const cleaned = cleanWord(word);
              const isTricky = cleaned === cleanWord(lesson.trickyWord);
              const isActive = activeWordIndex === idx;

              return (
                <button
                  key={`${word}-${idx}`}
                  type="button"
                  onClick={() => handleWordTap(word, idx)}
                  disabled={isRecording}
                  title={isTricky ? `Tricky practice word: "${word}". Click to hear or open Word Clinic.` : `Hear "${word}"`}
                  className={`group relative inline-block transition-all transform duration-150 rounded-xl px-2 py-1 text-left focus:outline-none focus:ring-4 focus:ring-tealbrand-500/40 ${isActive
                      ? 'bg-tealbrand-100 text-tealbrand-800 scale-105 shadow-sm'
                      : 'hover:bg-paper-200 hover:text-tealbrand-700 active:scale-95'
                    }`}
                  aria-label={`Listen to word: ${word}`}
                >
                  <span className={isTricky ? 'hand-drawn-underline text-tealbrand-800 font-black' : ''}>
                    {word}
                  </span>

                  {/* Gentle hover tip on tricky word */}
                  {isTricky && (
                    <span className="hidden sm:block absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-ink-800 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                      {strings.targetWord}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Coaching Instruction Prompt in Selected Language */}
          <p className="mt-6 text-sm sm:text-base text-ink-700 font-medium max-w-xl mx-auto">
            {strings.practiceInstruction}
          </p>
        </div>

        {/* ERROR NOTIFICATION (IF MICROPHONE PERMISSION BLOCKED) */}
        {recordingError && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{recordingError}</p>
              <p className="text-xs text-amber-800 mt-1">
                Tip: You can also use the evaluation toolbar below to test transcription scenarios.
              </p>
            </div>
          </div>
        )}

        {/* PROMINENT AUDIO CONTROLS (Within thumb reach on mobile) */}
        <div className="pt-4 border-t-2 border-paper-200">
          {!isRecording ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* HEAR SENTENCE BUTTON */}
              <button
                type="button"
                onClick={handlePlaySentence}
                disabled={isPlayingSentence}
                className="btn-tactile-paper w-full sm:w-auto px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 text-base font-bold text-ink-900"
                aria-label="Hear the complete sentence pronounced"
              >
                <Volume2 className={`w-5 h-5 text-tealbrand-600 ${isPlayingSentence ? 'animate-bounce' : ''}`} />
                <span>
                  {isPlayingSentence ? strings.speaking : strings.hearSentence}
                </span>
              </button>

              {/* READ ALOUD (RECORD) BUTTON */}
              <button
                type="button"
                onClick={onStartRecording}
                className="btn-tactile-teal w-full sm:w-auto px-8 py-3.5 rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg font-extrabold"
                aria-label="Start recording your voice to read aloud"
              >
                <div className="relative">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <span>
                  {strings.readAloud}
                </span>
              </button>

              {/* STUDENT PLAYBACK IF RECORDED PREVIOUSLY */}
              {recordedAudio && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePlayStudentRecording}
                    disabled={isPlayingRecorded}
                    className="btn-tactile-paper flex-1 sm:flex-initial px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-tealbrand-700 bg-tealbrand-50/50"
                    aria-label="Play back your own voice recording"
                  >
                    <Play className={`w-4 h-4 fill-tealbrand-600 text-tealbrand-600 ${isPlayingRecorded ? 'animate-pulse' : ''}`} />
                    <span>
                      {isPlayingRecorded ? strings.playing : strings.playMyVoice}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onClearRecordings}
                    title="Discard recordings and try again"
                    className="p-3 rounded-2xl text-ink-500 hover:text-coral-600 hover:bg-paper-200 transition-colors"
                    aria-label="Discard recording and start fresh"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE LISTENING STATE */
            <div className="flex flex-col items-center justify-center py-4 bg-tealbrand-50/60 rounded-2xl border-2 border-tealbrand-300">
              <div className="relative flex items-center justify-center mb-3">
                <span className="absolute w-20 h-20 rounded-full bg-tealbrand-500/20 mic-pulse-ring pointer-events-none" />
                <span className="absolute w-14 h-14 rounded-full bg-tealbrand-500/40 animate-ping pointer-events-none" />
                <div className="relative w-14 h-14 rounded-full bg-tealbrand-600 flex items-center justify-center text-white shadow-lg">
                  <Mic className="w-7 h-7 animate-pulse" />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-coral-500 animate-pulse" />
                  <span className="text-lg font-bold text-ink-900 font-mono">
                    {formatTimer(recordingDuration)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-tealbrand-800 mt-1">
                  {strings.listening}
                </p>
              </div>

              {/* STOP BUTTON */}
              <button
                type="button"
                onClick={onStopRecording}
                className="btn-tactile-coral px-8 py-3 rounded-2xl flex items-center gap-2 text-base font-bold text-white shadow-md"
                aria-label="Stop recording and review pronunciation"
              >
                <Square className="w-5 h-5 fill-white" />
                <span>
                  {strings.stopReading}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
