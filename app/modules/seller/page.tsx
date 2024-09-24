'use client';
import 'remixicon/fonts/remixicon.css';
import { useGetAllProductQuery } from '@/app/api/product'
import { BankOutlined, FileTextOutlined, FormOutlined, LoadingOutlined, QuestionCircleOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/app/components/loading/Loading';
import { useGetRestaurantUserQuery } from '@/app/api/restaurant';
import { decryptMessage } from '@/app/utils/criypto';
type Props = {}

const page = (props: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const router: any = useRouter()
    const [isLoading, setIsLoading] = useState<any>();
    const [loading, setLoading] = useState<any>(false)
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const { data: restaurant } = useGetRestaurantUserQuery(dec?.token)
    useEffect(() => {
        if (restaurant?.status == true) {
            
        } else {
            setLoading(true)
            router.push("/modules")
        }
    }, [restaurant?.status])
    const onChangProduct = () => {
        setIsLoading(true)
        router.push('seller/product');
    }
    const onChangMenu = () => {
        setIsLoading(true)
        router.push('/modules/seller/menus');
    }
    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header flex bg-gray-200">
                            <div className="relative ms-sm-3 bg-gray-200 p-2 flex items-center justify-center">
                                <button
                                    type="button"
                                    className="btn"
                                    id="page-header-user-dropdown"
                                >
                                    <span className="flex items-center h-auto text-center">
                                        {restaurant?.data?.name} - {restaurant?.data?.title}
                                    </span>
                                </button>
                            </div>
                            <div className="relative ms-sm-3 ml-auto bg-gray-200 p-2">
                                <button
                                    type="button"
                                    className="btn"
                                    id="page-header-user-dropdown"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="flex items-center">
                                        <div className="rounded-full bg-white p-4 w-12 h-12 flex items-center justify-center">
                                            <i className="ri-user-line text-xl"></i>
                                        </div>


                                    </span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg mr-2">
                                        <h6 className="px-4 py-2 font-semibold text-gray-700">
                                            Welcome Anna!
                                        </h6>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile.html">
                                            <i className="mdi mdi-account-circle text-muted text-lg mr-1"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="apps-chat.html">
                                            <i className="mdi mdi-message-text-outline text-muted text-lg mr-1"></i>
                                            Messages
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="apps-tasks-kanban.html">
                                            <i className="mdi mdi-calendar-check-outline text-muted text-lg mr-1"></i>
                                            Taskboard
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-faqs.html">
                                            <i className="mdi mdi-lifebuoy text-muted text-lg mr-1"></i>
                                            Help
                                        </a>
                                        <div className="border-t border-gray-200 my-2"></div>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile.html">
                                            <i className="mdi mdi-wallet text-muted text-lg mr-1"></i>
                                            Balance : <b>$5971.67</b>
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile-settings.html">
                                            <span className="badge bg-green-100 text-green-600 float-end mt-1">New</span>
                                            <i className="mdi mdi-cog-outline text-muted text-lg mr-1"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="auth-lockscreen-basic.html">
                                            <i className="mdi mdi-lock text-muted text-lg mr-1"></i>
                                            Lock screen
                                        </a>
                                        <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100" href="auth-logout-basic.html">
                                            <i className="mdi mdi-logout text-muted text-lg mr-1"></i>
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="">
                                <div className="min-h-screen flex justify-center items-center">
                                    <div className="w-full lg:w-4/5 ">

                                        <div className="flex flex-wrap justify-around gap-5">
                                            <div className="lg:w-1/4">
                                                <button className="card shadow-none border w-full" onClick={() => alert('Đơn hàng clicked')}>
                                                    <div className="card-body text-center flex flex-col justify-center items-center">
                                                        <div className="avatar-md mx-auto mb-4 mt-7" id="register-tour">
                                                            <div className="w-20 h-20 flex items-center justify-center rounded-full text-primary text-3xl bg-red-500">
                                                                <i className="ri-file-list-3-line text-white"></i>
                                                            </div>
                                                        </div>
                                                        <h5 className='mb-5'>Đơn hàng</h5>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="lg:w-1/4">
                                                <button className="card shadow-none border w-full" onClick={() => alert('Đánh giá clicked')}>
                                                    <div className="card-body text-center flex flex-col justify-center items-center">
                                                        <div className="avatar-md mx-auto mb-4 mt-7" id="register-tour">
                                                            <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full text-primary text-3xl">
                                                                <i className="ri-star-line text-yellow-500"></i>
                                                            </div>
                                                        </div>
                                                        <h5 className='mb-5'>Đánh giá</h5>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="lg:w-1/4">
                                                <button className="card shadow-none border w-full" onClick={() => onChangMenu()}>
                                                    <div className="card-body text-center flex flex-col justify-center items-center">
                                                        <div className="avatar-md mx-auto mb-4 mt-7" id="register-tour">
                                                            <div className="w-20 h-20 flex items-center justify-center bg-red-500 rounded-full text-primary text-3xl">
                                                                <i className="ri-file-edit-line text-white"></i>
                                                            </div>
                                                        </div>
                                                        <h5 className='mb-5'>Thực đơn</h5>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>
                    <button onClick={() => onChangProduct()}>
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center'>
                                <FileTextOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Đơn hàng</span>
                        </div>
                    </button>
                </div>

                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center' style={{ flexShrink: 0 }}>
                                <StarOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Đánh giá</span>
                        </div>
                    </Link>

                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <button onClick={() => onChangMenu()}>
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <FormOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Thực đơn</span>
                        </div>
                    </button>
                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 , borderRadius:'5px'}}>
                                <QuestionCircleOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Trung tâm trợ giúp</span>
                        </div>
                    </Link>
                </div>
                <div className='pl-15' style={{ marginLeft: "15px" }}>
                    <Link href="/modules/seller/product" >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <BankOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Học viện</span>
                        </div>
                    </Link>
                </div>
                <div className='pl-5' style={{ marginLeft: "15px" }}>
                    <button >
                        <div className='flex items-center justify-center'>
                            <div className='inline-flex items-center justify-center border rounded-lg border-gray-300 bg-red-500' style={{ flexShrink: 0 }}>
                                <TeamOutlined style={{ fontSize: '60px', padding: '5px', background: 'red', borderRadius: '5px', color: 'white' }} />
                            </div>

                        </div>
                        <div className='ml-2'>
                            <span className='text-xl'>Quản lý nhân viên</span>
                        </div>
                    </button>
                </div>
            </div> */}
        </>
    )
}

export default page