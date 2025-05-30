import type { Weights } from './types';

/** 공백 문자 여부 확인 (' ') */
const isSpaceChar = (c: string): boolean => c === ' ';

/** 줄바꿈 문자 여부 확인 ('\n') */
const isNewlineChar = (c: string): boolean => c === '\n';

/** 영문자 여부 확인 (A-Z, a-z) */
const isEnglishChar = (c: string): boolean => /^[A-Za-z]$/.test(c);

/** 특수문자 여부 확인 (한글, 영문자, 숫자, 공백을 제외한 문자) */
const isSpecialChar = (c: string): boolean => /[^\w\s\u3131-\uD79D]/.test(c);

/**
 * 가중치를 적용해 텍스트의 총 글자 수를 계산하는 함수
 *
 * - 각 문자 유형에 따라 지정된 가중치만큼 합산
 * - 한글 및 기타 문자는 기본값 1로 계산
 */
export const countCharacters =
  (weights: Weights) =>
  (text: string): number =>
    Array.from(text).reduce((sum, char) => {
      if (isSpaceChar(char)) return sum + weights.space;
      if (isNewlineChar(char)) return sum + weights.newline;
      if (isEnglishChar(char)) return sum + weights.english;
      if (isSpecialChar(char)) return sum + weights.special;
      return sum + 1;
    }, 0);
