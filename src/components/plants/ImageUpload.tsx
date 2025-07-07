import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@uploadthing/react';
import { XIcon } from 'lucide-react';

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: 'postImage';
}
// 이미지 경로, onChange 이벤트 함수, value: 이미지 경로,  받는다
function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    // 이미 업로딩된 이미지가 있으면... 화면에 표시하고
    if (value) {
        return (
            <div className='relative size-40'>
                <img
                    src={value}
                    alt='Upload'
                    className='rounded-md w-full h-full object-cover'
                />
                <button
                    onClick={() => onChange('')}
                    className='absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm'
                    type='button'
                >
                    {/* 닫기 아이콘 */}
                    <XIcon className='h-4 w-4 text-white' />
                </button>
            </div>
        );
    }
    // 업로드된 이미지가 없고, Choose File 버튼 클릭하면.. 파일이 업로드되고.. 업로드 완료 시 이미지를 표시함
    return (
        <div className='flex items-center img_upload_container'>
            <UploadDropzone<OurFileRouter, 'postImage'>
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log('Files: ', res);
                    // 이미지 업데이트
                    if (res && res[0]?.ufsUrl) {
                        onChange(res[0].ufsUrl);
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}
export default ImageUpload;
