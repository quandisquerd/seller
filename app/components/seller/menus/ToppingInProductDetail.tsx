import React from 'react'

const ToppingInProductDetail = ({data, index}:any) => {
    const names = data?.sub_toppings
        ?.filter((data3: any) => data3?.view === true)
        ?.map((data4: any) => data4?.name)
        .join(', ');
    return (
        <div key={data?.id}>
            <div className='p-2 flex'>
                <span>{data?.name}</span>
                {names?.length > 24 ? <span className='ml-auto'>{names.slice(0,24)}...</span> : <span className='ml-auto'>{names}</span> }
            </div>
        </div>

    )
}

export default ToppingInProductDetail