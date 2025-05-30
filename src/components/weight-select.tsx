'use client';

import type { WeightOption } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// 사용할 가중치 옵션 리스트
export const weightOptions: WeightOption[] = ['0', '0.5', '1'];

type WeightSelectProps = {
  label: string;
  value: number;
  onChange: (v: WeightOption) => void;
};

/**
 * 문자 유형별 가중치 셀렉터
 */
const WeightSelect = ({ label, value, onChange }: WeightSelectProps) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <span className="text-sm text-muted-foreground">{label} 글자 수:</span>
      <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {weightOptions.map((val) => (
            <SelectItem key={val} value={val}>
              {val}자
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WeightSelect;
