import type { Metadata } from 'next';
import { pretendard } from '@/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: '이상한 카운터',
  description: '공백 처리를 이상하게 하는 곳들을 위한 글자 수 카운터입니다.',
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>{children}</body>
    </html>
  );
};

export default Layout;
