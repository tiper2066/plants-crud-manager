import InventoryTable from '@/components/plants/InventoryTable';
import { stackServerApp } from '@/stack';
import { SignUp } from '@stackframe/stack';

const Plants = async () => {
    const user = await stackServerApp.getUser(); // 사용자 정보 가져옴
    const app = stackServerApp.urls; // 인증된 도메인 주소 가져옴

    // 만일 로그인 사용자라면... 테이블을 표시하고 아니라면.. SignUp UI를 표시
    return (
        <>
            {user ? (
                <div className="container mx-auto">
                    <h1>Inventory Table</h1>
                    <InventoryTable />
                </div>
            ) : (
                <div className="flex justify-center items-center mt-20">
                    <SignUp />
                </div>
            )}
        </>
    );
};
export default Plants;
