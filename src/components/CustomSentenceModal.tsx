import React, { useState } from 'react';
import { Lesson, CoachingLanguage } from '../types';
import { createCustomLesson, getRandomGeneratedLesson, SENTENCE_CATEGORIES } from '../services/sentenceGenerator';
import { Sparkles, Dices, BookOpen, X, ArrowRight, Wand2 } from 'lucide-react';

interface CustomSentenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyLesson: (lesson: Lesson) => void;
  coachingLang: CoachingLanguage;
}

export const CustomSentenceModal: React.FC<CustomSentenceModalProps> = ({
  isOpen,
  onClose,
  onApplyLesson,
  coachingLang
}) => {
  const [inputSentence, setInputSentence] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSentence.trim()) {
      setError('Please enter a sentence to practise.');
      return;
    }
    if (inputSentence.trim().split(/\s+/).length < 2) {
      setError('Please enter at least 2 words to make a complete phrase or sentence.');
      return;
    }

    const newLesson = createCustomLesson(inputSentence.trim());
    onApplyLesson(newLesson);
    onClose();
    setInputSentence('');
    setError(null);
  };

  const handleRandomRoll = (category?: string) => {
    const cat = category || (selectedCategory === 'All Topics' ? undefined : selectedCategory);
    const randomLesson = getRandomGeneratedLesson(cat);
    onApplyLesson(randomLesson);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="workbook-card w-full max-w-xl bg-paper-50 p-6 sm:p-7 relative shadow-2xl border-2 border-paper-300 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-sentence-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-paper-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              ♾️
            </span>
            <div>
              <h3 id="custom-sentence-title" className="text-lg font-black text-ink-900 font-workbook">
                Infinite Vocabulary & Custom Practice
              </h3>
              <p className="text-xs text-ink-600">
                Type any sentence from your school textbook or roll an infinite random topic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-paper-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleStartCustom} className="space-y-4">
          <div>
            <label htmlFor="custom-sentence-input" className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Type or paste your own sentence:
            </label>
            <textarea
              id="custom-sentence-input"
              rows={3}
              value={inputSentence}
              onChange={(e) => {
                setInputSentence(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Photosynthesis helps green plants make food using sunlight."
              className="w-full p-3 rounded-xl border-2 border-paper-300 bg-white text-ink-900 text-sm font-medium focus:outline-none focus:border-tealbrand-600 focus:ring-2 focus:ring-tealbrand-200"
            />
            {error && (
              <p className="text-xs text-coral-600 font-semibold mt-1">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <button
              type="submit"
              className="btn-tactile-teal w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Practise this sentence</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-ink-500 font-bold uppercase sm:inline hidden">OR</span>

            {/* Random Infinite Generator Button */}
            <button
              type="button"
              onClick={() => handleRandomRoll()}
              className="btn-tactile-paper w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-ink-800 flex items-center justify-center gap-1.5 bg-amber-50/50 hover:bg-amber-100/60 border-amber-300"
            >
              <Dices className="w-4 h-4 text-amber-600" />
              <span>🎲 Generate Random Sentence</span>
            </button>
          </div>
        </form>

        {/* Category Presets / Quick Topics */}
        <div className="mt-5 pt-4 border-t border-paper-200">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-600 block mb-2">
            Explore Topics (Infinite Sentences):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SENTENCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleRandomRoll(cat === 'All Topics' ? undefined : cat)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-tealbrand-50 border border-paper-300 text-ink-700 hover:text-tealbrand-800 transition-all flex items-center gap-1"
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
