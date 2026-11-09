import { AlignmentResult, AlignedWord } from '../types';

/**
 * Clean and normalize a token for comparison
 */
export function cleanWord(raw: string): string {
  let cleaned = raw
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, '')
    .trim();

  // Common number representations in English
  if (cleaned === '3') cleaned = 'three';
  if (cleaned === '1') cleaned = 'one';
  if (cleaned === '2') cleaned = 'two';
  if (cleaned === '4') cleaned = 'four';
  if (cleaned === '5') cleaned = 'five';

  return cleaned;
}

/**
 * Split sentence into words while preserving punctuation for display
 */
export function tokenizeSentence(sentence: string): string[] {
  return sentence.trim().split(/\s+/).filter(Boolean);
}

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Phonetic/orthographic similarity ratio between two words (0.0 to 1.0)
 */
export function wordSimilarity(target: string, spoken: string): number {
  const t = cleanWord(target);
  const s = cleanWord(spoken);
  if (t === s) return 1.0;
  if (!t || !s) return 0.0;

  // Specific phonetic minimal pair bonuses for common Indian ESL variations
  const pairKey = `${t}-${s}`;
  const reversePairKey = `${s}-${t}`;
  const phoneticDistances: Record<string, number> = {
    'three-tree': 0.85,
    'three-free': 0.85,
    'world-word': 0.82,
    'world-ward': 0.80,
    'measure-major': 0.75,
    'very-wery': 0.85,
    'ship-sheep': 0.88,
    'fit-feet': 0.88,
    'pull-pool': 0.88,
    'think-tink': 0.85,
    'that-dat': 0.85,
    'zero-jero': 0.80,
    'pleasure-plejer': 0.78,
  };

  if (phoneticDistances[pairKey]) return phoneticDistances[pairKey];
  if (phoneticDistances[reversePairKey]) return phoneticDistances[reversePairKey];

  const maxLen = Math.max(t.length, s.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(t, s);
  return Math.max(0, 1 - dist / maxLen);
}

/**
 * Word-level sequence alignment using dynamic programming
 */
export function alignTranscripts(targetSentence: string, spokenTranscript: string): AlignmentResult {
  const targetTokens = tokenizeSentence(targetSentence);
  const spokenTokens = tokenizeSentence(spokenTranscript);

  const cleanTargets = targetTokens.map(cleanWord);
  const cleanSpokens = spokenTokens.map(cleanWord);

  const m = cleanTargets.length;
  const n = cleanSpokens.length;

  if (n === 0) {
    return {
      isExactMatch: false,
      score: 0,
      accuracyTier: 'practice',
      alignedWords: targetTokens.map((t, idx) => ({
        targetWord: t,
        status: 'missed',
        similarity: 0,
        index: idx
      })),
      mismatchedWords: [],
      missingWords: targetTokens,
      extraWords: [],
      suggestedPracticeWord: targetTokens[0] || null
    };
  }

  // DP table for edit distance
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (cleanTargets[i - 1] === cleanSpokens[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No cost for exact match
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // target word missing (deletion)
          dp[i][j - 1] + 1      // extra spoken word (insertion)
        );
      }
    }
  }

  // Backtrack to find aligned sequence
  let i = m;
  let j = n;
  const reversedAligned: AlignedWord[] = [];
  const mismatchedWords: { target: string; spoken: string; similarity: number }[] = [];
  const missingWords: string[] = [];
  const extraWords: string[] = [];
  let totalWordScore = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanTargets[i - 1] === cleanSpokens[j - 1]) {
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        spokenWord: spokenTokens[j - 1],
        status: 'matched',
        similarity: 1.0,
        index: i - 1
      });
      totalWordScore += 1.0;
      i--;
      j--;
    } else if (
      i > 0 &&
      j > 0 &&
      dp[i][j] === dp[i - 1][j - 1] + 1
    ) {
      // Substitution
      const sim = wordSimilarity(targetTokens[i - 1], spokenTokens[j - 1]);
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        spokenWord: spokenTokens[j - 1],
        status: 'substituted',
        similarity: sim,
        index: i - 1
      });
      mismatchedWords.push({
        target: targetTokens[i - 1],
        spoken: spokenTokens[j - 1],
        similarity: sim
      });
      totalWordScore += sim;
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      // Missing target word
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        status: 'missed',
        similarity: 0,
        index: i - 1
      });
      missingWords.push(targetTokens[i - 1]);
      i--;
    } else {
      // Extra spoken word
      reversedAligned.push({
        spokenWord: spokenTokens[j - 1],
        status: 'extra',
        similarity: 0,
        index: -1
      });
      extraWords.push(spokenTokens[j - 1]);
      j--;
    }
  }

  const alignedWords = reversedAligned.reverse();
  mismatchedWords.reverse();
  missingWords.reverse();
  extraWords.reverse();

  const isExactMatch = mismatchedWords.length === 0 && missingWords.length === 0 && extraWords.length === 0;

  // Calculate Pronunciation Nearness Score (0 - 100%)
  // Base score = average similarity of target words
  let baseScore = (totalWordScore / Math.max(1, targetTokens.length)) * 100;
  // Modest penalty for extra extraneous words (max 10% penalty)
  const extraPenalty = Math.min(10, extraWords.length * 3);
  let finalScore = Math.max(0, Math.min(100, Math.round(baseScore - extraPenalty)));

  if (isExactMatch) finalScore = 100;

  // Accuracy tier
  let accuracyTier: 'spot-on' | 'very-close' | 'getting-there' | 'practice';
  if (finalScore >= 95) {
    accuracyTier = 'spot-on';
  } else if (finalScore >= 80) {
    accuracyTier = 'very-close';
  } else if (finalScore >= 60) {
    accuracyTier = 'getting-there';
  } else {
    accuracyTier = 'practice';
  }

  // Identify suggested practice word (lowest similarity target word)
  let suggestedPracticeWord: string | null = null;
  if (mismatchedWords.length > 0) {
    // Sort by lowest similarity
    const sorted = [...mismatchedWords].sort((a, b) => a.similarity - b.similarity);
    suggestedPracticeWord = cleanWord(sorted[0].target);
  } else if (missingWords.length > 0) {
    suggestedPracticeWord = cleanWord(missingWords[0]);
  }

  return {
    isExactMatch,
    score: finalScore,
    accuracyTier,
    alignedWords,
    mismatchedWords,
    missingWords,
    extraWords,
    suggestedPracticeWord
  };
}
