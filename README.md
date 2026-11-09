# 🎙️ BolkarPadho (बोल कर पढ़ो)
> **Voice-first pronunciation practice supporting ALL 11 Indian Languages available in Gnani.ai Voice APIs**

BolkarPadho is a student-friendly website designed like an illustrated school workbook. It helps Indian school students master tricky English and Indian regional language sounds in under 60 seconds without anxiety, sign-ups, or fake percentage scores.

---

## 🇮🇳 Complete Multi-Language Coverage (All 11 Gnani Languages)

BolkarPadho integrates **all 11 languages** available in Gnani.ai's Voice API platform:

| # | Language | Native Script | API Code | Practice Lesson Available | Mother-Tongue Coaching |
| :-: | :--- | :--- | :--- | :---: | :---: |
| 1 | **English (India)** | English | `en-IN` | ✅ 3 Lessons | ✅ Full Support |
| 2 | **Hindi** | हिन्दी | `hi-IN` | ✅ "आज का मौसम बहुत सुहाना है।" | ✅ Full Support |
| 3 | **Tamil** | தமிழ் | `ta-IN` | ✅ "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?" | ✅ Full Support |
| 4 | **Telugu** | తెలుగు | `te-IN` | ✅ "నమస్కారం, మీరు పాఠం చదివారా?" | ✅ Full Support |
| 5 | **Kannada** | ಕನ್ನಡ | `kn-IN` | ✅ "ನಮಸ್ಕಾರ, ಈ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರವೇನು?" | ✅ Full Support |
| 6 | **Malayalam** | മലയാളം | `ml-IN` | ✅ "നമുക്ക് ഈ പുസ്തകം ഒരുമിച്ച് വായിക്കാം।" | ✅ Full Support |
| 7 | **Marathi** | मराठी | `mr-IN` | ✅ "आज आपण गणिताचा सराव करणार आहोत।" | ✅ Full Support |
| 8 | **Bengali** | বাংলা | `bn-IN` | ✅ "আজকে আমরা নতুন অধ্যায় শুরু করব।" | ✅ Full Support |
| 9 | **Gujarati** | ગુજરાતી | `gu-IN` | ✅ "આજે આપણે વિજ્ઞાનનો નવો પાઠ શીખીશું।" | ✅ Full Support |
| 10 | **Punjabi** | ਪੰਜਾਬੀ | `pa-IN` | ✅ "ਅੱਜ ਅਸੀਂ ਸਾਰੇ ਮਿਲ ਕੇ ਪੜ੍ਹਾਂਗੇ।" | ✅ Full Support |
| 11 | **Odia** | ଓଡ଼ିଆ | `or-IN` | ✅ "ଆଜି ଆମେ ଏକ ନୂଆ ବିଷୟ ପଢ଼ିବା।" | ✅ Full Support |

Students can switch both **their coaching/instruction language** (so tongue tips and explanations appear in their mother tongue) and **their practice lessons** across all 11 languages!

---

## 🌟 Key Features

1. **Opens Directly into Lesson 1 (No Sign-in Required)**
   - First sentence: **“I think the answer is three.”**
   - Large, tappable words: tapping any word plays it individually.
   - Dual controls: **Hear sentence** and **Read aloud**.
   - Live recording timer and pulsating waveform with instant playback of the student's actual voice.

2. **Signature Feature: Word Clinic**
   - Word alignment algorithm: aligns what the student said with the target sentence.
   - Shows **“What I heard”** without judgmental percentages:
     > **“I heard ‘tree’. Let’s practise ‘three’.”**
   - **Hear the difference**: Two audio comparison buttons (*tree* vs *three*).
   - **Try this & Understand in your Mother Tongue**: Tongue & mouth posture guidance in English AND in any of the 11 Gnani languages.
   - **Build it up**: Scaffolding ladder (*three* ➔ *three books* ➔ *I think the answer is three.*).
   - **Compare my attempts**: Side-by-side playback of the student's first attempt vs latest attempt.
   - **Manual trigger**: Tapping the underlined tricky word opens Word Clinic immediately.

3. **Gnani.ai Timbre v3.0 Integration**
   - Server-side proxy (`POST /api/gnani/tts` and `POST /api/gnani/stt`) keeping your API key secure.
   - Full offline fallback to browser Web Speech API.

---

## 🚀 Local Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Run both server & client concurrently
npm run dev

# 3. Run verification tests
npm test
```

- **Frontend App**: `http://localhost:5173`
- **Backend Server**: `http://localhost:3001`
