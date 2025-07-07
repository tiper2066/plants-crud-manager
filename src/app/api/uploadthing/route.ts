import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

//  Next App Router 에서 사용하도록 함수 선언
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});
