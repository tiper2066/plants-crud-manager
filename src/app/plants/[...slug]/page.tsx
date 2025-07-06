import PlantCard from '@/components/plants/PlantCard';
import { getPlantById } from '@/actions/plant.action'; // *********** 서버 액션 가져옴

// ****************** 전달된 파라미터 받아오기
const PlantDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) => {
    const resolvedParams = await params; // params를 기다린다
    const slug = resolvedParams.slug; // params 에서 slug 를 추출함
    const [id] = slug[0].split('--'); // ********** 전달된 slug 배열에서 '--' 로 분리 배열 후 id값 추축
    const plant = await getPlantById(id); // ********** Plant 테이블에서 id 와 일치하는 데이터 정보 가져오기

    return (
        <>
            <h1>Plant Detail Page</h1>
            <div className="container mx-auto">
                <h1>Inventory Table</h1>
                {/* *********************** plant 테이블 데이터를 속성으로 넘겨줌 */}
                <PlantCard plant={plant} />
            </div>
        </>
    );
};
export default PlantDetailPage;
