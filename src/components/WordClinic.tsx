import React, { useState } from 'react';
import { Lesson, CoachingLanguage, AlignmentResult, AudioRecording } from '../types';
import { cleanWord } from '../utils/alignment';
import { speakText, stopAllSpeech } from '../services/speech';
import { 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  Play, 
  Square,
  HelpCircle,
  Lightbulb,
  Layers,
  SplitSquareVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WordClinicProps {
  lesson: Lesson;
  coachingLang: CoachingLanguage;
  transcript: string;
  alignment: AlignmentResult | null;
  firstRecording: AudioRecording | null;
  latestRecording: AudioRecording | null;
  isOpen: boolean;
  onClose: () => void;
  onNextLesson?: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (word: string) => void;
}

export const WordClinic: React.FC<WordClinicProps> = ({
  lesson,
  coachingLang,
  transcript,
  alignment,
  firstRecording,
  latestRecording,
  isOpen,
  onClose,
  onNextLesson,
  isBookmarked,
  onToggleBookmark
}) => {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [playingAttempt, setPlayingAttempt] = useState<'first' | 'latest' | null>(null);

  if (!isOpen) return null;

  const clinic = lesson.clinic;
  const isMatch = alignment?.isExactMatch;

  // Trigger celebratory confetti once on exact match
  React.useEffect(() => {
    if (isMatch) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (_) {}
    }
  }, [isMatch]);

  // Audio player for reference sounds and phrases
  const handlePlayWord = async (textToSpeak: string, id: string) => {
    stopAllSpeech();
    setPlayingItem(id);
    await speakText(
      textToSpeak,
      lesson.languageCode,
      'Shivani',
      () => setPlayingItem(id),
      () => setPlayingItem(null)
    );
  };

  // Student attempt playback
  const handlePlayAttempt = (recording: AudioRecording, type: 'first' | 'latest') => {
    stopAllSpeech();
    setPlayingAttempt(type);
    const audio = new Audio(recording.url);
    audio.onended = () => setPlayingAttempt(null);
    audio.onerror = () => setPlayingAttempt(null);
    audio.play();
  };

  // Determine what mismatch or target was found
  const substitutedPair = alignment?.mismatchedWords.find(
    m => cleanWord(m.target) === cleanWord(clinic.word)
  ) || alignment?.mismatchedWords[0];

  const heardWord = substitutedPair ? cleanWord(substitutedPair.spoken) : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      <section 
        className="workbook-card p-6 sm:p-8 bg-paper-50 border-2 border-tealbrand-600/30 shadow-paper-lg relative"
        aria-label="Word Clinic Practice Section"
      >
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-paper-200 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              🏥
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-ink-900 font-workbook">
                  Word Clinic
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-tealbrand-100 text-tealbrand-800 font-bold border border-tealbrand-300">
                  {clinic.word}
                </span>
              </div>
              <p className="text-xs text-ink-600 font-medium">
                {coachingLang === 'hi'
                  ? 'ध्वनि अंतर पहचानें और आत्मविश्वास से बोलें'
                  : 'Targeted coaching to master tricky sounds without judgement'}
              </p>
            </div>
          </div>

          {/* Bookmark Word Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(clinic.word)}
            className={`btn-tactile-paper px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isBookmarked ? 'bg-amber-50 border-amber-400 text-amber-800' : ''
            }`}
            aria-label={isBookmarked ? `Word ${clinic.word} bookmarked` : `Bookmark ${clinic.word} for revision`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>{coachingLang === 'hi' ? 'सहेजा गया' : 'Bookmarked'}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-ink-500" />
                <span>{coachingLang === 'hi' ? 'रिवीजन के लिए सहेजें' : 'Save word'}</span>
              </>
            )}
          </button>
        </div>

        {/* 1. "WHAT I HEARD" & ALIGNMENT BANNER */}
        <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-paper-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-500 flex items-center gap-1.5">
              <span>🎧</span>
              <span>{coachingLang === 'hi' ? 'मैंने क्या सुना (What I heard):' : 'What I heard:'}</span>
            </span>
            {isMatch && (
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {coachingLang === 'hi' ? 'बिल्कुल सही!' : 'All words matched'}
              </span>
            )}
          </div>

          {/* Transcript Display with aligned tokens */}
          {transcript ? (
            <div className="text-lg sm:text-xl font-medium text-ink-900 bg-paper-100 p-3 rounded-xl border border-paper-300">
              {alignment?.alignedWords.map((item, idx) => {
                if (item.status === 'matched') {
                  return (
                    <span key={idx} className="text-emerald-700 font-semibold mr-1.5">
                      {item.spokenWord || item.targetWord}
                    </span>
                  );
                }
                if (item.status === 'substituted') {
                  return (
                    <span 
                      key={idx} 
                      className="inline-block bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-md border border-amber-300 mr-1.5 shadow-2xs"
                      title={`Expected "${item.targetWord}", recognizer transcribed "${item.spokenWord}"`}
                    >
                      {item.spokenWord}
                    </span>
                  );
                }
                if (item.status === 'missed') {
                  return (
                    <span 
                      key={idx} 
                      className="inline-block line-through text-ink-400 bg-paper-200 px-1 py-0.5 rounded mr-1.5 text-sm"
                      title={`Target word "${item.targetWord}" was not detected`}
                    >
                      {item.targetWord}
                    </span>
                  );
                }
                // Extra word
                return (
                  <span key={idx} className="text-coral-600 italic text-sm mr-1.5 opacity-80">
                    (+{item.spokenWord})
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-ink-600 italic">
              {coachingLang === 'hi'
                ? 'अभी तक कोई रिकॉर्डिंग नहीं हुई है। आप नीचे दिए गए कोचिंग टूल्स से पहले अभ्यास कर सकते हैं।'
                : 'No recording yet. You can inspect the coaching tools below before speaking.'}
            </p>
          )}

          {/* Friendly Guidance Text */}
          <div className="mt-3 text-sm">
            {isMatch ? (
              <div className="flex items-center justify-between flex-wrap gap-2 text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <span>
                  🎉 {coachingLang === 'hi' 
                    ? 'सभी शब्द सही मिले! अपनी रिकॉर्डिंग दोबारा सुनें या अगला पाठ शुरू करें।' 
                    : 'All words matched. Listen back or try the next sentence.'}
                </span>
                {onNextLesson && (
                  <button
                    onClick={onNextLesson}
                    className="btn-tactile-teal text-xs px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm font-bold"
                  >
                    <span>{coachingLang === 'hi' ? 'अगला वाक्य' : 'Next sentence'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : heardWord ? (
              <div className="text-ink-800 font-medium bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                💡{' '}
                <strong className="text-ink-900 font-bold">
                  “I heard ‘{heardWord}’. Let’s practise ‘{clinic.word}’.”
                </strong>
                <p className="text-xs text-ink-600 mt-1">
                  {coachingLang === 'hi'
                    ? 'अक्षर का न मिलना अभ्यास का संकेत है। यह कोई परीक्षा नहीं, सीखने का सहज अवसर है।'
                    : 'A transcript mismatch is a clue for practice, not a test score. Let’s train your tongue gently.'}
                </p>
              </div>
            ) : (
              <p className="text-xs text-ink-500">
                {coachingLang === 'hi'
                  ? 'सुझाव: एक बार "बोल कर पढ़ें" दबाकर अपनी आवाज़ रिकॉर्ड करें।'
                  : 'Friendly tip: Tap "Read aloud" to compare your pronunciation.'}
              </p>
            )}
          </div>
        </div>

        {/* 2. HEAR THE DIFFERENCE (TWO SEPARATE AUDIO BUTTONS) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4 text-tealbrand-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-800">
              {coachingLang === 'hi' ? 'अंतर सुनें (Hear the difference)' : 'Hear the difference'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contrasting Word Button (e.g. tree) */}
            <button
              type="button"
              onClick={() => handlePlayWord(clinic.contrastingWord, 'contrast')}
              disabled={playingItem !== null}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                playingItem === 'contrast'
                  ? 'bg-amber-100 border-amber-500 shadow-md scale-102'
                  : 'bg-white border-paper-300 hover:border-amber-400 hover:bg-amber-50/30'
              }`}
              aria-label={`Listen to contrasting sound: ${clinic.contrastingWord}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-ink-500 uppercase">
                    {coachingLang === 'hi' ? 'सामान्य भ्रम' : 'Common variant'}
                  </span>
                  <div className="text-2xl font-black text-ink-900 mt-0.5">
                    "{clinic.contrastingWord}"
                  </div>
                  <span className="text-xs font-mono text-ink-600">
                    {clinic.contrastingPhonetic}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                  <Play className={`w-4 h-4 fill-amber-700 text-amber-700 ${playingItem === 'contrast' ? 'animate-ping' : ''}`} />
                </div>
              </div>
              <p className="text-xs text-ink-600 mt-2 font-medium">
                {coachingLang === 'hi' ? 'जीभ तालू पर लगती है (T sound)' : 'Tongue taps the roof of the mouth'}
              </p>
            </button>

            {/* Target Word Button (e.g. three) */}
            <button
              type="button"
              onClick={() => handlePlayWord(clinic.word, 'target')}
              disabled={playingItem !== null}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                playingItem === 'target'
                  ? 'bg-tealbrand-100 border-tealbrand-600 shadow-md scale-102'
                  : 'bg-tealbrand-50/40 border-tealbrand-300 hover:border-tealbrand-500 hover:bg-tealbrand-50'
              }`}
              aria-label={`Listen to target sound: ${clinic.word}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-tealbrand-700 uppercase">
                    {coachingLang === 'hi' ? 'लक्ष्य उच्चारण' : 'Target word'}
                  </span>
                  <div className="text-2xl font-black text-tealbrand-900 mt-0.5">
                    "{clinic.displayWord}"
                  </div>
                  <span className="text-xs font-mono text-tealbrand-700">
                    {clinic.phonetic}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center shadow-sm">
                  <Play className={`w-4 h-4 fill-white text-white ${playingItem === 'target' ? 'animate-ping' : ''}`} />
                </div>
              </div>
              <p className="text-xs text-tealbrand-800 mt-2 font-medium">
                {coachingLang === 'hi' ? 'जीभ दाँतों के बीच हल्की बाहर आती है' : 'Soft air slips through teeth'}
              </p>
            </button>
          </div>
        </div>

        {/* 3. TRY THIS & HINDI EXPLANATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Try This (English Coaching) */}
          <div className="p-4 rounded-2xl bg-white border-2 border-paper-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-800">
                Try this
              </h4>
            </div>
            <p className="text-sm text-ink-800 leading-relaxed font-medium">
              “{clinic.explanationEn}”
            </p>
          </div>

          {/* हिंदी में समझें (Hindi Coaching) */}
          <div className="p-4 rounded-2xl bg-white border-2 border-paper-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🇮🇳</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-800">
                हिंदी में समझें
              </h4>
            </div>
            <p className="text-sm text-ink-800 leading-relaxed font-medium">
              “{clinic.explanationHi}”
            </p>
          </div>
        </div>

        {/* 4. BUILD IT UP (STEP-BY-STEP LADDER) */}
        <div className="mb-6 p-4 rounded-2xl bg-white border-2 border-paper-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-tealbrand-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800">
                {coachingLang === 'hi' ? 'कदम-दर-कदम अभ्यास (Build it up)' : 'Build it up'}
              </h3>
            </div>
            <span className="text-xs text-ink-500 font-medium">
              {coachingLang === 'hi' ? 'छोटे से बड़े वाक्य की ओर बढ़ें' : 'Word → Phrase → Full Sentence'}
            </span>
          </div>

          <div className="space-y-2.5">
            {clinic.buildUpPhrases.map((phrase, idx) => {
              const phraseId = `buildup-${idx}`;
              const isPlaying = playingItem === phraseId;

              return (
                <div
                  key={phraseId}
                  className="flex items-center justify-between p-3 rounded-xl bg-paper-100 hover:bg-paper-200 border border-paper-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-paper-300 text-ink-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-ink-900">
                      {phrase}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayWord(phrase, phraseId)}
                    disabled={playingItem !== null}
                    className="btn-tactile-paper px-3 py-1.5 rounded-lg text-xs font-bold text-tealbrand-700 flex items-center gap-1.5"
                    aria-label={`Listen to phrase: ${phrase}`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isPlaying ? '...' : (coachingLang === 'hi' ? 'सुनें' : 'Hear')}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. COMPARE MY ATTEMPTS (SIDE-BY-SIDE RECORDINGS) */}
        <div className="p-4 rounded-2xl bg-paper-100 border-2 border-paper-300">
          <div className="flex items-center gap-2 mb-3">
            <SplitSquareVertical className="w-4 h-4 text-tealbrand-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800">
              {coachingLang === 'hi' ? 'प्रयासों की तुलना करें (Compare my attempts)' : 'Compare my attempts'}
            </h3>
          </div>

          {firstRecording ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First attempt */}
              <div className="p-3.5 rounded-xl bg-white border border-paper-300 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink-500 uppercase">
                    {coachingLang === 'hi' ? 'पहला प्रयास' : 'First attempt'}
                  </span>
                  <div className="text-xs text-ink-600 mt-0.5">
                    ⏱️ {(firstRecording.durationMs / 1000).toFixed(1)}s
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlayAttempt(firstRecording, 'first')}
                  disabled={playingAttempt !== null}
                  className="mt-3 btn-tactile-paper w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-ink-900"
                  aria-label="Play back first attempt audio"
                >
                  <Play className={`w-3.5 h-3.5 fill-ink-700 text-ink-700 ${playingAttempt === 'first' ? 'animate-ping' : ''}`} />
                  <span>
                    {playingAttempt === 'first' 
                      ? (coachingLang === 'hi' ? 'बज रहा है...' : 'Playing...') 
                      : (coachingLang === 'hi' ? 'पहला प्रयास सुनें' : 'Play first attempt')}
                  </span>
                </button>
              </div>

              {/* Latest attempt */}
              <div className="p-3.5 rounded-xl bg-white border border-tealbrand-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-tealbrand-700 uppercase">
                      {coachingLang === 'hi' ? 'नवीनतम प्रयास' : 'Latest attempt'}
                    </span>
                    {latestRecording && latestRecording.id !== firstRecording.id && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-tealbrand-100 text-tealbrand-800 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-600 mt-0.5">
                    ⏱️ {((latestRecording?.durationMs || firstRecording.durationMs) / 1000).toFixed(1)}s
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlayAttempt(latestRecording || firstRecording, 'latest')}
                  disabled={playingAttempt !== null}
                  className="mt-3 btn-tactile-teal w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white shadow-sm"
                  aria-label="Play back latest attempt audio"
                >
                  <Play className={`w-3.5 h-3.5 fill-white text-white ${playingAttempt === 'latest' ? 'animate-ping' : ''}`} />
                  <span>
                    {playingAttempt === 'latest' 
                      ? (coachingLang === 'hi' ? 'बज रहा है...' : 'Playing...') 
                      : (coachingLang === 'hi' ? 'नवीनतम प्रयास सुनें' : 'Play latest attempt')}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-ink-500 italic bg-white rounded-xl border border-dashed border-paper-300">
              {coachingLang === 'hi'
                ? 'तुलना करने के लिए ऊपर "बोल कर पढ़ें" दबाकर कम से कम एक बार वाक्य बोलें।'
                : 'Record at least once using "Read aloud" above to listen and compare your improvements.'}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
