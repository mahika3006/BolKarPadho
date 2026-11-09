import React from 'react';
import { CoachingLanguage, GnaniStatus, Lesson } from '../types';
import { Sparkles, Bookmark, Languages, Volume2, Globe } from 'lucide-react';

interface HeaderProps {
  coachingLang: CoachingLanguage;
  onToggleCoachingLang: (lang: CoachingLanguage) => void;
  currentLesson: Lesson;
  allLessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  gnaniStatus: GnaniStatus;
  bookmarkedWords: string[];
  onOpenBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  coachingLang,
  onToggleCoachingLang,
  currentLesson,
  allLessons,
  onSelectLesson,
  gnaniStatus,
  bookmarkedWords,
  onOpenBookmarks
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-4 pb-2 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-paper-300 pb-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-tealbrand-600 text-white flex items-center justify-center shadow-paper text-xl font-bold border-2 border-tealbrand-700">
            🎙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 font-workbook">
                BolkarPadho
              </h1>
              <span className="text-sm font-hand text-tealbrand-700 font-bold px-2 py-0.5 bg-tealbrand-100 rounded-full border border-tealbrand-500/20">
                बोल कर पढ़ो
              </span>
            </div>
            <p className="text-xs text-ink-700 font-medium">
              {coachingLang === 'hi' 
                ? 'भारतीय विद्यार्थियों के लिए वास्तविक उच्चारण अभ्यास' 
                : 'Voice-first pronunciation practice for Indian classrooms'}
            </p>
          </div>
        </div>

        {/* Right Controls: Provider badge, Language switchers, Bookmarks */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gnani Voice AI Provider Indicator */}
          <div 
            title={gnaniStatus.gnaniConfigured ? "Connected to Gnani Timbre & Prisma Voice AI" : "Using Web Speech Native API"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-paper-300 shadow-sm text-ink-800"
          >
            <span className={`w-2 h-2 rounded-full ${gnaniStatus.gnaniConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="hidden md:inline">
              {gnaniStatus.gnaniConfigured ? 'Gnani Timbre AI' : 'Browser Web Speech'}
            </span>
            <span className="md:hidden">
              {gnaniStatus.gnaniConfigured ? 'Gnani AI' : 'Web Speech'}
            </span>
          </div>

          {/* Coaching Language Switch (English / Hindi) */}
          <div className="flex items-center bg-white rounded-lg p-0.5 border-2 border-paper-300 shadow-sm text-xs font-semibold">
            <button
              onClick={() => onToggleCoachingLang('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                coachingLang === 'en'
                  ? 'bg-tealbrand-600 text-white font-bold shadow-xs'
                  : 'text-ink-700 hover:text-ink-900'
              }`}
              aria-label="Switch coaching instructions to English"
            >
              English
            </button>
            <button
              onClick={() => onToggleCoachingLang('hi')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                coachingLang === 'hi'
                  ? 'bg-tealbrand-600 text-white font-bold shadow-xs'
                  : 'text-ink-700 hover:text-ink-900'
              }`}
              aria-label="निर्देश हिन्दी में बदलें"
            >
              हिंदी
            </button>
          </div>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            className="btn-tactile-paper flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
            aria-label={`View ${bookmarkedWords.length} bookmarked revision words`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedWords.length > 0 ? 'text-amber-500 fill-amber-500' : 'text-ink-500'}`} />
            <span>{bookmarkedWords.length}</span>
          </button>
        </div>
      </div>

      {/* Lesson Selector Ribbon */}
      <div className="mt-3 flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
        <div className="flex items-center gap-1 text-ink-600 font-semibold shrink-0">
          <Globe className="w-3.5 h-3.5 text-tealbrand-600" />
          <span>{coachingLang === 'hi' ? 'पाठ चुनें:' : 'Lessons:'}</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {allLessons.map((lesson, idx) => {
            const isSelected = lesson.id === currentLesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-ink-800 text-white border-ink-900 shadow-sm'
                    : 'bg-white/80 hover:bg-white text-ink-700 border-paper-300'
                }`}
              >
                {idx + 1}. {lesson.languageCode === 'en-IN' ? `"${lesson.trickyWord}"` : lesson.languageName}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
