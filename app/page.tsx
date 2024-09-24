'use client';
import './globals.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LoadingOverlay from './components/loading/Loading';
import Link from 'next/link';
import { encryptMessage } from './utils/criypto';
import { useLoginMutation } from './api/auth';
import Cookies from 'js-cookie';

export default function Home() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<any>();
    const [login, { isLoading: loadinLogin }] = useLoginMutation()
    const onFinish: any = (values: any) => {
        const data_endcrypt = encryptMessage({ "email": values?.email, "password": values?.password })
        const data = {
            "data": data_endcrypt
        }
        login(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    messageApi.success(res?.message);
                    setIsLoading(true)
                    localStorage.setItem("user", JSON.stringify(res?.data))
                    Cookies.set('auth', res?.data, { expires: 365 });
                    setTimeout(() => {
                        router.push('/modules');
                    }, 300);

                } else {
                    messageApi.error(res?.data?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })
    };

    const onFinishFailed: any = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            {loadinLogin && <LoadingOverlay />}
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                        className='w-full'
                    >
                        <div className=''>
                            Bạn chưa có tài khoản? <Link href="/register"> Đăng kí! </Link>
                        </div>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>


    );
}