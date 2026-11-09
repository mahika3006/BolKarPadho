# 🎙️ BolkarPadho (बोल कर पढ़ो)
> **Voice-first pronunciation practice for Indian students powered by Gnani.ai Voice AI**

BolkarPadho is a student-friendly website designed like an illustrated school workbook. It helps Indian school students master tricky English and regional language sounds in under 60 seconds without anxiety, sign-ups, or fake percentage scores.

---

## 🌟 Key Features

1. **Instant First Lesson (No Login Required)**
   - Starts directly with: **“I think the answer is three.”**
   - Large, tappable words: tap any word to hear its reference pronunciation individually.
   - Dual coaching instructions in **English** and **हिन्दी (Hindi)**.
   - Prominent **Hear sentence** and **Read aloud** controls.

2. **Signature Feature: Word Clinic**
   - Transcribes student speech and aligns words using dynamic sequence alignment (handling skipped, repeated, or substituted words).
   - Unbiased diagnosis: When the student says *"tree"* instead of *"three"*, it kindly displays:
     > **“I heard ‘tree’. Let’s practise ‘three’.”**
   - **Hear the difference**: Two separate audio comparison buttons for *"tree"* and *"three"*.
   - **Try this**: Illustrated mouth posture & tongue placement tips in English and Hindi.
   - **Build it up**: Scaffolding ladder (*three* ➔ *three books* ➔ *I think the answer is three.*).
   - **Compare my attempts**: Side-by-side playback of the student's first attempt vs latest attempt.
   - **Manual Clinic trigger**: Tap the hand-drawn underlined tricky word anytime to open coaching, even on 100% recognition matches.

3. **Multi-Language Pronunciation (Gnani.ai Timbre Integration)**
   - Integrates Gnani.ai's **Timbre v3.0** voice synthesis (Shivani, Avinash, etc.) for high-fidelity Indian-accented English and regional languages (Hindi, Tamil, Telugu, Kannada, Bengali, etc.).
   - Full fallback resilience: works completely offline or with zero configuration using browser Web Speech API.

4. **Illustrated School Workbook Aesthetic**
   - Warm paper textured background (`#fbf7ee`).
   - Deep indigo classroom ink typography (`#1e1b4b`).
   - Tactile teal audio buttons (`#0d9488`).
   - Hand-drawn SVG wavy underline beneath focus words.
   - Mobile-first thumb reach layout and accessible keyboard navigation (`Tab`, `Space`, `Enter`).

---

## 🚀 Quick Start (Local Run Commands)

### Prerequisites
- Node.js (v18+) & npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env` file is pre-configured with the Gnani Vachana API key:
```env
PORT=3001
GNANI_API_KEY=vach_1ytE2CY5X2EgVWpTBhtCMOwZ2Nm6kIyPmBatp8xSheM0kO1mXQBZSqvFG6yfAY3E7mo50vJ5PmZbSKAht3sBki7QeuXN8yTm_0b1c0831bd449c60fc1f163789fe73f8
```

### 3. Start the Development Server
```bash
npm run dev
```
- **Backend API**: `http://localhost:3001` (Gnani proxy & health check)
- **Frontend App**: `http://localhost:5173` (Vite dev server)

Open `http://localhost:5173` in your browser.

---

## 🧪 Verification & Testing

Run the automated transcript alignment test suite:
```bash
npm test
```
Tests verified:
- Exact sentence match
- Tricky word substitution (`three` vs `tree`)
- Missing / skipped words
- Extra hesitation words (`um`, `please`)
- Spoken number normalization (`3` ➔ `three`)

---

## ⏱️ 60-Second Presentation Demo Script

| Second | Action | What to Say / Observe |
| :--- | :--- | :--- |
| **00:00 - 00:10** | Open `http://localhost:5173` | *"Notice that BolkarPadho opens directly into our classroom lesson with no login screen, framed as an illustrated workbook."* |
| **00:10 - 00:20** | Click **"Hear sentence"** or tap individual word **"three"** | *"The sentence is read with natural Indian inflection using Gnani Timbre AI. Tapping any word speaks that word individually."* |
| **00:20 - 00:35** | Click **"Read aloud"** (or use Demo Toolbar: *1. Substitution ("tree")*) | *"Student records with live timer and mic pulse. Recognizer transcribes 'I think the answer is tree.'"* |
| **00:35 - 00:45** | Highlight **Word Clinic** banner | *"Word Clinic displays: 'I heard tree. Let's practise three.' No fake percentage scores—just constructive, respectful guidance."* |
| **00:45 - 00:55** | Click **"tree"** vs **"three"** in *Hear the difference*, read tongue placement tip, click ladder | *"Student compares both sounds, reads tongue placement in English or Hindi, and practices the 3-step phrase ladder."* |
| **00:55 - 01:00** | Click **"Play first attempt"** vs **"Play latest attempt"** | *"Student plays their initial recording side-by-side with their improved second attempt, hearing their immediate progress within 60 seconds."* |
