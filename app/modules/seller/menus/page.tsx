"use client"
import LoadingOverlay from "@/app/components/loading/Loading";
import Category from "@/app/components/seller/menus/Category";
import ProductList from "@/app/components/seller/product/ProductList";
import { ArrowLeftOutlined, LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import classNames from 'classnames';
import { Tabs } from "antd";
import ListTopping from "@/app/components/seller/topping/ListTopping";
import './style.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryPage() {
    const [isLoading, setIsLoading] = useState<any>();
    const router: any = useRouter()
    const searchParams = useSearchParams();
    const defaultActiveKey = searchParams.get('tab') || '1';
    const HandleBack = () => {
        setIsLoading(true)
        router.push('/modules/seller');
    }
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: any = [
        {
            key: '1',
            label: 'Món',
            children: (
                <Category />
            )
        },
        {
            key: '2',
            label: 'Nhóm Topping',
            children: (
                <ListTopping />
            )
        }
    ];
    return (
        <div className='ml-40 mr-40 mt-20 p-10 bg-white'>
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            <div className={classNames(
                'sticky top-0  shadow-xl mb-5 pt-5 z-50',
                {
                    'bg-white': !isLoading,
                    'bg-transparent': isLoading
                }
            )}>
                <button onClick={() => HandleBack()} className='ml-5 mb-5 text-xl text-red-500 mr-5'><ArrowLeftOutlined className="mr-2" /></button> <span className="text-xl">Thực đơn</span>
            </div>
            <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} className="w-full custom-tabs" />
        </div>
    );
}
