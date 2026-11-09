import React from 'react';
import { CoachingLanguage, GnaniStatus, Lesson } from '../types';
import { GNANI_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { Sparkles, Bookmark, Languages, Volume2, Globe, ChevronDown } from 'lucide-react';

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
  const strings = UI_TRANSLATIONS[coachingLang] || UI_TRANSLATIONS.en;
  const englishLessons = allLessons.filter(l => l.languageCode === 'en-IN');
  const regionalLessons = allLessons.filter(l => l.languageCode !== 'en-IN');

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
              {strings.appTagline}
            </p>
          </div>
        </div>

        {/* Right Controls: Provider badge, ALL 11 Gnani Languages switcher, Bookmarks */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gnani Voice AI Provider Indicator */}
          <div 
            title={gnaniStatus.gnaniConfigured ? "Connected to Gnani Timbre v3.0 & Prisma Voice AI (11 Languages)" : "Using Web Speech Native API"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-paper-300 shadow-sm text-ink-800"
          >
            <span className={`w-2 h-2 rounded-full ${gnaniStatus.gnaniConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="hidden md:inline">
              {gnaniStatus.gnaniConfigured ? 'Gnani Timbre AI (11 Langs)' : 'Browser Web Speech'}
            </span>
            <span className="md:hidden">
              {gnaniStatus.gnaniConfigured ? 'Gnani AI' : 'Web Speech'}
            </span>
          </div>

          {/* Coaching Language Switcher: ALL 11 GNANI LANGUAGES */}
          <div className="flex items-center bg-white rounded-lg px-2 py-1 border-2 border-paper-300 shadow-sm text-xs font-semibold gap-1.5">
            <Languages className="w-3.5 h-3.5 text-tealbrand-600" />
            <label htmlFor="coaching-lang-select" className="text-ink-600 font-bold hidden sm:inline">
              {strings.coachingLabel}
            </label>
            <select
              id="coaching-lang-select"
              value={coachingLang}
              onChange={(e) => onToggleCoachingLang(e.target.value as CoachingLanguage)}
              className="bg-transparent font-bold text-ink-900 cursor-pointer focus:outline-none"
              aria-label="Select Coaching & Instruction Language from all 11 Gnani languages"
            >
              {GNANI_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name.split(' ')[0]})
                </option>
              ))}
            </select>
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

      {/* ALL GNANI LANGUAGES PRACTICE LESSONS RIBBON */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {/* Core English Lessons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-ink-600 font-bold shrink-0 flex items-center gap-1">
            <span>📖</span>
            <span>English:</span>
          </span>
          {englishLessons.map((lesson, idx) => {
            const isSelected = lesson.id === currentLesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-ink-800 text-white border-ink-900 shadow-sm'
                    : 'bg-white hover:bg-paper-200 text-ink-700 border-paper-300'
                }`}
              >
                {idx + 1}. "{lesson.trickyWord}"
              </button>
            );
          })}
        </div>

        {/* All 10 Indian Regional Languages Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-ink-600 font-semibold flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-tealbrand-600" />
            <span className="font-bold">All 11 Gnani Languages:</span>
          </span>
          <select
            value={currentLesson.id}
            onChange={(e) => {
              const selected = allLessons.find(l => l.id === e.target.value);
              if (selected) onSelectLesson(selected);
            }}
            className="bg-white border-2 border-paper-300 rounded-lg px-2 py-1 text-xs font-bold text-ink-800 cursor-pointer shadow-xs focus:ring-2 focus:ring-tealbrand-500"
            aria-label="Select from all Indian regional languages available in Gnani APIs"
          >
            <optgroup label="Classroom English (3 Lessons)">
              {englishLessons.map(l => (
                <option key={l.id} value={l.id}>
                  English: "{l.trickyWord}"
                </option>
              ))}
            </optgroup>
            <optgroup label="All Gnani Regional Languages (10 Languages)">
              {regionalLessons.map(l => (
                <option key={l.id} value={l.id}>
                  {l.nativeName} ({l.languageName}): "{l.trickyWord}"
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </header>
  );
};
