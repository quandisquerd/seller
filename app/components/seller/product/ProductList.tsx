'use client';
import { useGetAllProductQuery } from '@/app/api/product'
import React from 'react'
import ToppingInProduct from './ToppingInProduct';
import { Spin } from 'antd';

type Props = {}

const ProductList = (props: Props) => {
  const { data, isLoading} = useGetAllProductQuery(0)
  if (isLoading) {
    return (
      <div className="overlay">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div>{data?.results?.data.map((data:any,index:any)=>{
      return (
        <div className="border border-gray-500 p-10" key={index}>
          <h1>name: {data?.name}</h1>
          <h5>price: {data?.price}</h5>
          <p>description: {data?.description}</p>
          <span><ToppingInProduct data={data?.toppings} /></span>
        </div>
      )
    })}</div>
  )
}

export default ProductList