import { describe, it, expect } from 'vitest';
import { countCharacters } from './count';

const weights = {
  space: 1,
  newline: 1,
  special: 1,
  english: 1,
};

const count = countCharacters(weights);

describe('countCharacters - 실제 입력 시나리오 기반 테스트', () => {
  it('1. 다양한 문자 유형이 섞인 한 문장을 처리한다', () => {
    const text = `Hello, 안녕하세요! 😊\nHow are you?`;
    // 예상:
    // Hello → 5 (영문)
    // , → 1 (특수)
    //   → 1
    // 안녕하세요 → 5
    // ! → 1 (특수)
    //   → 1
    // 😊 → 1 (이모지)
    // \n → 1
    // How → 3
    //   → 1
    // are → 3
    //   → 1
    // you → 3
    // ? → 1
    expect(count(text)).toBe(28);
  });

  it('2. 복합 이모지(ZWJ 조합)를 포함한 경우', () => {
    const text = `가족: 👨‍👩‍👧‍👦`; // "가", "족", ":", " ", "👨‍👩‍👧‍👦"
    // 2 (한글) + 1 (특수 :) + 1 (공백) + 1 (이모지)
    expect(count(text)).toBe(5);
  });

  it('3. 조합 문자 (Combining mark) 사용 시 1로 계산되어야 한다', () => {
    const text = 'e\u0301 + o\u0302'; // é, ô (e + accent, o + circumflex)
    // 'é', ' ', '+', ' ', 'ô' → 총 5 graphemes
    expect(count(text)).toBe(5);
  });

  it('4. 줄바꿈이 여러 개 섞인 경우 처리', () => {
    const text = '첫 줄\r\n두 번째 줄\n세 번째 줄\r';
    expect(count(text)).toBe(18);
  });

  it('5. 잘못된 유니코드 문자가 있어도 정상 처리된다', () => {
    const text = 'hello�world'; // �: Replacement character (U+FFFD), 흔히 깨진 텍스트
    // 5 (hello) + 1 (�) + 5 (world)
    expect(count(text)).toBe(11);
  });

  it('6. 긴 텍스트에서 성능 저하 없이 정확히 계산된다', () => {
    const base = 'a b\n!한글😊';
    const repeated = base.repeat(1000);
    expect(count(repeated)).toBe(8000);
  });
});