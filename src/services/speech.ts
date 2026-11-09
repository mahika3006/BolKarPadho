import { GnaniStatus } from '../types';

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Check backend and Gnani configuration status
 */
export async function checkGnaniStatus(): Promise<GnaniStatus> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      online: true,
      gnaniConfigured: data.gnaniConfigured,
      provider: data.provider,
      supportedLanguages: data.supportedLanguages || [],
      defaultVoice: data.defaultVoice || 'Shivani'
    };
  } catch (err) {
    console.warn('Gnani backend not responding, operating in browser speech mode:', err);
    return {
      online: false,
      gnaniConfigured: false,
      provider: 'Browser Native Web Speech API',
      supportedLanguages: [
        { code: 'en-IN', name: 'English (India)', native: 'English' },
        { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी' }
      ],
      defaultVoice: 'System Default'
    };
  }
}

/**
 * Stop any ongoing reference speech playback
 */
export function stopAllSpeech(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

/**
 * Play text using Gnani Timbre TTS (with fallback to Web Speech Synthesis)
 */
export async function speakText(
  text: string,
  languageCode: string = 'en-IN',
  voice: string = 'Shivani',
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  stopAllSpeech();

  if (onStart) onStart();

  try {
    // Attempt Gnani TTS via backend proxy
    const response = await fetch('/api/gnani/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: languageCode,
        voice,
        speed: 0.95
      })
    });

    if (response.ok && response.headers.get('content-type')?.includes('audio')) {
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        fallbackBrowserTTS(text, languageCode, onEnd);
      };

      await audio.play();
      return;
    }
  } catch (err) {
    console.info('Gnani TTS proxy unavailable or network restricted, switching to browser speech synthesis:', err);
  }

  // Fallback to browser speech synthesis
  fallbackBrowserTTS(text, languageCode, onEnd);
}

/**
 * Browser Speech Synthesis fallback
 */
function fallbackBrowserTTS(text: string, languageCode: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode;
  utterance.rate = 0.9; // Slightly slower for clear pronunciation instruction

  // Pick suitable Indian voice if available in browser
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.replace('_', '-') === languageCode) ||
    voices.find(v => v.lang.startsWith(languageCode.split('-')[0])) ||
    voices.find(v => v.name.includes('India') || v.name.includes('Hindi'));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Transcribe recorded audio with Gnani STT (Prisma v3.0) via backend proxy
 */
export async function transcribeWithGnani(audioBlob: Blob, languageCode: string = 'en-IN'): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'recording.wav');
    formData.append('language_code', languageCode);

    const res = await fetch('/api/gnani/stt', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.transcript) {
        return data.transcript.trim();
      }
    }
  } catch (err) {
    console.warn('Gnani STT proxy unavailable:', err);
  }
  return null;
}

