'use client'; //  client 컴포넌트 변경
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ComboBox } from './ComboBox';
import { useState } from 'react'; //  useState 훅
import { getPlants } from '@/actions/plant.action'; //  추가
import { useRouter } from 'next/navigation'; // ******************************* useRouter 훅

//  InventoryTableProps 타입의 선언
type Plant = Awaited<ReturnType<typeof getPlants>>; // 서버액션 함수를 이용 데이터 타입가져옴
interface InventoryTableProps {
    plants: Plant;
}
//  InventoryTableProps 타입의 plants 테이블 데이터를 props 로 전달받음
const InventoryTable = ({ plants }: InventoryTableProps) => {
    const router = useRouter(); // ******************************* Router 객체 생성
    const [selectedCategory, setSelectedCategory] = useState(''); //  현재선택 카테고리 상태변수
    const [searchTerm, setSearchTerm] = useState(''); //  검색어 상태변수

    //  만일 name, category 를 선택했다면... 필터링해서 저장하는 함수
    const filteredPlants = plants?.userPlants?.filter(
        (plant: { name: string; category: string }) =>
            // 검색어가 포함된 name 과 선택된 카테고리가 없거나, 선택된 카테고리와 일치하는 데이터만 필터링해서 반환한다.
            plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === '' || plant.category === selectedCategory)
    );

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        placeholder="Filter plants..."
                        className="pl-10"
                        value={searchTerm} //  검색어 상태변수
                        onChange={(e) => setSearchTerm(e.target.value)} //  검색어 상태변수를 업데이트
                    />
                    {/* 돋보기 아이콘: inpu 필드 left 3 x 4 = 12px, top 50%, 위로 -50% 위치 설정 */}
                    <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <ComboBox
                    value={selectedCategory} //  현재 선택 카테고리 값 설정
                    onChange={(val) => setSelectedCategory(val)} //  사용자가 선택한 카테고리 값으로 변경
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plant ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*  검색어 필터링된 데이터로(filteredPlants) plants 테이블 데이터를 테이블로 출력 */}
                    {filteredPlants?.map((plant: any) => {
                        // ****************************************** slug 라우팅 경로 생성
                        const slugifiedName = plant.name
                            .toLowerCase() // 이름을 소문자로 변경한 후,
                            .replace(/\s+/g, '-'); // 하나 이상의 공백을 '-' 로 변경함 (예, "John Doe" -> "john-doe")
                        const slug = `${plant.id}--${slugifiedName}`; // id--name 으로 slug 생성
                        const plantUrl = `/plants/${slug}`; // 상세 페이지로 이동할 url 생성

                        return (
                            <TableRow
                                key={plant.id}
                                onClick={() => router.push(plantUrl)} // ******************************** 상세 페이지로 이동 클릭핸들러 추가
                                className="cursor-pointer" // ***************************** 마우스 오버시 커서 손바닥 변경
                            >
                                <TableCell>{plant.id}</TableCell>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.category}</TableCell>
                                <TableCell>{plant.price}</TableCell>
                                <TableCell className="font-bold">
                                    {plant.stock}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-4">
                                        <h1>Edit Button</h1>
                                        <h1>Delete Button</h1>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};
export default InventoryTable;
