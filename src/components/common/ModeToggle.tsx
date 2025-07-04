'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes'; // next-themes 라이브러리로 부터 useTheme 가져옴
import { Button } from '@/components/ui/button';

const ModeToggle = () => {
    const { theme, setTheme } = useTheme(); // theme 객체 생성

    return (
        <Button
            variant='outline' // 아웃라인 버튼 스타일
            size='icon' // 아이콘 버튼 사이즈
            // 클릭할 때마다 dark <--> light 테마를 변경한다.
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            {/* 기본 숨겨지고 스크린리더가 읽을 수 있도록함 */}
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );
};
export default ModeToggle;
