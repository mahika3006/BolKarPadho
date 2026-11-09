import React, { useState } from 'react';
import { CoachingLanguage, Lesson } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { Bookmark, Volume2, X, Trash2, ArrowRight } from 'lucide-react';
import { speakText, stopAllSpeech } from '../services/speech';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedWords: string[];
  allLessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onRemoveBookmark: (word: string) => void;
  coachingLang: CoachingLanguage;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedWords,
  allLessons,
  onSelectLesson,
  onRemoveBookmark,
  coachingLang
}) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  if (!isOpen) return null;

  const strings = UI_TRANSLATIONS[coachingLang] || UI_TRANSLATIONS.en;

  const handlePlay = async (word: string, langCode: string = 'en-IN') => {
    stopAllSpeech();
    setPlayingWord(word);
    await speakText(
      word,
      langCode,
      'Shivani',
      () => setPlayingWord(word),
      () => setPlayingWord(null)
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="workbook-card w-full max-w-lg bg-paper-50 p-6 relative shadow-2xl border-2 border-paper-300 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-paper-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 id="bookmarks-title" className="text-lg font-black text-ink-900 font-workbook">
              {strings.revisionNotebook}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-paper-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Word List */}
        {bookmarkedWords.length === 0 ? (
          <div className="py-8 text-center text-ink-500">
            <p className="text-sm font-medium">
              No bookmarked words yet. Tap "Save word" in Word Clinic to collect sounds you want to revise.
            </p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
            {bookmarkedWords.map((word) => {
              const matchedLesson = allLessons.find(l => l.trickyWord.toLowerCase() === word.toLowerCase());
              const isPlaying = playingWord === word;

              return (
                <div
                  key={word}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-paper-300 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePlay(word, matchedLesson?.languageCode || 'en-IN')}
                      disabled={isPlaying}
                      className="w-8 h-8 rounded-lg bg-tealbrand-50 text-tealbrand-700 hover:bg-tealbrand-100 flex items-center justify-center border border-tealbrand-300 transition-colors"
                      aria-label={`Hear pronunciation of ${word}`}
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    </button>
                    <div>
                      <span className="text-base font-extrabold text-ink-900 capitalize">
                        {word}
                      </span>
                      {matchedLesson && (
                        <p className="text-xs text-ink-500 truncate max-w-[200px]">
                          {matchedLesson.sentence}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {matchedLesson && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectLesson(matchedLesson);
                          onClose();
                        }}
                        className="btn-tactile-paper px-2.5 py-1 rounded-lg text-xs font-semibold text-tealbrand-700 flex items-center gap-1"
                        title="Open lesson for this word"
                      >
                        <span>Lesson</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(word)}
                      className="p-1.5 text-ink-400 hover:text-coral-600 rounded-lg transition-colors"
                      title="Remove from bookmarks"
                      aria-label={`Remove ${word} from bookmarks`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-paper-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-tactile-teal px-4 py-2 rounded-xl text-xs font-bold text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
