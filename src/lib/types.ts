/**
 * 가중치 줄 문자 유형
 */
export type Weights = {
  space: number; // 공백
  newline: number; // 줄바꿈
  special: number; // 특수문자
  english: number; // 영문자
};

/**
 * 선택 가능한 가중치 옵션 값
 */
export type WeightOption = '0' | '0.5' | '1';
