import InventoryTable from '@/components/plants/InventoryTable';
import { stackServerApp } from '@/stack';
import { SignUp } from '@stackframe/stack';
import { getPlants } from '@/actions/plant.action'; // *************** plant 테이블 데이터 가져오는 서버액션 함수 추가

const Plants = async () => {
    const user = await stackServerApp.getUser(); // 사용자 정보 가져옴
    // const app = stackServerApp.urls; // 인증된 도메인 주소 가져옴 *************** 필요없음

    // *********************** plant 테이블 데이터 가져옴
    const plants = await getPlants();

    // 만일 로그인 사용자라면... 테이블을 표시하고 아니라면.. SignUp UI를 표시
    return (
        <>
            {user ? (
                <div className="container mx-auto">
                    <h1>Inventory Table</h1>
                    {/* *********************** plant 테이블 데이터를 속성으로 넘겨줌 */}
                    <InventoryTable plants={plants} />
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
