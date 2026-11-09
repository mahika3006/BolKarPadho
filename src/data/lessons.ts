import { Lesson } from '../types';
import { tokenizeSentence } from '../utils/alignment';

export const LESSONS: Lesson[] = [
  // --- LESSON 1: THE SIGNATURE CLASSROOM LESSON ("three") ---
  {
    id: 'lesson-1-three',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    nativeName: 'English',
    sentence: 'I think the answer is three.',
    trickyWord: 'three',
    targetWords: tokenizeSentence('I think the answer is three.'),
    context: 'Classroom answer in Maths & Science',
    clinic: {
      word: 'three',
      displayWord: 'three',
      phonetic: '/θriː/',
      focusSound: 'Voiceless dental fricative (/θ/)',
      contrastingWord: 'tree',
      contrastingPhonetic: '/triː/',
      explanationEn: 'Rest the tip of your tongue lightly between your teeth. Let air flow out gently, then finish the word.',
      explanationHi: 'जीभ की नोक हल्के से दाँतों के बीच रखें। धीरे से हवा बाहर निकालें, फिर पूरा शब्द बोलें।',
      explanations: {
        en: 'Rest the tip of your tongue lightly between your teeth. Let air flow out gently, then finish the word.',
        hi: 'जीभ की नोक हल्के से दाँतों के बीच रखें। धीरे से हवा बाहर निकालें, फिर पूरा शब्द बोलें।',
        ta: 'நாக்கின் நுனியைப் பற்களுக்கு இடையில் மென்மையாக வைத்து, மெல்லிய காற்றை வெளியேற்றி வார்த்தையை முடியுங்கள்.',
        te: 'నాలుక కొనను దంతాల మధ్య తేలికగా ఉంచండి. గాలిని సున్నితంగా బయటకు రానిచ్చి, పదాన్ని పలకండి.',
        kn: 'ನಾಲಿಗೆಯ ತುದಿಯನ್ನು ಹಲ್ಲುಗಳ ಮಧ್ಯೆ ಹಗುರವಾಗಿ ಇರಿಸಿ, ನಿಧಾನವಾಗಿ ಗಾಳಿ ಹೊರಬಿಟ್ಟು ಪದವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
        ml: 'നാവിന്റെ അറ്റം പല്ലുകൾക്കിടയിൽ സൗമ്യമായി വയ്ക്കുക. വായു പതുക്കെ പുറത്തേക്ക് വിട്ട് വാക്ക് പൂർത്തിയാക്കുക.',
        mr: 'जीभेचे टोक हलकेच दातांच्या मध्ये ठेवा. सावकाश हवा बाहेर सोडून शब्द पूर्ण करा.',
        bn: 'জিভের ডগা হালকাভাবে দাঁতের মাঝে রাখুন। ধীরে ধীরে বাতাস বের করে শব্দটি উচ্চারণ করুন।',
        gu: 'જીભની અણી હળવેથી દાંત વચ્ચે રાખો. ધીમેથી હવા બહાર કાઢીને શબ્દ પૂર્ણ કરો.',
        pa: 'ਜੀਭ ਦੀ ਨੋਕ ਹਲਕੇ ਜਿਹੇ ਦੰਦਾਂ ਦੇ ਵਿਚਕਾਰ ਰੱਖੋ। ਹੌਲੀ-ਹੌਲੀ ਹਵਾ ਬਾਹਰ ਕੱਢ ਕੇ ਸ਼ਬਦ ਪੂਰਾ ਕਰੋ।',
        or: 'ଜିଭର ଅଗକୁ ଦାନ୍ତ ମଝିରେ ହାଲୁକା ଭାବେ ରଖନ୍ତୁ। ଧୀରେ ବାୟୁ ବାହାର କରି ଶବ୍ଦ ପୂରା କରନ୍ତୁ।'
      },
      buildUpPhrases: [
        'three',
        'three books',
        'I think the answer is three.'
      ]
    }
  },

  // --- LESSON 2: CLASSROOM ENGLISH ("world") ---
  {
    id: 'lesson-2-world',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    nativeName: 'English',
    sentence: 'Can you please show me the world map?',
    trickyWord: 'world',
    targetWords: tokenizeSentence('Can you please show me the world map?'),
    context: 'Geography & Social Studies question',
    clinic: {
      word: 'world',
      displayWord: 'world',
      phonetic: '/wɜːrld/',
      focusSound: 'Vowel with r-coloring + ld cluster',
      contrastingWord: 'word',
      contrastingPhonetic: '/wɜːrd/',
      explanationEn: "Round your lips for 'w', curl your tongue slightly back for 'r', then glide the tip to touch the roof of your mouth for 'l' before the quick 'd'.",
      explanationHi: "'W' के लिए होंठ गोल करें, 'r' के लिए जीभ हल्की पीछे मोड़ें, फिर तालू पर 'l' छूकर 'd' पर खत्म करें। इसे 'वर्ड' न कहें।",
      explanations: {
        en: "Round your lips for 'w', curl your tongue slightly back for 'r', then glide the tip to touch the roof of your mouth for 'l' before the quick 'd'.",
        hi: "'W' के लिए होंठ गोल करें, 'r' के लिए जीभ हल्की पीछे मोड़ें, फिर तालू पर 'l' छूकर 'd' पर खत्म करें।",
        ta: "'W' க்காக உதடுகளை வட்டமாக்கி, 'r' க்காக நாக்கை லேசாகப் பின்வளைத்து, 'l' க்காக அண்ணத்தைத் தொட்டு 'd' யுடன் முடியுங்கள்.",
        te: "'W' కోసం పెదవులను గుండ్రంగా ఉంచి, 'r' కోసం నాలుకను కొద్దిగా వెనక్కి మడచి, 'l' మరియు 'd' ధ్వనులను స్పష్టంగా పలకండి.",
        kn: "'W' ಗಾಗಿ ತುಟಿಗಳನ್ನು ದುಂಡಾಗಿಸಿ, 'r' ಗಾಗಿ ನಾಲಿಗೆಯನ್ನು ಸ್ವಲ್ಪ ಹಿಂದೆ ಮಡಚಿ, 'l' ಮತ್ತು 'd' ಧ್ವನಿಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಉಚ್ಚರಿಸಿ.",
        ml: "'W' നായി ചുണ്ടുകൾ വട്ടത്തിലാക്കി, 'r' നായി നാവ് അല്പം പിന്നോട്ട് വളച്ച്, 'l' ഉം 'd' ഉം കൃത്യമായി ഉച്ചരിക്കുക.",
        mr: "'W' साठी ओठ गोलाकार करा, 'r' साठी जीभ किंचित मागे वळवा, मग टाळूला स्पर्श करून 'l' व 'd' उच्चारा.",
        bn: "'W'-এর জন্য ঠোঁট গোল করুন, 'r'-এর জন্য জিভ সামান্য পেছনে বাঁকান, তারপর তালু স্পর্শ করে 'l' ও 'd' উচ্চারণ করুন।",
        gu: "'W' માટે હોઠ ગોળ કરો, 'r' માટે જીભ સહેજ પાછળ વાળો અને 'l' પછી 'd' સ્પષ્ટ બોલો.",
        pa: "'W' ਲਈ ਬੁੱਲ੍ਹ ਗੋਲ ਕਰੋ, 'r' ਲਈ ਜੀਭ ਥੋੜ੍ਹੀ ਪਿੱਛੇ ਮੋੜੋ ਅਤੇ 'l' ਨਾਲ 'd' ਸਾਫ਼ ਬੋਲੋ।",
        or: "'W' ପାଇଁ ଓଠ ଗୋଲ କରନ୍ତୁ, 'r' ପାଇଁ ଜିଭ ପଛକୁ ମୋଡ଼ନ୍ତୁ ଏବଂ 'l' ଓ 'd' ସ୍ପଷ୍ଟ କୁହନ୍ତୁ।"
      },
      buildUpPhrases: [
        'world',
        'the world map',
        'Can you please show me the world map?'
      ]
    }
  },

  // --- LESSON 3: CLASSROOM ENGLISH ("measure") ---
  {
    id: 'lesson-3-measure',
    languageCode: 'en-IN',
    languageName: 'English (India)',
    nativeName: 'English',
    sentence: 'We will measure the temperature tomorrow.',
    trickyWord: 'measure',
    targetWords: tokenizeSentence('We will measure the temperature tomorrow.'),
    context: 'Science experiment & lab activity',
    clinic: {
      word: 'measure',
      displayWord: 'measure',
      phonetic: '/ˈmɛʒ.ər/',
      focusSound: 'Voiced postalveolar fricative (/ʒ/)',
      contrastingWord: 'major',
      contrastingPhonetic: '/ˈmeɪ.dʒər/',
      explanationEn: "Position your tongue as if making the 'sh' sound, but make your vocal cords vibrate with a soft buzz. It feels like the middle sound in 'treasure'.",
      explanationHi: "'श' की स्थिति में जीभ रखें लेकिन गले में हल्का कंपन (buzz) करें। यह 'मेज़र' है, 'मेजर' (major) नहीं।",
      explanations: {
        en: "Position your tongue as if making the 'sh' sound, but make your vocal cords vibrate with a soft buzz. It feels like the middle sound in 'treasure'.",
        hi: "'श' की स्थिति में जीभ रखें लेकिन गले में हल्का कंपन (buzz) करें। यह 'मेज़र' है, 'मेजर' नहीं।",
        ta: "'ஷ்' ஒலி போல் நாக்கை வைத்து, தொண்டையில் மெல்லிய அதிர்வுடன் (buzz) ஒலிக்கச் செய்யுங்கள்.",
        te: "'ష్' శబ్దం లాగా నాలుకను ఉంచి, గొంతులో సున్నితమైన కంపాన్ని (buzz) కలిగించండి.",
        kn: "'ಶ್' ಧ್ವನಿಯಂತೆ ನಾಲಿಗೆ ಇರಿಸಿ, ಗಂಟಲಿನಲ್ಲಿ ಮೃದುವಾದ ಕಂಪನವನ್ನು (buzz) ಉಂಟುಮಾಡಿ.",
        ml: "'ഷ്' ശബ്ദം പോലെ നാവ് വച്ച്, തൊണ്ടയിൽ മൃദുവായ കമ്പനം (buzz) നൽകി ഉച്ചരിക്കുക.",
        mr: "'श' सारखी जीभ ठेवून घशात हलके कंपन (buzz) निर्माण करा. हे 'मेझर' आहे.",
        bn: "'শ'-এর মতো জিভ রেখে গলায় হালকা কম্পন (buzz) তৈরি করুন। এটি 'মেজার' নয়, 'মেযার'।",
        gu: "'શ' ની સ્થિતિમાં જીભ રાખી ગળામાં હળવું કંપન (buzz) ઉત્પન્ન કરો.",
        pa: "'ਸ਼' ਵਾਂਗ ਜੀਭ ਰੱਖ ਕੇ ਗਲੇ ਵਿੱਚ ਹਲਕੀ ਕੰਬਣੀ (buzz) ਪੈਦਾ ਕਰੋ।",
        or: "'ଶ' ପରି ଜିଭ ରଖି କଣ୍ଠରେ ହାଲୁକା କମ୍ପନ (buzz) ସୃଷ୍ଟି କରନ୍ତୁ।"
      },
      buildUpPhrases: [
        'measure',
        'measure the temperature',
        'We will measure the temperature tomorrow.'
      ]
    }
  },

  // --- LESSON 4: HINDI (हिन्दी) ---
  {
    id: 'lesson-hi-1',
    languageCode: 'hi-IN',
    languageName: 'Hindi',
    nativeName: 'हिन्दी',
    sentence: 'आज का मौसम बहुत सुहाना है।',
    trickyWord: 'मौसम',
    targetWords: tokenizeSentence('आज का मौसम बहुत सुहाना है।'),
    context: 'दैनिक बातचीत और पर्यावरण वर्णन',
    clinic: {
      word: 'मौसम',
      displayWord: 'मौसम',
      phonetic: '/mɔː.səm/',
      focusSound: 'औ की मात्रा (Diphthong /ɔː/)',
      contrastingWord: 'मोसम',
      contrastingPhonetic: '/moː.səm/',
      explanationEn: "Pronounce the 'au' vowel broadly from the back of the mouth, not as a flat 'o'.",
      explanationHi: "'मौ' में 'औ' का उच्चारण खुले मुख से चौड़ा करें, इसे साधारण 'ओ' (मोसम) न कहें।",
      explanations: {
        en: "Pronounce the 'au' vowel broadly from the back of the mouth, not as a flat 'o'.",
        hi: "'मौ' में 'औ' का उच्चारण खुले मुख से चौड़ा करें, इसे साधारण 'ओ' (मोसम) न कहें।",
        ta: "'மௌ' என்பதில் வாயை அகலமாகத் திறந்து 'ஔ' ஒலியை உச்சரியுங்கள்.",
        te: "'మౌ' లో 'ఔ' శబ్దాన్ని నోరు తెరిచి స్పష్టంగా పలకండి.",
        kn: "'ಮೌ' ದಲ್ಲಿ 'ಔ' ಧ್ವನಿಯನ್ನು ಬಾಯಿ ಅಗಲಿಸಿ ಸ್ಪಷ್ಟವಾಗಿ ಉಚ್ಚರಿಸಿ.",
        ml: "'മൗ' ൽ 'ഔ' ശബ്ദം വായ തുറന്ന് സ്പഷ്ടമായി ഉച്ചരിക്കുക.",
        mr: "'मौ' मध्ये 'औ' चा उच्चार तोंड उघडून रुंद करा, साधा 'मो' करू नका.",
        bn: "'মৌ'-তে 'ঔ' উচ্চারণ মুখ চওড়া করে করুন, সাধারণ 'ও' বলবেন না।",
        gu: "'મૌ' માં 'ઔ' નો ઉચ્ચાર મુખ ખુલ્લું રાખી પહોળો કરો.",
        pa: "'ਮੌ' ਵਿੱਚ 'ਔ' ਦੀ ਆਵਾਜ਼ ਮੂੰਹ ਖੋਲ੍ਹ ਕੇ ਕੱਢੋ।",
        or: "'ମୌ' ରେ 'ଔ' ଧ୍ୱନି ମୁହଁ ଖୋଲି ସ୍ପଷ୍ଟ ଭାବେ କୁହନ୍ତୁ।"
      },
      buildUpPhrases: [
        'मौसम',
        'सुहाना मौसम',
        'आज का मौसम बहुत सुहाना है।'
      ]
    }
  },

  // --- LESSON 5: TAMIL (தமிழ்) ---
  {
    id: 'lesson-ta-1',
    languageCode: 'ta-IN',
    languageName: 'Tamil',
    nativeName: 'தமிழ்',
    sentence: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?',
    trickyWord: 'இருக்கிறீர்கள்',
    targetWords: tokenizeSentence('வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?'),
    context: 'மரியாதையான உரையாடல் (Polite greeting in Tamil)',
    clinic: {
      word: 'இருக்கிறீர்கள்',
      displayWord: 'இருக்கிறீர்கள்',
      phonetic: '/irukkiṟīrkaḷ/',
      focusSound: 'Retroflex ற / ழ் glide',
      contrastingWord: 'இருக்கிறீர்கள்',
      contrastingPhonetic: '/irukkiṟīrkaḷ/',
      explanationEn: 'Pronounce each syllable rhythmically with soft retroflex glide on the ending.',
      explanationHi: 'प्रत्येक शब्दांश को स्पष्ट लय के साथ बोलें और अंत में जिह्वा को हल्का मोड़ें।',
      explanations: {
        en: 'Pronounce each syllable rhythmically with soft retroflex glide on the ending.',
        hi: 'प्रत्येक शब्दांश को स्पष्ट लय के साथ बोलें और अंत में जिह्वा को हल्का मोड़ें।',
        ta: 'ஒவ்வொரு அசைவையும் தாளத்துடன் உச்சரித்து, இறுதியில் நாக்கை வளைத்துப் பழகுங்கள்.',
        te: 'ప్రతి అక్షరాన్ని లయబద్ధంగా పలుకుతూ, చివర నాలుకను సున్నితంగా మడచండి.',
        kn: 'ಪ್ರತಿಯೊಂದು ಅಕ್ಷರವನ್ನು ಲಯಬದ್ಧವಾಗಿ ಉಚ್ಚರಿಸಿ, ಕೊನೆಯಲ್ಲಿ ನಾಲಿಗೆಯನ್ನು ಲಘುವಾಗಿ ಮಡಚಿ.',
        ml: 'ഓരോ അക്ഷരവും താളത്തിൽ ഉച്ചരിച്ച്, അവസാനം നാവ് അല്പം വളയ്ക്കുക.',
        mr: 'प्रत्येक अक्षर लयीत उच्चारून शेवटी जीभ हलकी मागे वळवा.',
        bn: 'প্রতিটি অক্ষর ছন্দময়ভাবে উচ্চারণ করুন এবং শেষে জিভ সামান্য বাঁকান।',
        gu: 'દરેક અક્ષર લયબદ્ધ રીતે બોલો અને અંતે જીભ સહેજ વાળો.',
        pa: 'ਹਰ ਅੱਖਰ ਲੈਅ ਵਿੱਚ ਬੋਲੋ ਅਤੇ ਅੰਤ ਵਿੱਚ ਜੀਭ ਹਲਕੀ ਮੋੜੋ।',
        or: 'ପ୍ରତିଟି ଅକ୍ଷର ତାଳରେ ଉଚ୍ଚାରଣ କରନ୍ତୁ ଏବଂ ଶେଷରେ ଜିଭକୁ ହାଲୁକା ମୋଡ଼ନ୍ତୁ।'
      },
      buildUpPhrases: [
        'இருக்கிறீர்கள்',
        'எப்படி இருக்கிறீர்கள்?',
        'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?'
      ]
    }
  },

  // --- LESSON 6: TELUGU (తెలుగు) ---
  {
    id: 'lesson-te-1',
    languageCode: 'te-IN',
    languageName: 'Telugu',
    nativeName: 'తెలుగు',
    sentence: 'నమస్కారం, మీరు పాఠం చదివారా?',
    trickyWord: 'చదివారా',
    targetWords: tokenizeSentence('నమస్కారం, మీరు పాఠం చదివారా?'),
    context: 'తరగతి గది ప్రశ్న (Classroom inquiry in Telugu)',
    clinic: {
      word: 'చదివారా',
      displayWord: 'చదివారా',
      phonetic: '/tʃad̪iʋaːraː/',
      focusSound: 'Dental ద (da) with long vowel',
      contrastingWord: 'చదివారా',
      contrastingPhonetic: '/tʃad̪iʋaːraː/',
      explanationEn: "Tap your tongue gently against the upper teeth for 'da' with an open final syllable.",
      explanationHi: "'द' के लिए जीभ ऊपरी दाँतों पर हल्के से स्पर्श करें और अंत में खुला स्वर दें।",
      explanations: {
        en: "Tap your tongue gently against the upper teeth for 'da' with an open final syllable.",
        hi: "'द' के लिए जीभ ऊपरी दाँतों पर हल्के से स्पर्श करें और अंत में खुला स्वर दें।",
        ta: "'த' ஒலிக்கு நாக்கை மேல் பற்களில் மென்மையாகத் தொட்டு முடியுங்கள்.",
        te: "'ద' కోసం నాలుకను పై పళ్ళకు తేలికగా తాకించి, చివర స్పష్టమైన దీర్ఘాన్ని ఇవ్వండి.",
        kn: "'ದ' ಗಾಗಿ ನಾಲಿಗೆಯನ್ನು ಮೇಲಿನ ಹಲ್ಲುಗಳಿಗೆ ಹಗುರವಾಗಿ ತಾಗಿಸಿ, ಕೊನೆಗೆ ಸ್ಪಷ್ಟ ದೀರ್ಘ ಸ್ವರ ನೀಡಿ.",
        ml: "'ദ' യ്ക്കായി നാവ് മുകളിലെ പല്ലുകളിൽ തൊട്ട് അവസാനം ദീർഘസ്വരത്തോടെ പറയുക.",
        mr: "'द' साठी जीभ वरच्या दातांना हलकी लावून शेवटी मोकळा स्वर द्या.",
        bn: "'দ'-এর জন্য জিভ ওপরের দাঁতে হালকা ছুঁয়ে শেষে দীর্ঘ স্বর দিন।",
        gu: "'દ' માટે જીભ ઉપરના દાંતને હળવેથી અડાડી છેલ્લે દીર્ઘ સ્વર આપો.",
        pa: "'ਦ' ਲਈ ਜੀਭ ਉੱਪਰਲੇ ਦੰਦਾਂ ਨਾਲ ਲਗਾ ਕੇ ਅਖ਼ੀਰ ਵਿੱਚ ਲੰਮੀ ਆਵਾਜ਼ ਦਿਓ।",
        or: "'ଦ' ପାଇଁ ଜିଭ ଉପର ଦାନ୍ତରେ ହାଲୁକା ଲଗାଇ ଶେଷରେ ଦୀର୍ଘ ସ୍ୱର ଦିଅନ୍ତୁ।"
      },
      buildUpPhrases: [
        'చదివారా',
        'పాఠం చదివారా?',
        'నమస్కారం, మీరు పాఠం చదివారా?'
      ]
    }
  },

  // --- LESSON 7: KANNADA (ಕನ್ನಡ) ---
  {
    id: 'lesson-kn-1',
    languageCode: 'kn-IN',
    languageName: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    sentence: 'ನಮಸ್ಕಾರ, ಈ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರವೇನು?',
    trickyWord: 'ಉತ್ತರವೇನು',
    targetWords: tokenizeSentence('ನಮಸ್ಕಾರ, ಈ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರವೇನು?'),
    context: 'ತರಗತಿಯಲ್ಲಿ ಪ್ರಶ್ನೆ (Classroom question in Kannada)',
    clinic: {
      word: 'ಉತ್ತರವೇನು',
      displayWord: 'ಉತ್ತರವೇನು',
      phonetic: '/utt̪araʋeːnu/',
      focusSound: 'Geminate "tt" with rounded vowel',
      contrastingWord: 'ಉತ್ತರವೇನು',
      contrastingPhonetic: '/utt̪araʋeːnu/',
      explanationEn: 'Hold the double "tt" sound briefly against the back of the front teeth before releasing.',
      explanationHi: 'दोहरे "त्त" पर हल्का सा ठहराव दें, फिर स्पष्टता से पूरा शब्द बोलें।',
      explanations: {
        en: 'Hold the double "tt" sound briefly against the back of the front teeth before releasing.',
        hi: 'दोहरे "त्त" पर हल्का सा ठहराव दें, फिर स्पष्टता से पूरा शब्द बोलें।',
        ta: "இரட்டை 'த்த' ஒலியில் சற்று நிறுத்தி, பின் விடுவித்துப் பேசுங்கள்.",
        te: "ద్విత్వ 'త్త' పై చిన్న విరామం ఇచ్చి, ఆపై స్పష్టంగా పలకండి.",
        kn: "ಒತ್ತಕ್ಷರ 'ತ್ತ' ದ ಮೇಲೆ ಕ್ಷಣಕಾಲ ನಿಲ್ಲಿಸಿ, ನಂತರ ಸ್ಪಷ್ಟವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
        ml: "ഇരട്ട 'ത്ത' യിൽ അല്പം നിർത്തി സ്പഷ്ടമായി ഉച്ചരിക്കുക.",
        mr: "जोडाक्षर 'त्त' वर किंचित थांबा द्या आणि मग स्पष्ट उच्चारा.",
        bn: "যুক্তাক্ষর 'ত্ত'-তে ক্ষণিক থেমে তারপর স্পষ্ট উচ্চারণ করুন।",
        gu: "જોડાક્ષર 'ત્ત' પર ક્ષણિક અટકીને પછી સ્પષ્ટ બોલો.",
        pa: "ਦੋਹਰੇ 'ੱਤ' ਉੱਤੇ ਹਲਕਾ ਜਿਹਾ ਠਹਿਰਾਓ ਦੇ ਕੇ ਸਾਫ਼ ਬੋਲੋ।",
        or: "ଯୁକ୍ତାକ୍ଷର 'ତ୍ତ' ଉପରେ କିଛି ସମୟ ଅଟକି ସ୍ପଷ୍ଟ କୁହନ୍ତୁ।"
      },
      buildUpPhrases: [
        'ಉತ್ತರವೇನು',
        'ಪ್ರಶ್ನೆಗೆ ಉತ್ತರವೇನು?',
        'ನಮಸ್ಕಾರ, ಈ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರವೇನು?'
      ]
    }
  },

  // --- LESSON 8: BENGALI (বাংলা) ---
  {
    id: 'lesson-bn-1',
    languageCode: 'bn-IN',
    languageName: 'Bengali',
    nativeName: 'বাংলা',
    sentence: 'আজকে আমরা নতুন অধ্যায় শুরু করব।',
    trickyWord: 'অধ্যায়',
    targetWords: tokenizeSentence('আজকে আমরা নতুন অধ্যায় শুরু করব।'),
    context: 'শ্রেণীকক্ষের সূচনা (Classroom intro in Bengali)',
    clinic: {
      word: 'অধ্যায়',
      displayWord: 'অধ্যায়',
      phonetic: '/ɔd̪d̪ʱae̯/',
      focusSound: 'Aspirated dental "dhy" (/d̪ʱ/)',
      contrastingWord: 'অধ্যায়',
      contrastingPhonetic: '/ɔd̪d̪ʱae̯/',
      explanationEn: 'Release a puff of warm air with the dental "dh" while transitioning into the diphthong.',
      explanationHi: '"ध्" बोलते समय हल्की गर्म हवा छोड़ें और स्वर को मधुरता से जोड़ें।',
      explanations: {
        en: 'Release a puff of warm air with the dental "dh" while transitioning into the diphthong.',
        hi: '"ध्" बोलते समय हल्की गर्म हवा छोड़ें और स्वर को मधुरता से जोड़ें।',
        ta: "'த்' ஒலிக்கும் போது மிதமான காற்றுடன் அடுத்த உயிரொலிக்குச் செல்லுங்கள்.",
        te: "'ధ్' పలికేటప్పుడు స్వల్ప వెచ్చని గాలిని విడుదల చేసి అచ్చులోకి మారండి.",
        kn: "'ಧ್' ಉಚ್ಚರಿಸುವಾಗ ಸ್ವಲ್ಪ ಬೆಚ್ಚನೆಯ ಗಾಳಿ ಬಿಟ್ಟು ಸ್ವರಕ್ಕೆ ಸೇರಿಸಿ.",
        ml: "'ദ്ധ' പറയുമ്പോൾ വായു മൃദുവായി പുറത്തേക്ക് വിട്ട് ഉച്ചരിക്കുക.",
        mr: "'ध्' बोलताना हलकी ऊबदार हवा सोडून पुढील स्वराशी जोडा.",
        bn: "'ধ্য'-এর উচ্চারণে মহাপ্রাণ 'ধ'-এর সাথে উষ্ণ বাতাস ছেড়ে স্বরে প্রবেশ করুন।",
        gu: "'ધ્યા' ના ઉચ્ચારણમાં ગરમ હવા છોડીને સ્વર જોડો.",
        pa: "'ਧ' ਬੋਲਦੇ ਸਮੇਂ ਹਲਕੀ ਹਵਾ ਛੱਡ ਕੇ ਅਗਲੇ ਸਵਰ ਨਾਲ ਜੋੜੋ।",
        or: "'ଧ୍ୟ' କହିବା ସମୟରେ ହାଲୁକା ବାୟୁ ଛାଡ଼ି ପରବର୍ତ୍ତୀ ସ୍ୱର ସହ ଯୋଡ଼ନ୍ତୁ।"
      },
      buildUpPhrases: [
        'অধ্যায়',
        'নতুন অধ্যায়',
        'আজকে আমরা নতুন অধ্যায় শুরু করব।'
      ]
    }
  },

  // --- LESSON 9: MARATHI (मराठी) ---
  {
    id: 'lesson-mr-1',
    languageCode: 'mr-IN',
    languageName: 'Marathi',
    nativeName: 'मराठी',
    sentence: 'आज आपण गणिताचा सराव करणार आहोत।',
    trickyWord: 'गणिताचा',
    targetWords: tokenizeSentence('आज आपण गणिताचा सराव करणार आहोत।'),
    context: 'अभ्यास आणि सराव (Classroom practice in Marathi)',
    clinic: {
      word: 'गणिताचा',
      displayWord: 'गणिताचा',
      phonetic: '/ɡəɳit̪aːt͡saː/',
      focusSound: 'Retroflex "ण" (na) + affricate "चा"',
      contrastingWord: 'गणिताचा',
      contrastingPhonetic: '/ɡəɳit̪aːt͡saː/',
      explanationEn: 'Curl the tip of your tongue backwards to touch the hard palate for "na".',
      explanationHi: '"ण" के लिए जीभ की नोक को पीछे मोड़कर तालू से स्पर्श करें।',
      explanations: {
        en: 'Curl the tip of your tongue backwards to touch the hard palate for "na".',
        hi: '"ण" के लिए जीभ की नोक को पीछे मोड़कर तालू से स्पर्श करें।',
        ta: "'ண' ஒலிக்காக நாக்கின் நுனியைப் பின்னோக்கி வளைத்து மேல் அண்ணத்தைத் தொடுங்கள்.",
        te: "'ణ' కోసం నాలుక కొనను వెనక్కి మడచి గట్టి అంగిలిని తాకించండి.",
        kn: "'ಣ' ಗಾಗಿ ನಾಲಿಗೆಯ ತುದಿಯನ್ನು ಹಿಂದೆ ಮಡಚಿ ಗಟ್ಟಿಯಾದ ಅಂಗಳವನ್ನು ತಾಗಿಸಿ.",
        ml: "'ണ' യ്ക്കായി നാവിന്റെ അറ്റം പിന്നോട്ട് വളച്ച് അണ്ണാക്കിൽ തൊടുക.",
        mr: "'ण' साठी जीभेचे टोक मागे वळवून टाळूला घट्ट लावा, साधा 'न' करू नका.",
        bn: "'ণ'-এর জন্য জিভের ডগা পেছনে বাঁকিয়ে শক্ত তালু স্পর্শ করুন।",
        gu: "'ણ' માટે જીભની અણી પાછળ વાળીને તાળવે અડાડો.",
        pa: "'ਣ' ਲਈ ਜੀਭ ਦੀ ਨੋਕ ਪਿੱਛੇ ਮੋੜ ਕੇ ਤਾਲੂ ਨਾਲ ਲਗਾਓ।",
        or: "'ଣ' ପାଇଁ ଜିଭର ଅଗକୁ ପଛକୁ ମୋଡ଼ି ତାଳୁରେ ଲଗାନ୍ତୁ।"
      },
      buildUpPhrases: [
        'गणिताचा',
        'गणिताचा सराव',
        'आज आपण गणिताचा सराव करणार आहोत।'
      ]
    }
  },

  // --- LESSON 10: GUJARATI (ગુજરાતી) ---
  {
    id: 'lesson-gu-1',
    languageCode: 'gu-IN',
    languageName: 'Gujarati',
    nativeName: 'ગુજરાતી',
    sentence: 'આજે આપણે વિજ્ઞાનનો નવો પાઠ શીખીશું।',
    trickyWord: 'શીખીશું',
    targetWords: tokenizeSentence('આજે આપણે વિજ્ઞાનનો નવો પાઠ શીખીશું।'),
    context: 'વર્ગખંડ શિક્ષણ (Classroom study in Gujarati)',
    clinic: {
      word: 'શીખીશું',
      displayWord: 'શીખીશું',
      phonetic: '/ʃiːkʰiːʃũ/',
      focusSound: 'Aspirated "ખ" + nasal ending',
      contrastingWord: 'શીખીશું',
      contrastingPhonetic: '/ʃiːkʰiːʃũ/',
      explanationEn: 'Emphasize the breathy "kh" and end with a soft nasalized "um".',
      explanationHi: '"ख" पर पर्याप्त प्राणवायु दें और अंत में कोमल अनुनासिक स्वर निकालें।',
      explanations: {
        en: 'Emphasize the breathy "kh" and end with a soft nasalized "um".',
        hi: '"ख" पर पर्याप्त प्राणवायु दें और अंत में कोमल अनुनासिक स्वर निकालें।',
        ta: "'க' ஒலியில் மூச்சை வெளியேற்றி, இறுதியில் மென்மையான மூக்கொலியுடன் முடியுங்கள்.",
        te: "'ఖ' శబ్దంలో గాలిని ఊది, చివర కోమలమైన అనునాసిక ధ్వనిని పలకండి.",
        kn: "'ಖ' ಧ್ವನಿಯಲ್ಲಿ ಗಾಳಿಯನ್ನು ಹೊರಹಾಕಿ, ಕೊನೆಯಲ್ಲಿ ಮೃದುವಾದ ಅನುನಾಸಿಕ ಸ್ವರ ನೀಡಿ.",
        ml: "'ഖ' യിൽ വായു പുറത്തുവിട്ട് അവസാനം അനുനാസികമായി പൂർത്തിയാക്കുക.",
        mr: "'ख' वर पुरेशी हवा सोडून शेवटी कोमल अनुनासिक उच्चार करा.",
        bn: "'খ'-তে বাতাস দিয়ে শেষে মৃদু অনুনাসিক স্বর দিন।",
        gu: "'ખ' માં ઊંડો શ્વાસ ઉમેરીને અંતે કોમળ અનુનાસિક ઉચ્ચાર સાથે પૂરું કરો.",
        pa: "'ਖ' ਵਿੱਚ ਹਵਾ ਛੱਡ ਕੇ ਅੰਤ ਵਿੱਚ ਹਲਕੀ ਨਾਸਕੀ ਆਵਾਜ਼ ਕੱਢੋ।",
        or: "'ଖ' ରେ ବାୟୁ ଛାଡ଼ି ଶେଷରେ କୋମଳ ଅନୁନାସିକ ସ୍ୱର ଦିଅନ୍ତୁ।"
      },
      buildUpPhrases: [
        'શીખીશું',
        'પાઠ શીખીશું',
        'આજે આપણે વિજ્ઞાનનો નવો પાઠ શીખીશું।'
      ]
    }
  },

  // --- LESSON 11: PUNJABI (ਪੰਜਾਬੀ) ---
  {
    id: 'lesson-pa-1',
    languageCode: 'pa-IN',
    languageName: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    sentence: 'ਅੱਜ ਅਸੀਂ ਸਾਰੇ ਮਿਲ ਕੇ ਪੜ੍ਹਾਂਗੇ।',
    trickyWord: 'ਪੜ੍ਹਾਂਗੇ',
    targetWords: tokenizeSentence('ਅੱਜ ਅਸੀਂ ਸਾਰੇ ਮਿਲ ਕੇ ਪੜ੍ਹਾਂਗੇ।'),
    context: 'ਜਮਾਤ ਵਿੱਚ ਸਿੱਖਣਾ (Classroom reading in Punjabi)',
    clinic: {
      word: 'ਪੜ੍ਹਾਂਗੇ',
      displayWord: 'ਪੜ੍ਹਾਂਗੇ',
      phonetic: '/pəɽʱaːŋɡeː/',
      focusSound: 'Flapped retroflex "ੜ੍ਹ" with tonal inflection',
      contrastingWord: 'ਪੜ੍ਹਾਂਗੇ',
      contrastingPhonetic: '/pəɽʱaːŋɡeː/',
      explanationEn: 'Flap your tongue against the roof of your mouth with a warm voiced release for "rh".',
      explanationHi: '"ड़्ह" के लिए जीभ को तालू से हल्का सा झटका देकर नीचे लाएं।',
      explanations: {
        en: 'Flap your tongue against the roof of your mouth with a warm voiced release for "rh".',
        hi: '"ड़्ह" के लिए जीभ को तालू से हल्का सा झटका देकर नीचे लाएं।',
        ta: "'ட' ஒலியை அண்ணத்தில் லேசாகத் தட்டி விடுவித்து உச்சரியுங்கள்.",
        te: "'ఢ' వంటి ధ్వని కోసం నాలుకను అంగిలికి తగిలించి వేగంగా కిందకు దించండి.",
        kn: "'ಢ' ದಂತಹ ಧ್ವನಿಗಾಗಿ ನಾಲಿಗೆಯನ್ನು ಅಂಗಳಕ್ಕೆ ತಾಗಿಸಿ ವೇಗವಾಗಿ ಕೆಳಗೆ ತನ್ನಿ.",
        ml: "നാവ് അണ്ണാക്കിൽ തട്ടി പെട്ടെന്ന് താഴേക്ക് കൊണ്ടുവന്ന് ഉച്ചരിക്കുക.",
        mr: "'ढ' सारख्या ध्वनीसाठी जीभ टाळूवर घासून वेगाने खाली आणा.",
        bn: "'ঢ়'-এর জন্য জিভ তালুতে আলতো বাড়ি মেরে নিচে নামিয়ে আনুন।",
        gu: "'ઢ' જેવા ઉચ્ચાર માટે જીભને તાળવેથી ઝડપથી નીચે લાવો.",
        pa: "'ੜ੍ਹ' ਲਈ ਜੀਭ ਨੂੰ ਤਾਲੂ ਨਾਲ ਛୁਹਾ ਕੇ ਝਟਕੇ ਨਾਲ ਹੇਠਾਂ ਲਿਆਓ ਅਤੇ ਸੁਰ ਸਾਫ਼ ਰੱਖੋ।",
        or: "'ଢ଼' ପାଇଁ ଜିଭକୁ ତାଳୁରେ ବାଜି ଝଟକାରେ ତଳକୁ ଆଣନ୍ତୁ।"
      },
      buildUpPhrases: [
        'ਪੜ੍ਹਾਂਗੇ',
        'ਮਿਲ ਕੇ ਪੜ੍ਹਾਂਗੇ',
        'ਅੱਜ ਅਸੀਂ ਸਾਰੇ ਮਿਲ ਕੇ ਪੜ੍ਹਾਂਗੇ।'
      ]
    }
  },

  // --- LESSON 12: MALAYALAM (മലയാളം) ---
  {
    id: 'lesson-ml-1',
    languageCode: 'ml-IN',
    languageName: 'Malayalam',
    nativeName: 'മലയാളം',
    sentence: 'നമുക്ക് ഈ പുസ്തകം ഒരുമിച്ച് വായിക്കാം।',
    trickyWord: 'വായിക്കാം',
    targetWords: tokenizeSentence('നമുക്ക് ഈ പുസ്തകം ഒരുമിച്ച് വായിക്കാം।'),
    context: 'ക്ലാസ്സ് വായന (Classroom reading in Malayalam)',
    clinic: {
      word: 'വായിക്കാം',
      displayWord: 'വായിക്കാം',
      phonetic: '/ʋaːjik̚kaːm/',
      focusSound: 'Geminate "kk" with bilabial "v"',
      contrastingWord: 'വായിക്കാം',
      contrastingPhonetic: '/ʋaːjik̚kaːm/',
      explanationEn: 'Start with soft upper teeth touching lower lip for "va", then articulate the doubled "kk".',
      explanationHi: '"वा" के लिए ऊपरी दाँत निचले होंठ को छुएं, फिर "क्क" पर रुक कर बोलें।',
      explanations: {
        en: 'Start with soft upper teeth touching lower lip for "va", then articulate the doubled "kk".',
        hi: '"वा" के लिए ऊपरी दाँत निचले होंठ को छुएं, फिर "क्क" पर रुक कर बोलें।',
        ta: "'வா' க்காக மேல் பற்கள் கீழ் உதட்டைத் தொட, பின்னர் இரட்டை 'க்க' வை உச்சரியுங்கள்.",
        te: "'వా' కోసం పై పళ్ళు క్రింది పెదవిని తాకించి, తర్వాత ద్విత్వ 'క్క' ను పలకండి.",
        kn: "'ವಾ' ಗಾಗಿ ಮೇಲಿನ ಹಲ್ಲುಗಳು ಕೆಳಗಿನ ತುಟಿಯನ್ನು ತಾಗಿಸಿ, ನಂತರ ದ್ವಿತ್ವ 'ಕ್ಕ' ವನ್ನು ಉಚ್ಚರಿಸಿ.",
        ml: "'വാ' യ്ക്കായി മേൽപല്ലുകൾ കീഴ്ച്ചുണ്ടിൽ തൊട്ട്, തുടർന്ന് ഇരട്ട 'ക്ക' സ്പഷ്ടമായി പറയുക.",
        mr: "'वा' साठी वरचे दात खालच्या ओठाला लावून मग जोडलेले 'क्क' उच्चारा.",
        bn: "'ভা'-এর জন্য ওপরের দাঁত নিচের ঠোঁট ছুঁয়ে তারপর দ্বিত্ব 'ক্ক' উচ্চারণ করুন।",
        gu: "'વા' માટે ઉપરના દાંત નીચેના હોઠને અડાડી પછી જોડાક્ષર 'ક્ક' બોલો.",
        pa: "'ਵਾ' ਲਈ ਉੱਪਰਲੇ ਦੰਦ ਹੇਠਲੇ ਬੁੱਲ੍ਹ ਨਾਲ ਲਗਾ ਕੇ ਫਿਰ ਦੋਹਰਾ 'ੱਕ' ਬੋਲੋ।",
        or: "'ୱା' ପାଇଁ ଉପର ଦାନ୍ତ ତଳ ଓଠକୁ ଛୁଇଁ ପରେ ଦ୍ୱିତ୍ୱ 'କ୍କ' କୁହନ୍ତୁ।"
      },
      buildUpPhrases: [
        'വായിക്കാം',
        'ഒരുമിച്ച് വായിക്കാം',
        'നമുക്ക് ഈ പുസ്തകം ഒരുമിച്ച് വായിക്കാം।'
      ]
    }
  },

  // --- LESSON 13: ODIA (ଓଡ଼ିଆ) ---
  {
    id: 'lesson-or-1',
    languageCode: 'or-IN',
    languageName: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    sentence: 'ଆଜି ଆମେ ଏକ ନୂଆ ବିଷୟ ପଢ଼ିବା।',
    trickyWord: 'ପଢ଼ିବା',
    targetWords: tokenizeSentence('ଆଜି ଆମେ ଏକ ନୂଆ ବିଷୟ ପଢ଼ିବା।'),
    context: 'ଶ୍ରେଣୀଗୃହ ଅଭ୍ୟାସ (Classroom learning in Odia)',
    clinic: {
      word: 'ପଢ଼ିବା',
      displayWord: 'ପଢ଼ିବା',
      phonetic: '/pɔɽʱiba/',
      focusSound: 'Retroflex "ଢ଼" (rh) with rounded Odia vowel',
      contrastingWord: 'ପଢ଼ିବା',
      contrastingPhonetic: '/pɔɽʱiba/',
      explanationEn: 'Curl the tongue tip to the ridge for "rh" before dropping into "ba".',
      explanationHi: '"ଢ଼" के लिए जीभ की नोक तालू पर मोड़ें और स्वाभाविक प्रवाह से "बा" पर जाएं।',
      explanations: {
        en: 'Curl the tongue tip to the ridge for "rh" before dropping into "ba".',
        hi: '"ଢ଼" के लिए जीभ की नोक तालू पर मोड़ें और स्वाभाविक प्रवाह से "बा" पर जाएं।',
        ta: "'ட' ஒலிக்கு நாக்கை மேல் அண்ணத்திற்கு வளைத்து 'ப' விற்கு நகருங்கள்.",
        te: "'ఢ' కోసం నాలుక కొనను అంగిలికి మడచి 'బ' లోకి మారండి.",
        kn: "'ಢ' ಗಾಗಿ ನಾಲಿಗೆಯ ತುದಿಯನ್ನು ಅಂಗಳಕ್ಕೆ ಮಡಚಿ 'ಬ' ಗೆ ಸಾಗಿ.",
        ml: "'ഢ' യ്ക്കായി നാവ് അണ്ണാക്കിലേക്ക് വളച്ച് 'ബ' യിലേക്ക് കടക്കുക.",
        mr: "'ढ' साठी जीभेचे टोक टाळूवर वळवून मग 'बा' वर या.",
        bn: "'ঢ়'-এর জন্য জিভের ডগা তালুতে বাঁকিয়ে 'বা'-তে নামুন।",
        gu: "'ઢ' માટે જીભની અણી તાળવે વાળીને 'બા' તરફ આવો.",
        pa: "'ੜ੍ਹ' ਲਈ ਜੀਭ ਦੀ ਨੋਕ ਤਾਲੂ ਨਾਲ ਮੋੜ ਕੇ 'ਬਾ' ਤੇ ਆਓ।",
        or: "'ଢ଼' ପାଇଁ ଜିଭର ଅଗକୁ ତାଳୁରେ ମୋଡ଼ି ସ୍ୱାଭାବିକ ଭାବେ 'ବା' କୁ ଯାଆନ୍ତୁ।"
      },
      buildUpPhrases: [
        'ପଢ଼ିବା',
        'ନୂଆ ବିଷୟ ପଢ଼ିବା',
        'ଆଜି ଆମେ ଏକ ନୂଆ ବିଷୟ ପଢ଼ିବା।'
      ]
    }
  }
];
