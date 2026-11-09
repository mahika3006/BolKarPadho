import { Lesson } from '../types';
import { tokenizeSentence } from '../utils/alignment';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1-three',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    sentence: 'I think the answer is three.',
    trickyWord: 'three',
    targetWords: tokenizeSentence('I think the answer is three.'),
    context: 'Classroom answer in Maths & Science',
    contextHi: 'गणित और विज्ञान कक्षा में उत्तर देते समय',
    clinic: {
      word: 'three',
      displayWord: 'three',
      phonetic: '/θriː/',
      focusSound: 'Voiceless dental fricative (th)',
      contrastingWord: 'tree',
      contrastingPhonetic: '/triː/',
      explanationEn: 'Rest the tip of your tongue lightly between your teeth. Let air flow out gently, then finish the word.',
      explanationHi: 'जीभ की नोक हल्के से दाँतों के बीच रखें। धीरे से हवा बाहर निकालें, फिर पूरा शब्द बोलें।',
      buildUpPhrases: [
        'three',
        'three books',
        'I think the answer is three.'
      ]
    }
  },
  {
    id: 'lesson-2-world',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    sentence: 'Can you please show me the world map?',
    trickyWord: 'world',
    targetWords: tokenizeSentence('Can you please show me the world map?'),
    context: 'Geography & Social Studies question',
    contextHi: 'भूगोल की कक्षा में नक्शा देखने के लिए पूछना',
    clinic: {
      word: 'world',
      displayWord: 'world',
      phonetic: '/wɜːrld/',
      focusSound: 'Vowel with r-coloring + ld cluster',
      contrastingWord: 'word',
      contrastingPhonetic: '/wɜːrd/',
      explanationEn: "Round your lips for 'w', curl your tongue slightly back for 'r', then glide the tip to touch the roof of your mouth for 'l' before the quick 'd'.",
      explanationHi: "'W' के लिए होंठ गोल करें, 'r' के लिए जीभ हल्की पीछे मोड़ें, फिर तालू पर 'l' छूकर 'd' पर खत्म करें। इसे 'वर्ड' न कहें।",
      buildUpPhrases: [
        'world',
        'the world map',
        'Can you please show me the world map?'
      ]
    }
  },
  {
    id: 'lesson-3-measure',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    sentence: 'We will measure the temperature tomorrow.',
    trickyWord: 'measure',
    targetWords: tokenizeSentence('We will measure the temperature tomorrow.'),
    context: 'Science experiment & lab activity',
    contextHi: 'विज्ञान प्रयोगशाला में तापमान नापने का वाक्य',
    clinic: {
      word: 'measure',
      displayWord: 'measure',
      phonetic: '/ˈmɛʒ.ər/',
      focusSound: 'Voiced postalveolar fricative (/ʒ/)',
      contrastingWord: 'major',
      contrastingPhonetic: '/ˈmeɪ.dʒər/',
      explanationEn: "Position your tongue as if making the 'sh' sound, but make your vocal cords vibrate with a soft buzz. It feels like the middle sound in 'treasure'.",
      explanationHi: "'श' की स्थिति में जीभ रखें लेकिन गले में हल्का कंपन (buzz) करें। यह 'मेज़र' है, 'मेजर' (major) नहीं।",
      buildUpPhrases: [
        'measure',
        'measure the temperature',
        'We will measure the temperature tomorrow.'
      ]
    }
  },
  // Indian Regional Languages powered by Gnani Timbre
  {
    id: 'lesson-hi-1',
    languageCode: 'hi-IN',
    languageName: 'हिन्दी (Hindi)',
    sentence: 'आज का मौसम बहुत सुहाना है।',
    trickyWord: 'मौसम',
    targetWords: tokenizeSentence('आज का मौसम बहुत सुहाना है।'),
    context: 'दैनिक बातचीत और पर्यावरण वर्णन',
    contextHi: 'दैनिक बातचीत और पर्यावरण वर्णन',
    clinic: {
      word: 'मौसम',
      displayWord: 'मौसम',
      phonetic: '/mɔː.səm/',
      focusSound: 'औ की मात्रा (Diphthong /ɔː/)',
      contrastingWord: 'मोसम',
      contrastingPhonetic: '/moː.səm/',
      explanationEn: "Pronounce the 'au' vowel broadly from the back of the mouth, not as a flat 'o'.",
      explanationHi: "'मौ' में 'औ' का उच्चारण खुले मुख से चौड़ा करें, इसे साधारण 'ओ' (मोसम) न कहें।",
      buildUpPhrases: [
        'मौसम',
        'सुहाना मौसम',
        'आज का मौसम बहुत सुहाना है।'
      ]
    }
  },
  {
    id: 'lesson-ta-1',
    languageCode: 'ta-IN',
    languageName: 'தமிழ் (Tamil)',
    sentence: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?',
    trickyWord: 'இருக்கிறீர்கள்',
    targetWords: tokenizeSentence('வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?'),
    context: 'மரியாதையான உரையாடல் (Polite greeting in Tamil)',
    contextHi: 'तमिल में आदरपूर्वक हालचाल पूछना',
    clinic: {
      word: 'இருக்கிறீர்கள்',
      displayWord: 'இருக்கிறீர்கள்',
      phonetic: '/irukkiṟīrkaḷ/',
      focusSound: 'Retroflex ழ் / ற glide',
      contrastingWord: 'இருக்கிறீர்கள்',
      contrastingPhonetic: '/irukkiṟīrkaḷ/',
      explanationEn: "Pronounce each syllable rhythmically with soft retroflex glide on the ending.",
      explanationHi: "प्रत्येक शब्दांश को स्पष्ट लय के साथ बोलें और अंत में जिह्वा को हल्का मोड़ें।",
      buildUpPhrases: [
        'இருக்கிறீர்கள்',
        'எப்படி இருக்கிறீர்கள்?',
        'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?'
      ]
    }
  }
];
