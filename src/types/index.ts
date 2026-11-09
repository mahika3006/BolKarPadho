export type CoachingLanguage = 
  | 'en' 
  | 'hi' 
  | 'ta' 
  | 'te' 
  | 'kn' 
  | 'ml' 
  | 'mr' 
  | 'bn' 
  | 'gu' 
  | 'pa' 
  | 'or';

export type AccuracyTier = 'spot-on' | 'very-close' | 'getting-there' | 'practice';

export interface TrickyWordCoaching {
  word: string;
  displayWord: string;
  phonetic: string;
  focusSound: string;
  contrastingWord: string;
  contrastingPhonetic: string;
  explanationEn: string;
  explanationHi: string;
  explanations?: Partial<Record<CoachingLanguage, string>>;
  buildUpPhrases: string[];
}

export interface Lesson {
  id: string;
  languageCode: string; // e.g. 'en-IN', 'hi-IN', 'ta-IN', etc.
  languageName: string;
  nativeName: string;
  sentence: string;
  trickyWord: string;
  targetWords: string[];
  context: string;
  contextHi?: string;
  isCustom?: boolean;
  category?: string;
  clinic: TrickyWordCoaching;
}

export type AlignmentStatus = 'matched' | 'substituted' | 'missed' | 'extra';

export interface AlignedWord {
  targetWord?: string;
  spokenWord?: string;
  status: AlignmentStatus;
  similarity?: number;
  index: number;
}

export interface AlignmentResult {
  isExactMatch: boolean;
  score: number; // 0 - 100% nearness score
  accuracyTier: AccuracyTier;
  alignedWords: AlignedWord[];
  mismatchedWords: { target: string; spoken: string; similarity?: number }[];
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
