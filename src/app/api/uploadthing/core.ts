import { stackServerApp } from '@/stack';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// 업로드 파일 라우팅 설정 함수
export const ourFileRouter = {
    postImage: f({
        image: {
            maxFileSize: '4MB', // 최대 4mb
            maxFileCount: 1, // 한번에 1개 업로드 가능
        },
    })
        // FileRoute에 대한 권한 및 파일 유형 설정
        .middleware(async ({ req }) => {
            // 업로드하기 전에 서버에서 실행됨
            const user = await stackServerApp.getUser(); // Stack-Auth 사용자 정보 가져오기

            // 사용자가 아니면 업로드 불가 에러 출력
            if (!user) throw new Error('Unauthorized');

            // 여기서 반환되는 모든 항목은 'metadate'로 onUploadComplete에서 액세스할 수 있음
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            try {
                console.log('Upload complete for userId:', metadata.userId); // 업로드 완료 시 사용자 id 출력
                console.log('file url', file.ufsUrl); // 파일 url 출력
                return { fileUrl: file.ufsUrl }; // 업로드 완료 후 파일 경로 반환
            } catch (error) {
                console.error('Error in onUploadComplete:', error);
                throw error;
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
