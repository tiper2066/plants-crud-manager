import PlantCard from '@/components/plants/PlantCard';
import { getPlantById } from '@/actions/plant.action'; //  서버 액션 가져옴
import { stackServerApp } from '@/stack'; // ******************************** stack auth 메서드 가져옴
import { SignIn } from '@stackframe/stack'; // *************************** stack auth 에서 제공하는 로그인 페이지

// ******************************** parameter 받아오기 함수
const getParameters = async (parameter: Promise<{ slug: string[] }>) => {
    const resolvedParams = await parameter; // params를 기다린다
    const slug = resolvedParams.slug; // params 에서 slug 를 추출함
    const [id] = slug[0].split('--'); //  전달된 slug 배열에서 '--' 로 분리 배열 후 id값 추축
    const plant = await getPlantById(id); // Plant 테이블에서 id 와 일치하는 데이터 정보 가져오기
    return { plant };
};

// ******************************** SEO 를 위한 동적 라우팅 metadata 생성
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { plant } = await getParameters(params); // params 받아 plant 정보 가져오기 함수 실행

    return {
        title: plant ? 'Plants Ventory - ' + plant.name : 'Plant Details', // 브라우저 탭의 페이지 타이틀
        description: plant ? plant.description : 'Plant details page',
    };
}

//  전달된 파라미터 받아오기
const PlantDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) => {
    const user = await stackServerApp.getUser(); // ********************* Stack-Auth 사용자 정보 가져오기
    // const resolvedParams = await params; // params를 기다린다
    // const slug = resolvedParams.slug; // params 에서 slug 를 추출함
    // const [id] = slug[0].split('--'); //  전달된 slug 배열에서 '--' 로 분리 배열 후 id값 추축
    // const plant = await getPlantById(id); //  Plant 테이블에서 id 와 일치하는 데이터 정보 가져오기
    const { plant } = await getParameters(params); // params 받아 plant 정보 가져오기 함수 실행

    if (!user) return <SignIn />; // ************** 현재 사용자가 아니면 로그인 화면 표시

    return (
        <>
            {/* *********************** 기본 grid 1컬럼, 1024 이상에서 grid 10 컬럼  */}
            <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
                <div className="lg:col-span-full">
                    {/*  plant 테이블 데이터를 속성으로 넘겨줌 */}
                    <PlantCard plant={plant} />
                </div>
            </div>
        </>
    );
};
export default PlantDetailPage;
