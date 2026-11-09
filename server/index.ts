import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GNANI_API_KEY = process.env.GNANI_API_KEY || '';

// Configure multer for audio file uploads (keep in memory)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.use(cors());
app.use(express.json());

// In-memory cache for synthesized audio to prevent redundant API calls
const ttsCache = new Map<string, { buffer: Buffer; contentType: string }>();

// Supported Indian languages in Gnani Vachana platform
const SUPPORTED_LANGUAGES = [
  { code: 'en-IN', name: 'English (India)', native: 'English' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ' }
];

// Check status of backend & Gnani integration
app.get('/api/status', (req, res) => {
  const hasKey = Boolean(GNANI_API_KEY && GNANI_API_KEY.startsWith('vach_'));
  res.json({
    status: 'online',
    gnaniConfigured: hasKey,
    provider: hasKey ? 'Gnani.ai Vachana Voice AI (Timbre v3.0 & Prisma v3.0)' : 'Browser Native Speech API',
    supportedLanguages: SUPPORTED_LANGUAGES,
    defaultVoice: 'Shivani',
    keyMasked: hasKey ? `${GNANI_API_KEY.slice(0, 8)}...${GNANI_API_KEY.slice(-6)}` : 'none'
  });
});

// Text-to-Speech proxy to Gnani Timbre v3.0
app.post('/api/gnani/tts', async (req, res) => {
  const { text, language = 'en-IN', voice = 'Shivani', speed = 1.0 } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required' });
  }

  // Check cache first
  const cacheKey = `${text.trim().toLowerCase()}_${language}_${voice}`;
  if (ttsCache.has(cacheKey)) {
    const cached = ttsCache.get(cacheKey)!;
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('X-Audio-Source', 'gnani-cache');
    return res.send(cached.buffer);
  }

  if (!GNANI_API_KEY) {
    return res.status(503).json({
      error: 'GNANI_API_KEY not configured on server',
      fallback: true
    });
  }

  try {
    const response = await fetch('https://api.vachana.ai/api/v1/tts/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key-ID': GNANI_API_KEY
      },
      body: JSON.stringify({
        text,
        voice,
        model: 'timbre-v3.0',
        language,
        speed: speed || 1.0,
        audio_config: {
          container: 'wav',
          encoding: 'linear_pcm'
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Gnani TTS] HTTP ${response.status}: ${errText}`);
      return res.status(response.status).json({
        error: `Gnani TTS returned ${response.status}`,
        details: errText,
        fallback: true
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'audio/wav';

    // Store in cache
    ttsCache.set(cacheKey, { buffer, contentType });

    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Audio-Source', 'gnani-live');
    return res.send(buffer);
  } catch (error: any) {
    console.error('[Gnani TTS Error]:', error.message);
    return res.status(500).json({
      error: 'Failed to contact Gnani TTS',
      details: error.message,
      fallback: true
    });
  }
});

// Speech-to-Text proxy to Gnani Prisma v3.0
app.post('/api/gnani/stt', upload.single('audio_file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded' });
  }

  const language = (req.body.language_code as string) || 'en-IN';

  if (!GNANI_API_KEY) {
    return res.status(503).json({
      error: 'GNANI_API_KEY not configured',
      fallback: true
    });
  }

  try {
    // Construct FormData for Gnani API
    const formData = new FormData();
    const audioBlob = new Blob([req.file.buffer], { type: req.file.mimetype || 'audio/wav' });
    formData.append('audio_file', audioBlob, req.file.originalname || 'recording.wav');
    formData.append('model', 'prisma-v3.0');
    formData.append('language_code', language);

    const response = await fetch('https://api.vachana.ai/stt/v3', {
      method: 'POST',
      headers: {
        'X-API-Key-ID': GNANI_API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Gnani STT] HTTP ${response.status}: ${errText}`);
      return res.status(response.status).json({
        error: `Gnani STT returned ${response.status}`,
        details: errText,
        fallback: true
      });
    }

    const data: any = await response.json();
    return res.json({
      success: true,
      transcript: data.transcript || '',
      model: data.model || 'prisma-v3.0',
      source: 'gnani-prisma'
    });
  } catch (error: any) {
    console.error('[Gnani STT Error]:', error.message);
    return res.status(500).json({
      error: 'Failed to contact Gnani STT',
      details: error.message,
      fallback: true
    });
  }
});

app.listen(PORT, () => {
  console.log(`BolkarPadho backend server running on http://localhost:${PORT}`);
  console.log(`Gnani Key Status: ${GNANI_API_KEY ? 'Configured (' + GNANI_API_KEY.slice(0, 10) + '...)' : 'Not set (Browser API fallback enabled)'}`);
});
