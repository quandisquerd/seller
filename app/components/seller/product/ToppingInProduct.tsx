import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React, { useState } from 'react'
import { Collapse, Table, Button, Switch } from 'antd';
type Props = {}

const ToppingInProduct = ({ data }: any) => {
    const [value, setValue] = useState(1);
    const [open, setopen] = useState(false)
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const HandleOpenSubtopping = () => {
        setopen(true)
    }
    const columns = [
        {
            title: '',
            dataIndex: '',
            key: '',
            render: () => (
                <Checkbox defaultChecked></Checkbox>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <>
                    <Button icon={< EditOutlined />} className='mr-2'></Button>
                    <Button icon={<DeleteOutlined />}></Button>
                </>
            )
        },
    ];
   
    const onChangeTopping = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    const items: any = data?.map((data: any) => {
        return (
            {
                key: `${data?.id}`,
                label: (
                    <div className="flex items-center justify-between">
                        <span>{data?.name}</span>
                        <Switch defaultChecked onChange={onChangeTopping} />
                    </div>
                ),
                children: (<div className="">
                    <Table dataSource={data?.sub_toppings} columns={columns} pagination={false} />
                    <div className="flex mt-2">
                    <Button className='ml-auto bg-blue-500 text-yellow-50'>Lưu</Button>
                    </div>
                </div>),
            }
        )
    })
    return (
        <div>
            <Collapse items={items} />
        </div>

    )
}

export default ToppingInProduct