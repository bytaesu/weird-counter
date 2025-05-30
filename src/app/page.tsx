import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WeightedCharCounter from '@/components/weighted-char-counter';

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16">
      <Card className="shadow-2xl w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">
            이상한 카운터 <span className="text-xs">(Weird Counter)</span>
          </CardTitle>
          <CardDescription>
            공백, 줄바꿈 등 글자 수를 독특하게 계산하는 경우를 위한 글자 수 카운터입니다.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <WeightedCharCounter />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
