'use client';
import { Button, Modal, Popconfirm, Select, Switch, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
// import './style.css';
import { RightOutlined, UploadOutlined } from '@ant-design/icons';
import ToppingInProductDetail from './ToppingInProductDetail';
import classNames from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import LoadingOverlay from '../../loading/Loading';
import { useDeleteProductMutation, useGetAllCategoryQuery, useGetOneProductQuery, useUpdateToppingInProductMutation } from '@/app/api/category';
import ListToppingInProduct from './ListToppingInProduct';
const { Option } = Select;

const ProductDetailInCategory = () => {
    const router: any = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<any>();
    const { id } = useParams();
    const { data, isLoading: loading, error } = useGetOneProductQuery(id)
    const [updateview, { isLoading: loadingview }] = useUpdateToppingInProductMutation()
    const { data: allcategory } = useGetAllCategoryQuery(0)
    const [view, setview] = useState<any>()
    const [name, setname] = useState<any>()
    const [price, setprice] = useState<any>()
    const [desc, setdesc] = useState<any>()
    const [category, setcategory] = useState<any>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toppingid, settopping] = useState<any>()
    const [uploadedImages, setUploadedImages] = useState<any>();
    const [fileList, setFileList] = useState<any[]>([]);
    const [removeProduct, { isLoading: removeLoading }] = useDeleteProductMutation()
    const HandleView = (e: any) => {
        setview(e)
    }
    const HandleClick = () => {
        setIsLoading(true)
        const dataproduct = {
            name: name ? name : data?.data?.name,
            price: price ? price : data?.data?.price,
            description: desc ? desc : data?.data?.description,
            category: category ? category : data?.data?.category,
            image: uploadedImages ? uploadedImages : data?.data?.image,
            view: view
        }

        updateview({ id: data?.data?.id, product: dataproduct })
            .unwrap()
            .then(() => {
                messageApi.success('update product successfully!');

                setTimeout(() => {
                    router.push(`/modules/seller/menus`, undefined, { shallow: true });
                }, 500);

            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const topping = (t: any) => {
        const transformedToppings = t.map((id: any) => ({ id }));
        settopping(transformedToppings)
    }
    if (loading) return <LoadingOverlay />
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsLoading(true)
        const dataproduct = {
            name: name ? name : data?.data?.name,
            price: price ? price : data?.data?.price,
            description: desc ? desc : data?.data?.description,
            category: data?.data?.category,
            toppings: toppingid
        }

        updateview({ id: data?.data?.id, product: dataproduct })
            .unwrap()
            .then(() => {
                messageApi.success('update topping successfully!');
                setIsModalOpen(false);
                setIsLoading(false)
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
    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file, fileList }: any) {
            if (file.status !== "uploading") {
                setUploadedImages(file.response.secure_url);
            }
            setFileList(fileList);
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    const HandleRemove = () => {
        setIsLoading(true)
        removeProduct(id)
            .unwrap()
            .then(() => {
                messageApi.success('Remove food successfully!');
                setIsLoading(false)
                setTimeout(() => {
                    router.push(`/modules/seller/menus`, undefined, { shallow: true });
                }, 500);
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'remove failure',
                });
            });
    }
    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            {contextHolder}
            <div className='pl-10 pr-10 pt-5 pb-5 bg-gray-100'>
                <div className='p-2 flex'>
                    <span>Mã</span>
                    <span className='ml-auto'>{data?.data?.id}</span>
                </div>
                <div className='h-px bg-gray-300 mb-1'></div>
                <div className='p-2 flex mb-5'>
                    <div className='w-2/3'>
                        <span>Hình ảnh</span>
                        <p className='mt-2 text-gray-300'>Món có ảnh sẽ được khách đặt nhiều hơn.</p>
                    </div>
                    <div className='ml-auto relative rounded'>
                        <img alt="food" className='w-[100px] h-[100px] object-cover rounded' src={uploadedImages ? uploadedImages : data?.data?.image} />
                        <button className='absolute bottom-0 left-0 w-full h-[50px] bg-gray-500/65 rounded'>
                            <Upload.Dragger {...props} multiple accept=".jpg,.png" className='w-full h-full'>
                                <span className='text-white'>Sửa</span>
                            </Upload.Dragger>
                        </button>

                    </div>
                </div>
                <div className='h-px bg-gray-300 mb-1'></div>
                <div className='p-2 flex'>
                    <span>Tên<span className='text-red-500'>*</span></span>
                    <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập tên món ăn' defaultValue={data?.data?.name} onChange={(e: any) => setname(e.target.value)} /></span>
                </div>
                <div className='h-px bg-gray-300 mb-1'></div>
                <div className='p-2 flex'>
                    <span>Giá<span className='text-red-500'>*</span></span>
                    <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập giá món ăn' defaultValue={parseInt(data?.data?.price, 10)} onChange={(e: any) => setprice(e.target.value)} /></span>
                </div>
                <div className='h-px bg-gray-300 mb-1'></div>
                <div className='p-2 flex'>
                    <span>Danh mục<span className='text-red-500'>*</span></span>
                    <Select className='w-1/6 ml-auto' onChange={(e: any) => setcategory(e)} defaultValue={data?.data?.category} >
                        {allcategory?.data?.map((data1: any) => {
                            return (
                                <Option value={data1?.id} key={data1?.id} >{data1?.name}</Option>
                            )
                        })}
                    </Select>

                </div>
                <div className='h-px bg-gray-300 mb-1'></div>
                <div className='p-2 flex'>
                    <span>Mô tả</span>
                    <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập mô tả món ăn' defaultValue={data?.data?.description} onChange={(e: any) => setdesc(e.target.value)} /></span>
                </div>

            </div>
            <div className='pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
                <div className='p-2 flex'>
                    <span>Còn món<span className='text-red-500'>*</span></span>
                    <span className='ml-auto'><Switch defaultChecked={data?.data.view} onChange={(e) => HandleView(e)} /></span>
                </div>
            </div>
            <div className='pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
                <button className='p-2 flex items-center justify-between w-full' onClick={() => showModal()}>
                    <span>Nhóm Topping</span>
                    <span className='text-gray-400'>
                        <RightOutlined />
                    </span>
                </button>
                <div className='h-px bg-gray-300 mb-1'></div>
                {data?.data?.toppings?.map((data1: any, index: any) => {
                    return (
                        <ToppingInProductDetail data={data1} />
                    )
                })}

            </div>
            <Popconfirm
                title="Xóa món ?"
                description="Bạn có thực sự muốn xóa món này?"
                onConfirm={HandleRemove}
                okText="Đồng ý"
                cancelText="Không"
            >
                <button className=' w-full flex items-center justify-center p-2 border border-gray-600 text-gray-800 rounded' >
                    Xóa món
                </button>
            </Popconfirm>

            <button
                onClick={() => HandleClick()}
                className={classNames(
                    ' w-full sticky bottom-0 shadow-xl z-50 p-2  rounded mt-5',
                    {
                        'bg-red-500': !isLoading,
                        'bg-transparent': isLoading,
                        'text-white': !isLoading,
                        'text-gray-500': isLoading
                    }
                )}
            >
                Lưu
            </button>

            <Modal title="Nhóm Topping" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className=''>
                <ListToppingInProduct id={id} onTopping={topping} />
            </Modal>
        </>
    )
}

export default ProductDetailInCategory