'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EditIcon } from 'lucide-react';
import { ComboBox } from './ComboBox';
import { useState } from 'react';
import { editPlant, getPlantById } from '@/actions/plant.action'; //  editPlant 서버 액션 추가
import { toast } from 'sonner'; //  sonner 라이브러리 추가
import ImageUpload from './ImageUpload'; // *************** 추가

// Plant 타입
type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>; // 아래 interface 선언과 동일하게 기능함
/*
interface Plant {
    id: string;
    name: string;
    description: string | null;
    category: string;
    stock: number;
    price: number;
   createdAt: Date;
   updatedAt: Date;
    userId: string;
    imageUrl: string | null;
}
*/

// 컴포넌트 함수에 전달할 EditDialogProps 타입
interface EditDialogProps {
    plant: Plant;
}

const EditDialog = ({ plant }: EditDialogProps) => {
    // 폼에서 가져올 요소의 값들을 담을 상태변수 선언 (기본값 6개)
    const [formData, setFormData] = useState({
        name: plant?.name.trim(), // 이름 앞뒤공백 제거
        description: (plant?.description || '').trim(),
        stock: plant?.stock,
        price: plant?.price,
        category: plant?.category.trim(),
        userId: plant?.userId.trim(),
        imageUrl: plant?.imageUrl || '',
    });

    // 필드 name 값과 value 를 전달 받아 상태변수에 저장하는 함수
    const handleChange = (field: string, value: string | number) => {
        setFormData({ ...formData, [field]: value });
    };

    // 폼에서 입력된 데이터를 서버로 전달하는 함수
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newPlant = await editPlant(plant.id, formData); //  createPlant 서버 액션 실행
            console.log('Plant edited : ', newPlant); // 새로 plant 데이터 생성 후 반환된 데이터값 출력
            toast.success('Plant edited successfully'); //  toast 성공 메세지 출력
        } catch (error) {
            console.error('Error edited plant', error);
            toast.error('Failed to edited plant'); //  toast 에러 메세지 출력
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant='secondary'
                    className='ml-auto flex items-center gap-2 hover:cursor-pointer'
                    asChild
                >
                    <span>
                        <EditIcon className='w-2 h-2' />
                        Edit Plant
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add a Plant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill out the from below to add a new plant to your
                        inventory
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Enter name'
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange('name', e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor='category'>Category</Label>
                            <ComboBox
                                value={formData.category}
                                onChange={(val) =>
                                    handleChange('category', val)
                                }
                            />
                        </div>
                    </div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                        id='description'
                        placeholder='Type your message here.'
                        rows={5}
                        value={formData.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor='downloadUrl'>Stock</Label>
                            <Input
                                id='stock'
                                type='number'
                                placeholder='Enter stock quantity'
                                value={formData.stock}
                                onChange={(e) =>
                                    handleChange(
                                        'stock',
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label htmlFor='price'>Price</Label>
                            <Input
                                id='price'
                                type='number'
                                placeholder='Enter price'
                                value={formData.price}
                                onChange={(e) =>
                                    handleChange(
                                        'price',
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* ****************************************** Image Upload 컴포넌트  */}
                    <div className='py-5'>
                        <ImageUpload
                            endpoint='postImage'
                            value={formData.imageUrl}
                            onChange={(url) => {
                                handleChange('imageUrl', url);
                            }}
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type='submit'>
                            Submit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default EditDialog;
