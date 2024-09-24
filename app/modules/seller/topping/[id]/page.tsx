"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LoadingOverlay from '@/app/components/loading/Loading';
import classNames from 'classnames';
import ListSubTopping from '@/app/components/seller/topping/ToppingDetail';
const page = () => {
    const [isLoading, setIsLoading] = useState<any>();
    const router: any = useRouter()
    const HandleBack = () => {
        setIsLoading(true)
        router.push('/modules/seller/menus?tab=2');
    }
    return (
        <div className='ml-40 mr-40 mt-20 mb-20 p-10 bg-white'>
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
                <button type="button" onClick={() => HandleBack()} className='ml-5 mb-5 text-xl text-red-500 mr-5  '><ArrowLeftOutlined className=" mr-2" /></button> <span className="text-xl">Chi tiết nhóm</span>
            </div>
            <ListSubTopping />

        </div>

    )
}

export default page