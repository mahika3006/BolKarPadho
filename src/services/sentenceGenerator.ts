import { Lesson, TrickyWordCoaching } from '../types';
import { tokenizeSentence, cleanWord } from '../utils/alignment';

// Common phonetic challenges for Indian students with custom coaching tips
interface PhonicRule {
  pattern: RegExp;
  focusSound: string;
  contrastingPattern: string;
  contrastingPhonetic: string;
  explanationEn: string;
  explanationHi: string;
}

const PHONIC_RULES: PhonicRule[] = [
  {
    pattern: /\b(th\w*|\w*th)\b/i,
    focusSound: 'Dental fricative (th: /θ/ or /ð/)',
    contrastingPattern: 't / d sound',
    contrastingPhonetic: '/t/ or /d/',
    explanationEn: 'Rest the tip of your tongue lightly between your upper and lower teeth. Let air glide through without pressing hard.',
    explanationHi: 'जीभ की नोक हल्के से दाँतों के बीच रखें और हवा को बिना दबाव धीरे से बाहर निकलने दें।'
  },
  {
    pattern: /\b(mea\w*|trea\w*|plea\w*|vi\w*sion|de\w*cision)\b/i,
    focusSound: 'Voiced postalveolar fricative (/ʒ/)',
    contrastingPattern: 'j / sh sound',
    contrastingPhonetic: '/dʒ/ or /ʃ/',
    explanationEn: "Position your tongue like 'sh', but vibrate your vocal cords gently like a soft buzz in 'treasure'.",
    explanationHi: "'श' की स्थिति में जीभ रखकर गले में हल्का सा कंपन (buzz) लाएं, जैसे 'खज़ाने' (treasure) में।"
  },
  {
    pattern: /\b(world|word|girl|pearl|bird|earth|work)\b/i,
    focusSound: 'R-colored central vowel (/ɜːr/)',
    contrastingPattern: 'flat vowel /a/ or /o/',
    contrastingPhonetic: '/ɑː/ or /ɔː/',
    explanationEn: "Curl your tongue slightly backwards into the center of your mouth while rounding your lips softly.",
    explanationHi: "जीभ को हल्का सा पीछे मोड़कर मुख के बीच रखें और होंठों को थोड़ा सा गोल करें।"
  },
  {
    pattern: /\b(v\w*)\b/i,
    focusSound: 'Labiodental fricative (/v/)',
    contrastingPattern: 'w / bh sound',
    contrastingPhonetic: '/w/ or /bʱ/',
    explanationEn: 'Touch your upper teeth gently to your lower lip and vibrate your vocal cords.',
    explanationHi: 'ऊपरी दाँतों को निचले होंठ से हल्के से छुएं और कंपन के साथ आवाज़ निकालें।'
  },
  {
    pattern: /\b(w\w*)\b/i,
    focusSound: 'Bilabial glide (/w/)',
    contrastingPattern: 'v sound',
    contrastingPhonetic: '/v/',
    explanationEn: 'Round your lips tightly into a small circle like blowing through a straw, without teeth touching.',
    explanationHi: 'होंठों को बिना दाँत छुए गोल वृत्त में लाएं, जैसे पाइप से फूंक रहे हों।'
  },
  {
    pattern: /\b(sh\w*|\w*tion|\w*sion)\b/i,
    focusSound: 'Voiceless postalveolar fricative (/ʃ/)',
    contrastingPattern: 's sound',
    contrastingPhonetic: '/s/',
    explanationEn: 'Push your lips slightly forward in a gentle trumpet shape and let air hiss softly over the tongue.',
    explanationHi: 'होंठों को हल्का सा आगे की ओर निकालें और जीभ के ऊपर से कोमल हवा छोड़ें।'
  }
];

// Rich library of classroom & knowledge subjects for dynamic generation
const SENTENCE_TEMPLATES = [
  // Science & Experiments
  {
    category: 'Science & Lab',
    sentence: 'The scientist observed the chemical reaction through a microscope.',
    trickyWord: 'microscope',
    phonetic: '/ˈmaɪ.krə.skoʊp/',
    contrasting: 'macroscope'
  },
  {
    category: 'Science & Lab',
    sentence: 'Photosynthesis helps green plants produce their own food using sunlight.',
    trickyWord: 'photosynthesis',
    phonetic: '/ˌfoʊ.t̬oʊˈsɪn.θə.sɪs/',
    contrasting: 'photosynthesize'
  },
  {
    category: 'Science & Lab',
    sentence: 'Water evaporates into water vapor when heated to boiling point.',
    trickyWord: 'evaporates',
    phonetic: '/ɪˈvæp.ə.reɪts/',
    contrasting: 'vaporates'
  },
  {
    category: 'Science & Lab',
    sentence: 'The atmosphere protects our earth from harmful ultraviolet radiation.',
    trickyWord: 'atmosphere',
    phonetic: '/ˈæt.məs.fɪr/',
    contrasting: 'atomosphere'
  },
  {
    category: 'Science & Lab',
    sentence: 'Gravity pulls objects toward the center of the earth.',
    trickyWord: 'gravity',
    phonetic: '/ˈɡræv.ə.t̬i/',
    contrasting: 'gravy'
  },

  // Mathematics & Logic
  {
    category: 'Mathematics',
    sentence: 'The perimeter of this rectangle is thirty-four centimeters.',
    trickyWord: 'thirty-four',
    phonetic: '/ˌθɜːr.t̬iˈfɔːr/',
    contrasting: 'dirty-four'
  },
  {
    category: 'Mathematics',
    sentence: 'Can you calculate the probability of rolling a three on the dice?',
    trickyWord: 'probability',
    phonetic: '/ˌprɑː.bəˈbɪl.ə.t̬i/',
    contrasting: 'probably'
  },
  {
    category: 'Mathematics',
    sentence: 'Dividing twelve by three gives four as the quotient.',
    trickyWord: 'quotient',
    phonetic: '/ˈkwoʊ.ʃənt/',
    contrasting: 'quotation'
  },

  // Geography & Environment
  {
    category: 'Geography & Nature',
    sentence: 'The Pacific Ocean is the deepest and largest ocean on earth.',
    trickyWord: 'Pacific',
    phonetic: '/pəˈsɪf.ɪk/',
    contrasting: 'specific'
  },
  {
    category: 'Geography & Nature',
    sentence: 'Himalayan mountain ranges contain several of the highest peaks.',
    trickyWord: 'Himalayan',
    phonetic: '/ˌhɪm.əˈleɪ.ən/',
    contrasting: 'Himalayas'
  },
  {
    category: 'Geography & Nature',
    sentence: 'Rainforests provide essential oxygen and shelter for countless wildlife species.',
    trickyWord: 'essential',
    phonetic: '/ɪˈsen.ʃəl/',
    contrasting: 'essence'
  },

  // Classroom Dialogue & Etiquette
  {
    category: 'Classroom Speech',
    sentence: 'Excuse me teacher, could you please repeat the last question?',
    trickyWord: 'question',
    phonetic: '/ˈkwes.tʃən/',
    contrasting: 'kwestan'
  },
  {
    category: 'Classroom Speech',
    sentence: 'We must submit our science projects before Thursday morning.',
    trickyWord: 'Thursday',
    phonetic: '/ˈθɜːrz.deɪ/',
    contrasting: 'Tursday'
  },
  {
    category: 'Classroom Speech',
    sentence: 'Thank you for explaining this difficult chapter so clearly.',
    trickyWord: 'explaining',
    phonetic: '/ɪkˈspleɪ.nɪŋ/',
    contrasting: 'splaining'
  },
  {
    category: 'Classroom Speech',
    sentence: 'Please maintain complete silence in the school library.',
    trickyWord: 'silence',
    phonetic: '/ˈsaɪ.ləns/',
    contrasting: 'silents'
  },

  // History & Inspiration
  {
    category: 'History & Culture',
    sentence: 'Ancient monuments teach us valuable lessons about our shared heritage.',
    trickyWord: 'heritage',
    phonetic: '/ˈher.ɪ.t̬ɪdʒ/',
    contrasting: 'hermitage'
  },
  {
    category: 'History & Culture',
    sentence: 'The constitution guarantees equality and freedom of expression for all citizens.',
    trickyWord: 'constitution',
    phonetic: '/ˌkɑːn.stəˈtuː.ʃən/',
    contrasting: 'institution'
  },

  // Space & Technology
  {
    category: 'Space & Tech',
    sentence: 'Artificial intelligence and voice technologies are transforming education in India.',
    trickyWord: 'transforming',
    phonetic: '/trænˈsfɔːr.mɪŋ/',
    contrasting: 'transframing'
  },
  {
    category: 'Space & Tech',
    sentence: 'The space telescope captured breathtaking photographs of distant galaxies.',
    trickyWord: 'telescope',
    phonetic: '/ˈtel.ə.skoʊp/',
    contrasting: 'telescoped'
  }
];

/**
 * Automatically analyze phonetic difficulty of any word
 */
export function scoreWordDifficulty(word: string): number {
  const clean = cleanWord(word);
  if (clean.length < 3) return 0;

  let score = clean.length;
  if (/th/i.test(clean)) score += 10;
  if (/ph|gh/i.test(clean)) score += 6;
  if (/tion|sion/i.test(clean)) score += 8;
  if (/meas|pleas|treas/i.test(clean)) score += 12;
  if (/wor|girl|bird/i.test(clean)) score += 9;
  if (/[bcdfghjklmnpqrstvwxyz]{3,}/i.test(clean)) score += 7; // consonant cluster
  if (/qu/i.test(clean)) score += 5;

  return score;
}

/**
 * Find the most phonetically interesting/challenging word in an arbitrary sentence
 */
export function findBestTrickyWord(sentence: string): string {
  const tokens = tokenizeSentence(sentence);
  let bestWord = tokens[0] || 'word';
  let highestScore = -1;

  for (const token of tokens) {
    const score = scoreWordDifficulty(token);
    if (score > highestScore) {
      highestScore = score;
      bestWord = cleanWord(token);
    }
  }

  return bestWord;
}

/**
 * Generate a dynamic coaching card for ANY arbitrary word in any custom sentence
 */
export function createDynamicClinic(word: string, fullSentence: string): TrickyWordCoaching {
  const clean = cleanWord(word);
  
  // Find matching phonic rule
  let rule = PHONIC_RULES.find(r => r.pattern.test(clean));
  if (!rule) {
    rule = {
      pattern: /.*/,
      focusSound: `Syllable stress and clear articulation of "${clean}"`,
      contrastingPattern: 'mumbled syllables',
      contrastingPhonetic: `/${clean}/`,
      explanationEn: `Articulate each syllable in "${clean}" deliberately. Keep your tongue relaxed and release each consonant crisply.`,
      explanationHi: `"${clean}" के प्रत्येक शब्दांश को स्पष्टता से बोलें। जीभ को सहज रखकर व्यंजनों को स्पष्ट प्रवाह दें।`
    };
  }

  // Create build up phrases
  const tokens = tokenizeSentence(fullSentence);
  const wordIdx = tokens.findIndex(t => cleanWord(t) === clean);
  let phrase2 = clean;
  if (wordIdx !== -1) {
    const start = Math.max(0, wordIdx - 1);
    const end = Math.min(tokens.length, wordIdx + 2);
    phrase2 = tokens.slice(start, end).join(' ');
  } else {
    phrase2 = `practice ${clean}`;
  }

  return {
    word: clean,
    displayWord: word,
    phonetic: `/${clean}/`,
    focusSound: rule.focusSound,
    contrastingWord: rule.contrastingPattern,
    contrastingPhonetic: rule.contrastingPhonetic,
    explanationEn: rule.explanationEn,
    explanationHi: rule.explanationHi,
    explanations: {
      en: rule.explanationEn,
      hi: rule.explanationHi,
      ta: `"${clean}" உச்சரிக்கும் போது நாக்கை மிதமாக வைத்து ஒவ்வொரு எழுத்தொலியையும் தெளிவாக உச்சரியுங்கள்.`,
      te: `"${clean}" పలుకుతున్నప్పుడు ప్రతి శబ్దాన్ని స్పష్టంగా మరియు లయబద్ధంగా పలకండి.`,
      kn: `"${clean}" ಉಚ್ಚರಿಸುವಾಗ ಪ್ರತಿ ಅಕ್ಷರವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಮತ್ತು ಆರಾಮವಾಗಿ ಉಚ್ಚರಿಸಿ.`,
      ml: `"${clean}" പറയുമ്പോൾ ഓരോ അക്ഷരവും സ്പഷ്ടമായി ഉച്ചരിക്കുക.`,
      mr: `"${clean}" उच्चारताना प्रत्येक अक्षर स्पष्टपणे आणि आत्मविश्वासाने उच्चारा.`,
      bn: `"${clean}" উচ্চারণের সময় প্রতিটি ধ্বনি স্পষ্ট এবং সুন্দর করে বলুন।`,
      gu: `"${clean}" બોલતી વખતે દરેક અક્ષર સ્પષ્ટપણે અને સહજતાથી બોલો.`,
      pa: `"${clean}" ਬੋਲਦੇ ਸਮੇਂ ਹਰ ਆਵਾਜ਼ ਸਾਫ਼ ਅਤੇ ਲੈਅਬੱਧ ਰੱਖੋ।`,
      or: `"${clean}" କହିବା ସମୟରେ ପ୍ରତିଟି ଧ୍ୱନିକୁ ସ୍ପଷ୍ଟ ଏବଂ ସହଜ ଭାବେ ଉଚ୍ଚାରଣ କରନ୍ତୁ।`
    },
    buildUpPhrases: [
      clean,
      phrase2,
      fullSentence
    ]
  };
}

/**
 * Create a full custom lesson from ANY user-typed or pasted sentence
 */
export function createCustomLesson(
  sentence: string,
  userSelectedTrickyWord?: string,
  languageCode: string = 'en-IN'
): Lesson {
  const trimmed = sentence.trim();
  const tricky = userSelectedTrickyWord 
    ? cleanWord(userSelectedTrickyWord) 
    : findBestTrickyWord(trimmed);

  const clinic = createDynamicClinic(tricky, trimmed);

  return {
    id: `custom-${Date.now()}`,
    languageCode,
    languageName: languageCode === 'en-IN' ? 'English (India)' : 'Regional Indian Language',
    nativeName: 'Custom Practice',
    sentence: trimmed,
    trickyWord: tricky,
    targetWords: tokenizeSentence(trimmed),
    context: 'Custom / Textbook Practice',
    isCustom: true,
    clinic
  };
}

/**
 * Pick or generate an infinite random sentence
 */
let lastIndex = -1;
export function getRandomGeneratedLesson(category?: string): Lesson {
  let candidates = SENTENCE_TEMPLATES;
  if (category) {
    candidates = SENTENCE_TEMPLATES.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    if (candidates.length === 0) candidates = SENTENCE_TEMPLATES;
  }

  let nextIndex: number;
  do {
    nextIndex = Math.floor(Math.random() * candidates.length);
  } while (nextIndex === lastIndex && candidates.length > 1);
  lastIndex = nextIndex;

  const item = candidates[nextIndex];
  return createCustomLesson(item.sentence, item.trickyWord, 'en-IN');
}

export const SENTENCE_CATEGORIES = [
  'All Topics',
  'Science & Lab',
  'Mathematics',
  'Geography & Nature',
  'Classroom Speech',
  'History & Culture',
  'Space & Tech'
];

