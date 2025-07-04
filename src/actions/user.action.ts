'use server';

import { neon } from '@neondatabase/serverless';

// 사용자 세부 정보 가져오는 함수
export async function getUserDetails(userId: string | undefined) {
    // DATABASE_URL 이 없으면 에러 처리
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set');
    }
    // 전달받은 사용자 id 가 없으면 에러 처리
    if (!userId) {
        return null;
    }

    const sql = neon(process.env.DATABASE_URL!); // neon db 에 연겨해서 사용자 정보 가져오는 쿼리 생성
    const [user] = // 전달받은 사용자 id 와 일치하는 사용자의 정보를 가져와서 저장한다
        await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId};`;

    return user; // 가져온 사용자 상세 정보 반환
}
