'use server';
import { prisma } from '@/lib/prisma';
import { getUserId } from './user.action';

// 모든 plant 테이블 데이트 가져오기 함수 (검색어 입력 시 해당 검색어 포함하는 데이터 가져옴)
export async function getPlants(searchTerm?: string) {
    try {
        const currentUserId = await getUserId(); // 현재 사용자 id 가져와 저장
        console.log('currentUserId: ', currentUserId);
        // 데이터베이스에서 데이터를 필터링할 조건을 설정
        const whereClause: any = {
            userId: currentUserId, // 현재 사용자 id 와 일치하는 사용자를 찾음
        };
        // 검색어가 있을 경우 검색어 포함해서 데이터를 찾음
        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm, // searchTerm 파라미터(검색어)가 있다면 name 필드를 포함하여 검색
                mode: 'insensitive', // 대소문자 구분없이 검색
            };
        }
        // 조건에 맞는 데이터를 모두 찾아 저장
        const userPlants = await prisma.plant.findMany({
            where: whereClause,
        });

        return { success: true, userPlants }; // 가져오기 성공시 가져온 데이터 반환
    } catch (error) {
        // console.log('Error in getPlants', error);
        throw new Error('Failed to fetch plants');
    }
}

// 특정 사용자 id 와 일치하는 Plant 테이블 데이터 가져오기
export async function getPlantById(id: string) {
    return await prisma.plant.findUnique({
        where: { id },
    });
}
