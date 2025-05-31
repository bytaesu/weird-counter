import type { Weights } from './types';

/** 공백 문자 여부 확인 (' ') */
const isSpaceChar = (c: string): boolean => c === ' ';

/** 줄바꿈 여부 확인 (CR (\r), LF (\n), 또는 CRLF ('\r\n') 을 포함) */
const isNewlineChar = (c: string): boolean => c === '\r' || c === '\n' || c === '\r\n';

/** 영문자 여부 확인 (A-Z, a-z) */
const isEnglishChar = (c: string): boolean => /^[A-Za-z]$/.test(c);

/** 특수문자 여부 확인 (한글, 영문자, 숫자, 공백을 제외한 문자) */
const isSpecialChar = (c: string): boolean => /[^\w\s\u3131-\uD79D]/.test(c);

/**
 * 주어진 텍스트를 grapheme(의미를 나타내는 최소 문자 단위) 단위로 분할하여,
 * 각 문자 유형별 가중치를 적용해 총 글자 수를 계산합니다.
 *
 * - 각 문자 유형에 따라 지정된 가중치만큼 합산
 * - 한글 및 기타 문자는 기본값 1로 계산
 *
 *
 *    ✏️ Fix: Array.from() -> Intl.Segmenter()
 *       유니코드 코드단위 분해 -> 의미를 갖는 가장 작은 문자 단위 기준으로 문자열을 분해
 *
 *       버그 사례:
 *       - ZWJ (Zero Width Joiner) => 🧑‍🧑‍🧒 ['🧑', '‍', '🧑', '‍', '🧒']
 *       - Combining mark => ñ, é
 *
 *
 */
export const countCharacters =
  (weights: Weights) =>
  (text: string): number => {
    const segmenter = new Intl.Segmenter('ko', { granularity: 'grapheme' });
    const graphemes = Array.from(segmenter.segment(text), ({ segment }) => segment);

    return graphemes.reduce((sum, grapheme) => {
      if (isSpaceChar(grapheme)) return sum + weights.space;
      if (isNewlineChar(grapheme)) return sum + weights.newline;
      if (isEnglishChar(grapheme)) return sum + weights.english;
      if (isSpecialChar(grapheme)) return sum + weights.special;
      return sum + 1;
    }, 0);
  };
