import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/common/ModeToggle'; //  ModeToggle 컴포넌트
import { HomeIcon, Sprout, LogIn, LogOut } from 'lucide-react'; //  LogOut 아이콘 추가
import { stackServerApp } from '@/stack'; //  stackServerApp 가져옴
import { getUserDetails } from '@/actions/user.action'; //  getUserDetails 서버액션함수 가져옴
import { UserButton } from '@stackframe/stack';

//  비동기 함수로 변경
const Navbar = async () => {
    //  Neon Postgre DB 에서 stack-auth 로 생성한 user 가져옴
    const user = await stackServerApp.getUser(); // 사용자 정보 가져옴
    const app = stackServerApp.urls; // 인증된 도메인 주소 가져옴
    const userProfile = await getUserDetails(user?.id); //  사용자 정보에서 id 를 전달하여 상세 정보 가져오기

    // console.log('userProfile: ', userProfile);

    return (
        // 화면 상단 고정, 전체 너비, --background (흰색)의 95% 투명, 배경 블러 효과(--background 의 60%), z-50: 레벨 상위
        <div className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            {/* 너비 1280, 화면중앙 배치, 좌우패딩 16 */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* 사이트 로고, 이미지 사용 https://snskeyboard.com/emoji/ */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary font-mono tracking-wider" // 넓은 자간
                        >
                            🪴 Plantventory
                        </Link>
                    </div>

                    {/*  사용자 이름 표시 */}
                    {userProfile?.name && (
                        <span className="text-[14px] text-gray-600 dark:text-gray-300">{`Hello, ${
                            userProfile?.name.split(' ')[0] // 공백으로 분리한 다음 첫번째 단어만 가져오도록함
                        }`}</span>
                    )}

                    {/* 기본 숨김, 768 이상에서 flex, 좌우 여백 16 */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            asChild
                        >
                            <Link href="/plants">
                                <Sprout className="w-4 h-4" />
                                {/* 1024 이상 너비에서 보임 */}
                                <span className="hidden lg:inline">Plants</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            asChild
                        >
                            <Link href="/">
                                <HomeIcon className="w-4 h-4" />
                                {/* 1024 이상 너비에서 보임 */}
                                <span className="hidden lg:inline">Home</span>
                            </Link>
                        </Button>
                        {/*  테마 모드 토글 버튼 추가  */}
                        <ModeToggle />

                        {/*  user 정보 여부에 따라 로그인/로그아웃 버튼 표시  */}
                        {user ? (
                            <>
                                {/*  로그아웃 버튼  */}
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2"
                                    asChild
                                >
                                    {/*  로그아웃 로직 실행   */}
                                    <Link href={app.signOut}>
                                        <LogOut className="w-4 h-4" />
                                        {/* 1024 이상 너비에서 보임 */}
                                        <span className="hidden lg:inline">
                                            Sign Out
                                        </span>
                                    </Link>
                                </Button>
                                {/*  사용자 아바타  */}
                                <UserButton />
                            </>
                        ) : (
                            <>
                                {/*  로그인 버튼  */}
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2"
                                    asChild
                                >
                                    {/*  로그인 팝업을 띄우게함  */}
                                    <Link href={app.signIn}>
                                        <LogIn className="w-4 h-4" />
                                        {/* 1024 이상 너비에서 보임 */}
                                        <span className="hidden lg:inline">
                                            Sign In
                                        </span>
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
