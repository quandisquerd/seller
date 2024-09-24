'use client';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useState } from 'react';
import { Option } from "antd/es/mentions";
import TextArea from 'antd/es/input/TextArea';
import { useCreateRestaurantMutation, useRestaurantTypeQuery } from '@/app/api/restaurant';
import { useGetAllDistrictQuery, useGetAllProvinceQuery, useGetAllWardQuery } from '@/app/api/map';
import { decryptMessage } from '@/app/utils/criypto';
import { useRouter } from 'next/navigation';

const FormRegisteRestaurant = () => {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState<any>();
    const [banner, setBanner] = useState<any>();
    const { data } = useRestaurantTypeQuery("")
    const { data: province } = useGetAllProvinceQuery("")
    const [provinceId, setprovinceId] = useState<any>();
    const [provinceName, setprovinceName] = useState<any>();
    const { data: district } = useGetAllDistrictQuery(provinceId);
    const [districtId, setdistrictId] = useState<any>();
    const [districtName, setDistrictName] = useState<any>();
    const { data: ward } = useGetAllWardQuery(districtId);
    const [phone, setPhone] = useState<any>()
    const [desc, setDesc] = useState<any>()
    const [name, setName] = useState<any>()
    const [resType, setResType] = useState<any>()
    const [wardname, setwardname] = useState<any>();
    const [lat, setLat] = useState<any>()
    const [lng, setLng] = useState<any>()
    const [descdetail, setDescdetail] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [createRes] = useCreateRestaurantMutation()
    const handleProvince = (e: any) => {
        const selectedValue = e;
        const selectedProvinceId = selectedValue.split(":")[1];
        setprovinceId(selectedProvinceId);
        const selectedProvinceName = selectedValue.split(":")[0];
        setprovinceName(selectedProvinceName);
    };
    const handleDistrict = (e: any) => {
        const selectedValue = e;
        const selectedDistrictId = selectedValue.split(":")[1];
        setdistrictId(selectedDistrictId);
        const selectedDistrictName = selectedValue.split(":")[0];
        setDistrictName(selectedDistrictName);
    };

    const HandleWard = (e: any) => {
        const selectedValue = e;
        const selectedProvinceName = selectedValue.split(":")[0];
        setwardname(selectedProvinceName);
    };
    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file }: any) {
            if (file.status !== "uploading") {
                setAvatar(file.response.secure_url);
            }
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    const props1: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file }: any) {
            if (file.status !== "uploading") {
                setBanner(file.response.secure_url);
            }
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const HandleClick = () => {
        const data = {
            "user_id": dec?.id,
            "phone": phone,
            "description": desc,
            "name": name,
            "restaurant_type": resType,
            "area": provinceName,
            "address": `${districtName}, ${wardname},${descdetail} `,
            "lat": lat,
            "lng": lng,
            "avatar": avatar,
            "banner": banner,
            "title": title
        }
        console.log(data);
        createRes(data)
            .unwrap()
            .then((res: any) => {
                console.log(res);
                if (res?.status == true) {
                    messageApi.success(res?.message)
                    setTimeout(() => {
                        router.push('/modules/seller')
                    }, 300);
                }
            })
            .catch((error: any) => {
                console.log(error);
                messageApi.error(error?.data?.error)

            })

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {contextHolder}
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <img src="assets/images/logo-light.png" alt="" className="h-6 mx-auto" />
                </div>
                <div className="mt-6">
                    <h5 className="text-red-500 text-2xl">Đăng kí quán mới</h5>
                    <p className="text-gray-600">Bạn chưa có quán đăng ký ngay.</p>
                </div>

                <Form className="mt-4">
                    <Form.Item>
                        <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">Tên quán <span className="text-red-600">*</span></label>
                        <Input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" id="useremail" placeholder="Nhập tên quán" onChange={(e: any) => setName(e?.target?.value)} required />
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">Tiêu đề quán <span className="text-red-600">*</span></label>
                        <Input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" id="useremail" placeholder="Nhập tiêu đề quán" onChange={(e: any) => setTitle(e?.target?.value)} required />
                    </Form.Item>


                    <Form.Item
                        name="image"
                        className="col-md-10"
                        validateTrigger={["onChange", "onBlur"]}
                    >
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Ảnh <span className="text-red-600">*</span></label>
                        {avatar ? <Image src={avatar} style={{ width: '170px', height: "170px" }} /> : <Upload.Dragger {...props} multiple accept=".jpg,.png">
                            <Button icon={<UploadOutlined />}>Ảnh đại diện</Button>
                        </Upload.Dragger>}

                    </Form.Item>
                    <Form.Item
                        name="image"
                        className="col-md-10"
                        validateTrigger={["onChange", "onBlur"]}
                    >
                        {banner ? <Image src={banner} style={{ height: "170px" }} /> : <Upload.Dragger {...props1} multiple accept=".jpg,.png">
                            <Button icon={<UploadOutlined />}>Ảnh bìa</Button>
                        </Upload.Dragger>}

                    </Form.Item>


                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password-input">Khu vực<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn khu vực"
                                onChange={handleProvince}
                            >
                                {province?.results?.map((data: any) => {
                                    return (
                                        <Option
                                            value={`${data?.province_name}:${data?.province_id}`}
                                        >
                                            {data?.province_name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password-input">Địa chỉ<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn Quận/Huyện"
                                onChange={handleDistrict}
                            >
                                {district?.results?.map((data: any) => {
                                    return (
                                        <Option
                                            value={`${data?.district_name}:${data?.district_id}`}
                                        >
                                            {data?.district_name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="relative mt-2">
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn Phường/Xã"
                                onChange={HandleWard}
                            >
                                {ward?.results?.map((data: any) => {
                                    return (
                                        <Option
                                            value={`${data?.ward_name}:${data?.ward_id}`}
                                        >
                                            {data?.ward_name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="relative mt-2">
                            <Input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nhập ngõ/ngách và số nhà" onChange={(e: any) => setDescdetail(e?.target?.value)} required />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password-input">Địa chỉ lat/lng<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <InputNumber className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nhập địa chỉ lat" id="password-input" onChange={(e: any) => setLat(e)} required />
                        </div>
                        <div className="relative">
                            <InputNumber className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nhập địa chỉ lng" id="password-input" onChange={(e: any) => setLng(e)} required />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password-input">Số điện thoại<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <InputNumber className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nhập số điện thoại cố định của quán" id="password-input" onChange={(e: any) => setPhone(e)} required />
                        </div>
                    </Form.Item>


                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password-input">Loại hình<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn loại hình kinh doanh"
                                onChange={(e) => setResType(e)}
                            >
                                {data?.result?.map((item: any) => (
                                    <Option key={item?.id} value={item?.id}>
                                        {item?.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Form.Item>


                    <Form.Item>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password-input">Mô tả<span className="text-red-600">*</span></label>
                        <div className="relative">
                            <TextArea className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nhập mô tả quán" id="password-input" onChange={(e: any) => setDesc(e?.target?.value)} required />
                        </div>
                    </Form.Item>
                    <Button className="w-full mt-4 bg-red-500 text-white hover:bg-green-600" onClick={() => HandleClick()} >Đăng ký</Button>
                </Form>
            </div>
        </div>
    );
};

export default FormRegisteRestaurant;
