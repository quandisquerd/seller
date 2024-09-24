import { Popconfirm, Switch, message } from 'antd'
import React, { useState } from 'react'
import './style.css';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { useGetOneToppingQuery, useRemoveToppingMutation, useUpdateToppingMutation, useUpdateViewSubtoppingInToppingMutation } from '@/app/api/topping';
import LoadingOverlay from '../../loading/Loading';
import FormatTotal from '@/app/utils/FormatTotal';
import AddSuptoppingInTopping from './AddSuptoppingInTopping';

const ListSubTopping = () => {
  const router: any = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const { data, isLoading } = useGetOneToppingQuery(id)
  const [updateView, { isLoading: loadding }] = useUpdateViewSubtoppingInToppingMutation()
  const [updateTopping, { isLoading: loaddingtopping }] = useUpdateToppingMutation()
  const [removeTopping] = useRemoveToppingMutation()
  const [name, setname] = useState<any>()

  if (isLoading) { return <LoadingOverlay /> }
  const HandleView = (e: any, idsub: any) => {
    const data = {
      view: e
    }
    updateView({ id: idsub, data })
      .unwrap()
      .then(() => {
        messageApi.success('update topping successfully!');
      })
      .catch((data: any) => {
        messageApi.open({
          type: "error",
          content: 'update failure',
        });
      });
  }
  const HandleUpdate = () => {
    const datatopping = {
      name: name ? name : data?.data?.name
    }
    updateTopping({ id: id, data: datatopping })
      .unwrap()
      .then(() => {
        messageApi.success('Update topping successfully')
        setTimeout(() => {
          router.push(`/modules/seller/menus?tab=2`);
        }, 500);
      })
      .catch((data: any) => {
        messageApi.open({
          type: "error",
          content: 'update failure',
        });
      });
  }
  const HandleRemove = () => {
    removeTopping(id)
      .unwrap()
      .then(() => {
        messageApi.success('Remove topping successfully')
        setTimeout(() => {
          router.push(`/modules/seller/menus?tab=2`);
        }, 500);
      })
      .catch((data: any) => {
        messageApi.open({
          type: "error",
          content: 'update failure',
        });
      });
  }
  return (
    <>
      {contextHolder}
      <div className='pl-10 pr-10 pt-5 pb-5 bg-gray-100'>
        <div className='p-2 flex'>
          <span>Mã</span>
          <span className='ml-auto'>{data?.data?.id}</span>
        </div>
        <div className='h-px bg-gray-300 mb-1'></div>
        <div className='p-2 flex'>
          <span>Tên<span className='text-red-500'>*</span></span>
          <span className='ml-auto'><input className='w-full border-0 outline-none p-1 bg-gray-100 text-right' defaultValue={data?.data?.name} placeholder='Nhập tên món ăn' onChange={(e: any) => setname(e.target.value)} /></span>
        </div>
      </div>
      <div className=' pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
        <div className='p-2 flex'>
          <span>Món thêm</span>
        </div>
        <div className='h-px bg-gray-300 mb-1'></div>
        {data?.data?.sub_toppings?.map((data1: any) => {
          return (
            <div className='p-2 flex' key={data1?.id}>
              <div className=''>
                <p>{data1?.name}</p>
                <p className='text-gray-400'><FormatTotal amount={data1?.price} /></p>
              </div>
              <span className='ml-auto'><Switch defaultChecked={data1?.view} onChange={(e: any) => HandleView(e, data1?.id)} className='text-green-500 bg-green-500' /></span>

            </div>
          )
        })}
        <div className='h-px bg-gray-300 mb-1'></div>
        <AddSuptoppingInTopping />

      </div>
      <Popconfirm
        title="Xóa nhóm Topping ?"
        description="Bạn có thực sự muốn xóa nhóm Topping này?"
        onConfirm={HandleRemove}
        okText="Đồng ý"
        cancelText="Không"
      >
        <button className=' w-full flex items-center justify-center p-2 border border-gray-600 text-gray-800 rounded'>
          Xóa nhóm Topping
        </button>
      </Popconfirm>

      <button
        onClick={() => HandleUpdate()}
        disabled={name ? false : true}
        className={classNames(
          ' w-full sticky bottom-0 shadow-xl z-50 p-2 bg-red-500 rounded mt-5 text-white',
          // {
          //     'bg-white': !isLoading,
          //     'bg-transparent': isLoading,
          //     'text-black': !isLoading,
          //     'text-gray-500': isLoading
          // }
        )}
      >
        Lưu
      </button>
    </>
  )
}

export default ListSubTopping