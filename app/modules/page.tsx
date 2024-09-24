'use client';
import React, { useEffect, useState } from 'react'
import { decryptMessage } from '../utils/criypto';
import { useCheckRestaurantQuery } from '../api/restaurant';
import { useRouter } from 'next/navigation';
import { ShopOutlined } from '@ant-design/icons';
import LoadingOverlay from '../components/loading/Loading';

const page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<any>(false)
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const { data } = useCheckRestaurantQuery(dec?.id)

    const [checkRestaurant, setCheckRestaurant] = useState(false)
    useEffect(() => {
        if (data?.status == true) {
            setLoading(true)
            router.push("/modules/seller")
        } else {
            setCheckRestaurant(true)
        }
    }, [data?.status])

    const HandleClick = () => {
        setLoading(true)
        router.push("/modules/registerrestaurant")
    }


    return (
        <div>
            {loading && <LoadingOverlay />}
            {checkRestaurant ?
                <>
                    <div className="flex flex-col items-end justify-center ">
                        <button className='border border-red-400 p-2 mt-2 mr-2 text-red-500 rounded' onClick={() => HandleClick()}>+ Tạo quán mới</button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-screen">
                        <ShopOutlined className='text-8xl text-red-500' />
                        <p className="mt-2">Không có quán nào</p>
                    </div>
                </>
                : ""}
        </div>
    )
}

export default page