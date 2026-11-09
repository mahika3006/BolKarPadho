import React, { useState } from 'react';
import { CoachingLanguage, GnaniStatus } from '../types';
import { Sparkles, PlayCircle, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface DemoToolbarProps {
  onSimulate: (transcript: string) => void;
  gnaniStatus: GnaniStatus;
  coachingLang: CoachingLanguage;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  onSimulate,
  gnaniStatus,
  coachingLang
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <aside 
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-4 mb-8"
      aria-label="Demo Testing Controls"
    >
      <div className="bg-white/90 backdrop-blur-xs border-2 border-paper-300 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-ink-800 text-white flex items-center justify-center text-xs font-bold">
              ⚡
            </span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-ink-900">
                Demo & Evaluation Toolkit
              </span>
              <span className="text-[11px] text-ink-500 ml-2 hidden sm:inline">
                (Test exact match, substitution, or simulated speech instantly)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-tealbrand-50 text-tealbrand-800 border border-tealbrand-200">
              {gnaniStatus.gnaniConfigured ? 'Gnani Timbre v3.0' : 'Web Speech'}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-paper-200"
              aria-label={isExpanded ? "Collapse evaluation toolkit" : "Expand evaluation toolkit"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-paper-200 text-xs">
            <p className="text-ink-600 mb-2 font-medium">
              Click any quick evaluation preset to test Word Clinic and transcript alignment without needing physical microphone input:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSimulate('I think the answer is tree.')}
                className="btn-tactile-paper p-2.5 rounded-xl text-left font-semibold text-amber-900 border-amber-300 hover:bg-amber-50"
              >
                <div className="font-bold text-amber-800">1. Substitution ("tree")</div>
                <div className="text-[11px] text-ink-600 truncate">
                  "I think the answer is tree."
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSimulate('I think the answer is three.')}
                className="btn-tactile-paper p-2.5 rounded-xl text-left font-semibold text-emerald-900 border-emerald-300 hover:bg-emerald-50"
              >
                <div className="font-bold text-emerald-800">2. Exact Match ("three")</div>
                <div className="text-[11px] text-ink-600 truncate">
                  "I think the answer is three."
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSimulate('I the answer is three.')}
                className="btn-tactile-paper p-2.5 rounded-xl text-left font-semibold text-indigo-900 border-indigo-300 hover:bg-indigo-50"
              >
                <div className="font-bold text-indigo-800">3. Missing Word ("think")</div>
                <div className="text-[11px] text-ink-600 truncate">
                  "I the answer is three."
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
