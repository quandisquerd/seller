'use client';

import { useRegisterSerlerMutation, useSetPasswordMutation, useVerifyOtpSerlerMutation } from '@/app/api/auth';
import { encryptMessage } from '@/app/utils/criypto';
import { Button, Form, Input, Modal, message } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { InputOTP } from 'antd-input-otp';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/app/components/loading/Loading';


const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter()
    const [register, { isLoading: loadingRegister }] = useRegisterSerlerMutation()
    const [setPassword, { isLoading: loadingSetPass }] = useSetPasswordMutation()
    const [verify, { isLoading: loadingVerify }] = useVerifyOtpSerlerMutation()
    const [email, setemail] = useState<any>()
    const [password, setpassword] = useState<any>()
    const [counter, setCounter] = useState(300);
    const [isCounting, setIsCounting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkotp, setCheckotp] = useState(false);

    useEffect(() => {
        let timer: any = 0;
        if (isCounting && counter > 0) {
            timer = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        } else if (counter === 0) {
            setIsCounting(false);
        }
        return () => clearInterval(timer);
    }, [isCounting, counter]);
    const formatTime = (timeInSeconds: any) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const HandleRegister = () => {
        const data_endcrypt = encryptMessage({ "email": email })
        const data = {
            "data": data_endcrypt
        }
        register(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsCounting(true);
                    setIsModalOpen(true)
                    messageApi.success(res?.message);
                } else {
                    messageApi.error(res?.data?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })

    }
    const handleFinish = (otp: any) => {
        const resultString = otp.join('')
        const data_endcrypt = encryptMessage({ "email": email, "otp": resultString })
        const data = {
            "data": data_endcrypt
        }
        verify(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsModalOpen(false);
                    setCheckotp(true)
                    messageApi.success(res?.message);
                } else {
                    messageApi.error(res?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })
    };
    const onFinish = () => {
        const data_endcrypt = encryptMessage({ "email": email, "password": password })
        const data = {
            "data": data_endcrypt
        }
        setPassword(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsModalOpen(false);
                    setCheckotp(true)
                    messageApi.success(res?.message);
                    setTimeout(() => {
                        router.push('/')
                    }, 300);

                } else {
                    messageApi.error(res?.data?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })

    }
    return (
        <>
            {loadingRegister && <LoadingOverlay />}
            {loadingSetPass && <LoadingOverlay />}
            {loadingVerify && <LoadingOverlay />}
            {contextHolder}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    className='w-1/4'
                >
                    <Form.Item
                        label="Email"
                        name="eamil"
                        rules={[{ required: true, message: 'Please input your email!' }]}

                    >
                        {checkotp ? <Input className='w-3/4' onChange={(e: any) => setemail(e?.target?.value)} /> : <>
                            {isCounting ? <div className='flex w-full'>
                                < Input className='w-3/4' onChange={(e: any) => setemail(e?.target?.value)} />
                                <Button type="primary" className='ml-2 w-1/4' >{formatTime(counter)}</Button>
                            </div> : <div className='flex w-full'>
                                <Input className='w-3/4' onChange={(e: any) => setemail(e?.target?.value)} />
                                <Button type="primary" className='ml-2 w-1/4' onClick={() => HandleRegister()}>Gửi OTP</Button>
                            </div>}
                        </>}

                    </Form.Item>


                    <Modal
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <InputOTP inputType="numeric" autoSubmit={handleFinish} />
                    </Modal>
                    {checkotp ? <><Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className='w-3/4' onChange={(e: any) => setpassword(e?.target?.value)} />
                    </Form.Item>

                    </> : ""}



                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default Register