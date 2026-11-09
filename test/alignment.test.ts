import { alignTranscripts, cleanWord } from '../src/utils/alignment';

console.log('--- RUNNING ALIGNMENT VERIFICATION SUITE ---\n');

const targetSentence = 'I think the answer is three.';

// Test 1: Exact match
console.log('TEST 1: Exact Match');
const result1 = alignTranscripts(targetSentence, 'I think the answer is three.');
console.log('isExactMatch:', result1.isExactMatch);
console.log('Mismatched count:', result1.mismatchedWords.length);
console.log('Missing count:', result1.missingWords.length);
if (result1.isExactMatch && result1.mismatchedWords.length === 0) {
  console.log('✅ TEST 1 PASSED: Exact match recognized correctly.\n');
} else {
  console.error('❌ TEST 1 FAILED');
  process.exit(1);
}

// Test 2: "three/tree" Substitution
console.log('TEST 2: "three" / "tree" Substitution');
const result2 = alignTranscripts(targetSentence, 'I think the answer is tree.');
console.log('isExactMatch:', result2.isExactMatch);
console.log('Mismatches:', result2.mismatchedWords);
console.log('Suggested practice word:', result2.suggestedPracticeWord);
const matchedPair = result2.mismatchedWords.find(
  m => cleanWord(m.target) === 'three' && cleanWord(m.spoken) === 'tree'
);
if (!result2.isExactMatch && matchedPair && result2.suggestedPracticeWord === 'three') {
  console.log(`✅ TEST 2 PASSED: Identified substitution: target="${matchedPair.target}", spoken="${matchedPair.spoken}"\n`);
} else {
  console.error('❌ TEST 2 FAILED');
  process.exit(1);
}

// Test 3: Missing word ("think" missing)
console.log('TEST 3: Missing Word ("think")');
const result3 = alignTranscripts(targetSentence, 'I the answer is three.');
console.log('isExactMatch:', result3.isExactMatch);
console.log('Missing words:', result3.missingWords);
if (!result3.isExactMatch && result3.missingWords.includes('think')) {
  console.log('✅ TEST 3 PASSED: Identified missing word "think"\n');
} else {
  console.error('❌ TEST 3 FAILED');
  process.exit(1);
}

// Test 4: Extra words / hesitation
console.log('TEST 4: Extra Words ("um ... please")');
const result4 = alignTranscripts(targetSentence, 'Um I think the answer is three please');
console.log('Extra words:', result4.extraWords);
if (result4.extraWords.length > 0) {
  console.log('✅ TEST 4 PASSED: Extra words handled gracefully.\n');
} else {
  console.error('❌ TEST 4 FAILED');
  process.exit(1);
}

// Test 5: Number normalization ("3" -> "three")
console.log('TEST 5: Number Normalization ("3")');
const result5 = alignTranscripts(targetSentence, 'i think the answer is 3');
console.log('isExactMatch for "3":', result5.isExactMatch);
if (result5.isExactMatch) {
  console.log('✅ TEST 5 PASSED: Number 3 normalized to three.\n');
} else {
  console.error('❌ TEST 5 FAILED');
  process.exit(1);
}

console.log('🎉 ALL ALIGNMENT TESTS PASSED PERFECTLY!');
