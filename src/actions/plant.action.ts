'use server';
import { prisma } from '@/lib/prisma';
import { getUserId } from './user.action';
import { revalidatePath } from 'next/cache';

type PlantCreateInput = Parameters<typeof prisma.plant.create>[0]['data']; //  createPlant 함수를 위한 타입 선언
type PlantUpdateInput = Parameters<typeof prisma.plant.update>[0]['data']; //  editPlnat 함수를 위한 타입 선언

// 모든 plant 테이블 데이트 가져오기 함수 (검색어 입력 시 해당 검색어 포함하는 데이터 가져옴)
export async function getPlants(searchTerm?: string) {
    try {
        const currentUserId = await getUserId(); // 현재 사용자 id 가져와 저장
        // console.log('currentUserId: ', currentUserId);
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

//  Plant 게시물 생성 함수
export async function createPlant(data: PlantCreateInput) {
    console.log('Creating Plant:', data);
    console.log('data: ', data);

    try {
        const currentUserId = await getUserId();
        if (!currentUserId) return; // 사용자 id 가 없으면 중지

        // 현재 로그인 사용자라면... plant 테이블에 데이터를 생성함
        const newPlant = await prisma.plant.create({
            data: {
                ...data,
                userId: currentUserId,
            },
        });

        revalidatePath('/plants'); // 캐싱된 라우팅 사용을 방지하기 위해 새로고침함
        return newPlant; // 생성한 값을 반환함
    } catch (error) {
        console.error('Error creating plant:', error);
        throw error;
    }
}

// 현재 게시물 id 와 데이터를 전달받아 Plant 게시물 수정 함수
export async function editPlant(id: string, data: PlantUpdateInput) {
    try {
        const currentUserId = await getUserId(); // 현재 사용자 id 가져오기

        const updatedProduct = await prisma.plant.update({
            where: { id }, // 현재 게시물 id 와 일치하는 게시물을 찾음
            data: {
                ...data,
                userId: currentUserId,
            },
        });

        revalidatePath('/plants'); // 캐싱된 라우팅 사용을 방지하기 위해 새로고침함
        return updatedProduct; // 수정된 데이터를 반환
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// ***************************************************************** 현재 게시물 id 전달받아 Plant 게시물 삭제 함수
export async function deletePlant(id: string) {
    try {
        const currentUserId = await getUserId(); // 현재 사용자 id 가져오기
        if (!currentUserId) return; // 사용자 id 가 없을 때 중지

        const deletedProduct = await prisma.plant.delete({
            where: { id }, // 현재 게시물 id 와 일치하는 게시물을 찾음
        });

        revalidatePath('/plants'); // 캐싱된 라우팅 사용을 방지하기 위해 새로고침함
        return deletedProduct; // 삭제 데이터를 반환
    } catch (error) {
        console.error('Error Deleting plant:', error);
        throw error;
    }
}
