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
 * Word-level sequence alignment using dynamic programming (Needleman-Wunsch / Levenshtein alignment)
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
      alignedWords: targetTokens.map((t, idx) => ({
        targetWord: t,
        status: 'missed',
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
  const mismatchedWords: { target: string; spoken: string }[] = [];
  const missingWords: string[] = [];
  const extraWords: string[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanTargets[i - 1] === cleanSpokens[j - 1]) {
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        spokenWord: spokenTokens[j - 1],
        status: 'matched',
        index: i - 1
      });
      i--;
      j--;
    } else if (
      i > 0 &&
      j > 0 &&
      dp[i][j] === dp[i - 1][j - 1] + 1
    ) {
      // Substitution
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        spokenWord: spokenTokens[j - 1],
        status: 'substituted',
        index: i - 1
      });
      mismatchedWords.push({
        target: targetTokens[i - 1],
        spoken: spokenTokens[j - 1]
      });
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      // Missing target word
      reversedAligned.push({
        targetWord: targetTokens[i - 1],
        status: 'missed',
        index: i - 1
      });
      missingWords.push(targetTokens[i - 1]);
      i--;
    } else {
      // Extra spoken word
      reversedAligned.push({
        spokenWord: spokenTokens[j - 1],
        status: 'extra',
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

  // Identify suggested practice word
  let suggestedPracticeWord: string | null = null;
  if (mismatchedWords.length > 0) {
    suggestedPracticeWord = cleanWord(mismatchedWords[0].target);
  } else if (missingWords.length > 0) {
    suggestedPracticeWord = cleanWord(missingWords[0]);
  }

  return {
    isExactMatch,
    alignedWords,
    mismatchedWords,
    missingWords,
    extraWords,
    suggestedPracticeWord
  };
}
