import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LESSONS } from './data/lessons';
import { Lesson, CoachingLanguage, GnaniStatus } from './types';
import { alignTranscripts } from './utils/alignment';
import { checkGnaniStatus } from './services/speech';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { Header } from './components/Header';
import { SentenceReader } from './components/SentenceReader';
import { WordClinic } from './components/WordClinic';
import { BookmarksModal } from './components/BookmarksModal';
import { DemoToolbar } from './components/DemoToolbar';

const VALID_COACHING_LANGS: CoachingLanguage[] = [
  'en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'or'
];

export function App() {
  // Lessons
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);

  // Coaching language (ALL 11 Gnani Indian languages supported)
  const [coachingLang, setCoachingLang] = useState<CoachingLanguage>(() => {
    const saved = localStorage.getItem('bolkar_coaching_lang') as CoachingLanguage;
    return (saved && VALID_COACHING_LANGS.includes(saved)) ? saved : 'en';
  });

  // Bookmarked tricky words
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bolkar_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Completed lessons tracking
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bolkar_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Word Clinic state
  const [isClinicOpen, setIsClinicOpen] = useState<boolean>(true); // Start visible for immediate discovery
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);

  // Gnani AI backend integration status
  const [gnaniStatus, setGnaniStatus] = useState<GnaniStatus>({
    online: true,
    gnaniConfigured: true,
    provider: 'Checking Gnani Timbre & Prisma (11 Languages)...',
    supportedLanguages: [],
    defaultVoice: 'Shivani'
  });

  // Voice recorder and transcription hook
  const {
    isRecording,
    recordingDuration,
    recordedAudio,
    firstRecording,
    latestRecording,
    transcript,
    error: recordingError,
    startRecording,
    stopRecording,
    clearRecordings,
    setSimulatedTranscript
  } = useAudioRecorder();

  const clinicRef = useRef<HTMLDivElement>(null);

  // Check Gnani AI backend health on mount
  useEffect(() => {
    checkGnaniStatus().then(status => {
      setGnaniStatus(status);
    });
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('bolkar_coaching_lang', coachingLang);
  }, [coachingLang]);

  useEffect(() => {
    localStorage.setItem('bolkar_bookmarks', JSON.stringify(bookmarkedWords));
  }, [bookmarkedWords]);

  useEffect(() => {
    localStorage.setItem('bolkar_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Compute word alignment whenever transcript changes
  const alignment = useMemo(() => {
    if (!transcript.trim()) return null;
    return alignTranscripts(currentLesson.sentence, transcript);
  }, [currentLesson.sentence, transcript]);

  // If exact match achieved, mark lesson as completed
  useEffect(() => {
    if (alignment?.isExactMatch && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons(prev => [...prev, currentLesson.id]);
    }
  }, [alignment, currentLesson.id, completedLessons]);

  // Open clinic when an attempt completes
  const handleStopRecording = async () => {
    await stopRecording();
    setIsClinicOpen(true);
    // Smooth scroll to clinic after recording
    setTimeout(() => {
      clinicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  const handleStartRecording = async () => {
    await startRecording(currentLesson.languageCode);
  };

  // Open clinic manually by tapping underlined practice word
  const handleOpenClinic = () => {
    setIsClinicOpen(true);
    setTimeout(() => {
      clinicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleToggleBookmark = (word: string) => {
    const lower = word.toLowerCase();
    setBookmarkedWords(prev =>
      prev.includes(lower) ? prev.filter(w => w !== lower) : [...prev, lower]
    );
  };

  const handleSelectLesson = (lesson: Lesson) => {
    clearRecordings();
    setCurrentLesson(lesson);
    setIsClinicOpen(true);
  };

  const handleNextLesson = () => {
    const currentIndex = LESSONS.findIndex(l => l.id === currentLesson.id);
    const nextIndex = (currentIndex + 1) % LESSONS.length;
    handleSelectLesson(LESSONS[nextIndex]);
  };

  // Quick simulation helper for presentation / evaluation
  const handleSimulate = (simulatedSpoken: string) => {
    setSimulatedTranscript(simulatedSpoken);
    setIsClinicOpen(true);
    setTimeout(() => {
      clinicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Workbook Header */}
        <Header
          coachingLang={coachingLang}
          onToggleCoachingLang={setCoachingLang}
          currentLesson={currentLesson}
          allLessons={LESSONS}
          onSelectLesson={handleSelectLesson}
          gnaniStatus={gnaniStatus}
          bookmarkedWords={bookmarkedWords}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
        />

        {/* Practice Screen - Dominating Sentence Reader */}
        <main>
          <SentenceReader
            lesson={currentLesson}
            coachingLang={coachingLang}
            isRecording={isRecording}
            recordingDuration={recordingDuration}
            recordedAudio={recordedAudio}
            recordingError={recordingError}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onClearRecordings={clearRecordings}
            onOpenClinic={handleOpenClinic}
          />

          {/* Signature Feature: Word Clinic */}
          <div ref={clinicRef}>
            <WordClinic
              lesson={currentLesson}
              coachingLang={coachingLang}
              transcript={transcript}
              alignment={alignment}
              firstRecording={firstRecording}
              latestRecording={latestRecording}
              isOpen={isClinicOpen}
              onClose={() => setIsClinicOpen(false)}
              onNextLesson={handleNextLesson}
              isBookmarked={bookmarkedWords.includes(currentLesson.clinic.word.toLowerCase())}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>

          {/* Demo & Evaluation Toolbar */}
          <DemoToolbar
            onSimulate={handleSimulate}
            gnaniStatus={gnaniStatus}
            coachingLang={coachingLang}
          />
        </main>
      </div>

      {/* Revision Bookmarks Drawer Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedWords={bookmarkedWords}
        allLessons={LESSONS}
        onSelectLesson={handleSelectLesson}
        onRemoveBookmark={handleToggleBookmark}
        coachingLang={coachingLang}
      />

      {/* School Workbook Subtle Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 py-6 text-center text-xs text-ink-500 border-t border-paper-300/80">
        <p className="font-medium">
          BolkarPadho (बोल कर पढ़ो) • Supporting <strong>all 11 languages</strong> in Gnani.ai Vachana Voice AI (English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, മലയാളം, मराठी, বাংলা, ગુજરાતી, ਪੰਜਾਬੀ, ଓଡ଼ିଆ).
        </p>
        <p className="mt-1 text-[11px] text-ink-400">
          Designed for Indian classrooms • No sign-in required • Audio recordings stored purely in-memory
        </p>
      </footer>
    </div>
  );
}

export default App;
