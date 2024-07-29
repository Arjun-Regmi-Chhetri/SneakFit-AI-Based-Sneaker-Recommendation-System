import React from 'react'

import {useOrder} from "../../context/OrderContext"

const UserOrder = () => {
    const {order} = useOrder()

    

  return (
    <div className='w-full ml-10'>
      <div className='myorder w-9/12'>
          <h3 className="text-2xl font-bold text-left">My Order</h3>
      </div>
      <div>
        {
            order.map((item)=>(
                <div key={item.orderId} className='bg-gray-100  py-3 my-8'>

                  <div className='pb-3 border-b-2 px-5'>
                    <p className='mb-2'>Order <span className='text-blue-500'>#{item.orderId}</span></p>
                    <p>Placed On {' '}
                    {(() => {
                                const date = new Date(item.orderDate);

                                const options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                };

                                return date.toLocaleString("en-US", options);
                            })()}</p>
                  </div>
                  <div className='p-5'>
                    <div className='flex items-start space-x-10'>
                      <div className='h-20 w-20 border border-slate-800 rounded-md'>
                        <img src={`/src/assets/product/${item.product.productImage}`} alt="" />
                      </div>
                      <div className='w-60'>
                      {item.product.productName}
                      </div>
                      <div className='text-gray-400'>
                        Qty : <span className='text-slate-900 font-semibold'> {item.quantity}</span>
                      </div>
                      <div className='text-gray-400'>
                        Size : <span className='text-slate-900 font-semibold'> {item.size.sizeName}</span>
                      </div>

                      <div className='text-gray-400'>
                        SubTotal : <span className='text-slate-900 font-semibold'>$. {item.totalPrice}</span>
                      </div>

                    </div>
                  
                  </div>
                  
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default UserOrder
