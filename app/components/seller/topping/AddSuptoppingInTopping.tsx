import { Modal, message } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { useCreateSubtoppingInToppingMutation } from '@/app/api/topping';
import LoadingOverlay from '../../loading/Loading';
import { useParams } from 'next/navigation';

type Props = {}

const AddSuptoppingInTopping = (props: Props) => {
    const { id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createSubtopping, { isLoading }] = useCreateSubtoppingInToppingMutation()
    const [name, setname] = useState<any>()
    const [price, setprice] = useState<any>()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

        const data = {
            name: name,
            price: price,
            topping_id: id,
            view: true
        }
        createSubtopping(data)
            .unwrap()
            .then(() => {
                messageApi.success("Tạo Topping thành công!")
                setIsModalOpen(false);
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    if (isLoading) { return <LoadingOverlay /> }
    return (
        <div>
            {contextHolder}
            <button className=' w-full flex items-center justify-center pt-3 text-gray-800 rounded' onClick={showModal}>
                <PlusOutlined className='mr-2' /> Thêm Topping
            </button>
            <Modal title="Thêm Topping" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='bg-gray-100 p-2 flex mt-10'>
                    <span>Tên<span className='text-red-400'>*</span></span>
                    <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='VD: Tương ớt' onChange={(e: any) => setname(e.target.value)} /></span>
                </div>
                <div className='bg-gray-100 p-2 flex mt-2'>
                    <span>Giá<span className='text-red-400'>*</span></span>
                    <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='đ' onChange={(e: any) => setprice(e.target.value) }/></span>
                </div>
            </Modal>
        </div>
    )
}

export default AddSuptoppingInTopping