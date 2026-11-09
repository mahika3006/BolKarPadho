import { alignTranscripts, cleanWord } from '../src/utils/alignment';

console.log('--- RUNNING ALIGNMENT & NEARNESS SCORING VERIFICATION SUITE ---\n');

const targetSentence = 'I think the answer is three.';

// Test 1: Exact match
console.log('TEST 1: Exact Match (Score should be 100%)');
const result1 = alignTranscripts(targetSentence, 'I think the answer is three.');
console.log('isExactMatch:', result1.isExactMatch);
console.log('Score:', result1.score);
console.log('Tier:', result1.accuracyTier);
if (result1.isExactMatch && result1.score === 100 && result1.accuracyTier === 'spot-on') {
  console.log('✅ TEST 1 PASSED: Exact match scored 100% (Spot-on).\n');
} else {
  console.error('❌ TEST 1 FAILED');
  process.exit(1);
}

// Test 2: "three/tree" Substitution
console.log('TEST 2: "three" / "tree" Substitution (Score should be ~90% high proximity)');
const result2 = alignTranscripts(targetSentence, 'I think the answer is tree.');
console.log('isExactMatch:', result2.isExactMatch);
console.log('Score:', result2.score);
console.log('Tier:', result2.accuracyTier);
console.log('Mismatches:', result2.mismatchedWords);
console.log('Suggested practice word:', result2.suggestedPracticeWord);
if (!result2.isExactMatch && result2.score >= 80 && result2.score <= 98 && result2.suggestedPracticeWord === 'three') {
  console.log(`✅ TEST 2 PASSED: Substitution scored ${result2.score}% (${result2.accuracyTier}) reflecting acoustic closeness.\n`);
} else {
  console.error('❌ TEST 2 FAILED');
  process.exit(1);
}

// Test 3: Missing word ("think" missing)
console.log('TEST 3: Missing Word ("think")');
const result3 = alignTranscripts(targetSentence, 'I the answer is three.');
console.log('isExactMatch:', result3.isExactMatch);
console.log('Score:', result3.score);
console.log('Missing words:', result3.missingWords);
if (!result3.isExactMatch && result3.missingWords.includes('think') && result3.score < 90) {
  console.log(`✅ TEST 3 PASSED: Missing word recognized and scored ${result3.score}%\n`);
} else {
  console.error('❌ TEST 3 FAILED');
  process.exit(1);
}

// Test 4: Extra Words ("um ... please")
console.log('TEST 4: Extra Words ("um ... please")');
const result4 = alignTranscripts(targetSentence, 'Um I think the answer is three please');
console.log('Extra words:', result4.extraWords);
console.log('Score:', result4.score);
if (result4.extraWords.length > 0 && result4.score >= 85) {
  console.log('✅ TEST 4 PASSED: Extra words handled with modest penalty.\n');
} else {
  console.error('❌ TEST 4 FAILED');
  process.exit(1);
}

// Test 5: Number Normalization ("3")
console.log('TEST 5: Number Normalization ("3")');
const result5 = alignTranscripts(targetSentence, 'i think the answer is 3');
console.log('isExactMatch for "3":', result5.isExactMatch);
console.log('Score:', result5.score);
if (result5.isExactMatch && result5.score === 100) {
  console.log('✅ TEST 5 PASSED: Number 3 normalized to three with 100% score.\n');
} else {
  console.error('❌ TEST 5 FAILED');
  process.exit(1);
}

console.log('🎉 ALL ALIGNMENT & PRONUNCIATION SCORING TESTS PASSED PERFECTLY!');
