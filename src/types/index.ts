export type CoachingLanguage = 'en' | 'hi';

export interface TrickyWordCoaching {
  word: string;
  displayWord: string;
  phonetic: string;
  focusSound: string;
  contrastingWord: string;
  contrastingPhonetic: string;
  explanationEn: string;
  explanationHi: string;
  buildUpPhrases: string[];
}

export interface Lesson {
  id: string;
  languageCode: string; // e.g. 'en-IN', 'hi-IN', etc.
  languageName: string;
  sentence: string;
  trickyWord: string;
  targetWords: string[];
  context: string;
  contextHi: string;
  clinic: TrickyWordCoaching;
}

export type AlignmentStatus = 'matched' | 'substituted' | 'missed' | 'extra';

export interface AlignedWord {
  targetWord?: string;
  spokenWord?: string;
  status: AlignmentStatus;
  index: number;
}

export interface AlignmentResult {
  isExactMatch: boolean;
  alignedWords: AlignedWord[];
  mismatchedWords: { target: string; spoken: string }[];
  missingWords: string[];
  extraWords: string[];
  suggestedPracticeWord: string | null;
}

export interface AudioRecording {
  id: string;
  url: string;
  blob: Blob;
  durationMs: number;
  timestamp: number;
  transcript?: string;
}

export interface GnaniStatus {
  online: boolean;
  gnaniConfigured: boolean;
  provider: string;
  supportedLanguages: { code: string; name: string; native: string }[];
  defaultVoice: string;
}
