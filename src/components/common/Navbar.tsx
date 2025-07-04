import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon, Sprout } from 'lucide-react';

const Navbar = () => {
    return (
        // 화면 상단 고정, 전체 너비, --background (흰색)의 95% 투명, 배경 블러 효과(--background 의 60%), z-50: 레벨 상위
        <div className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
            {/* 너비 1280, 화면중앙 배치, 좌우패딩 16 */}
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center h-16'>
                    {/* 사이트 로고, 이미지 사용 https://snskeyboard.com/emoji/ */}
                    <div className='flex items-center'>
                        <Link
                            href='/'
                            className='text-xl font-bold text-primary font-mono tracking-wider' // 넓은 자간
                        >
                            🪴 Plantventory
                        </Link>
                    </div>

                    {/* Navigation Menu 자리 */}

                    {/* 기본 숨김, 768 이상에서 flex, 좌우 여백 16 */}
                    <div className='hidden md:flex items-center space-x-4'>
                        <Button
                            variant='ghost'
                            className='flex items-center gap-2'
                            asChild
                        >
                            <Link href='/plants'>
                                <Sprout className='w-4 h-4' />
                                {/* 1024 이상 너비에서 보임 */}
                                <span className='hidden lg:inline'>Plant</span>
                            </Link>
                        </Button>
                        <Button
                            variant='ghost'
                            className='flex items-center gap-2'
                            asChild
                        >
                            <Link href='/'>
                                <HomeIcon className='w-4 h-4' />
                                {/* 1024 이상 너비에서 보임 */}
                                <span className='hidden lg:inline'>Home</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
