
import FormatTotal from "@/app/utils/FormatTotal";
import { Switch, Table, message } from "antd";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import LoadingOverlay from "../../loading/Loading";
import './style.css';
import { useUpdateToppingInProductMutation } from "@/app/api/category";


const ProductInCategory = ({ data, onRefetch }: any) => {
    const router: any = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [updateview, { isLoading: loadingview }] = useUpdateToppingInProductMutation()
    const [isLoading, setIsLoading] = useState<any>();
    const HandleView = (product: any, e: any) => {
        const dataproduct = {
            name: product?.name,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            image: product?.image,
            view: e
        }
        updateview({ id: product.id, product: dataproduct })
            .unwrap()
            .then(() => {
                if (e) {
                    messageApi.success('turn on the dish successfully!');
                } else {
                    messageApi.success('turn off the dish successfully!');
                }
                onRefetch(e)
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const columns = [
        {
            dataIndex: 'image',
            key: 'Image',
            render: (image: any) => (
                <div className='ml-auto relative rounded'>
                    <img alt="food" className='w-[100px] h-[100px] object-cover rounded' src={image} />
                </div>
            ),
        },
        {
            dataIndex: 'name',
            key: 'name',
            render: (name: any) => (
                <p className=" font-bold">{name}</p>
            ),
        },
        {
            dataIndex: 'price',
            key: 'price',
            render: (price: any) => (
                <FormatTotal amount={price} />
            ),
        },
        {
            dataIndex: 'view',
            key: 'view',
            render: (view: boolean, product: any) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch defaultChecked={view} onChange={(e) => HandleView(product, e)} />
                </div>
            ),
        },
    ];
    const handleRowClick = (record: any) => {
        setIsLoading(true)
        router.push(`/modules/seller/menus/${record?.id}`);
    };
    return (
        <>
            {contextHolder}
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            <Table dataSource={data} columns={columns} pagination={false} rowKey="id" onRow={(record) => ({
                onClick: () => handleRowClick(record),
            })} />
        </>
    )
}

export default ProductInCategory