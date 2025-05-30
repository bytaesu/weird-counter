'use client';

import type { Weights } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { countCharacters } from '@/lib/count';
import WeightSelect from './weight-select';

// 가중치 초기 값
const defaultWeights: Weights = {
  space: 1,
  newline: 1,
  special: 1,
  english: 1,
};

// 화면에 보여줄 가중치 라벨
const weightLabels: Record<keyof Weights, string> = {
  space: '공백',
  newline: '줄바꿈',
  special: '특수문자',
  english: '영문자',
};

/**
 * 가중치를 적용해 글자 수를 계산하고 목표와 비교하는 카운터
 */
const WeightedCharCounter = () => {
  // 상태 리스트
  const [value, setValue] = useState('');
  const [target, setTarget] = useState<number | null>(null);
  const [weights, setWeights] = useState<Weights>(defaultWeights);

  // 글자 수 연산
  const calc = countCharacters(weights);
  const charCount = calc(value);
  const overLimit = target !== null && charCount > target;

  // 가중치 설정 변경 핸들러
  const updateWeight = (key: keyof Weights) => (v: string) => {
    const parsed = parseFloat(v);
    if (!isNaN(parsed) && parsed >= 0) {
      setWeights((prev) => ({ ...prev, [key]: parsed }));
    }
  };

  // 목표 글자 수 입력 핸들러
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d+$/.test(val)) {
      const num = parseInt(val, 10);
      setTarget(num);
    } else if (val === '') {
      setTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* 가중치 선택 */}
      {(Object.keys(weights) as (keyof Weights)[]).map((key) => (
        <WeightSelect
          key={key}
          label={weightLabels[key]}
          value={weights[key]}
          onChange={updateWeight(key)}
        />
      ))}

      <Separator className="my-6" />

      {/* 목표 글자 수 입력 */}
      <div className="flex flex-col items-start space-y-2">
        <span className="text-sm text-muted-foreground">목표 글자 수:</span>
        <Input
          type="text"
          inputMode="numeric" // 모바일 숫자 키패드
          pattern="[0-9]*" // 숫자 외 입력 방지
          className="w-28"
          placeholder="예: 500"
          value={target !== null ? target.toString() : ''}
          onChange={handleTargetChange}
        />
      </div>

      {/* 본문 입력 & 글자 수 결과 */}
      <div className="flex flex-col space-y-2">
        <span className="text-sm text-muted-foreground">본문:</span>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="텍스트를 입력하세요"
        />

        <div
          className={cn(
            'text-sm font-bold text-right mt-2',
            overLimit ? 'text-destructive' : 'text-primary',
          )}
        >
          글자 수: {charCount}
          {overLimit && target !== null && (
            <span className="ml-1 text-xs">({charCount - target}자 초과)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightedCharCounter;
