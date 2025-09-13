import React, { memo, useEffect, useState } from 'react';
import './style.css';
import type { OrderProductField } from '@src/dataStruct/order';
import { useGetAccountWithIdQuery } from '@src/redux/query/accountRTK';
import type { AccountField } from '@src/dataStruct/account';




const Row: React.FC<{data: OrderProductField, index: number}> = ({data, index}) => {
    console.log(111111, data)
    const amount = Number(data.amount)
    const fishCodeInProduct = Number(data.fishCodeInProduct)
    const price = Number(data.price)
    const discount = Number(data.discount)
    const fishAmount = amount * fishCodeInProduct
    const money = amount * price * (1 - discount/100)
    const sellerId = data.sellerId;
    // const customerId = data.userId;
    const [seller, setSeller] = useState<AccountField | undefined>(undefined)
    // const [customer, setCustomer] = useState<AccountField | undefined>(undefined)
 

    const {
        data: data_seller, 
        // isFetching, 
        // isLoading: isLoading_seller,
        isError: isError_seller, 
        error: error_seller
    } = useGetAccountWithIdQuery({id: sellerId?.toString() || '-1'});
    useEffect(() => {
        if (isError_seller && error_seller) {
            console.error(error_seller);
         
        }
    }, [isError_seller, error_seller])
    // useEffect(() => {
    //     setIsLoading(isLoading_seller)
    // }, [isLoading_seller])
    useEffect(() => {
        setSeller(data_seller)
    }, [data_seller]) 

    // const {
    //     data: data_customer, 
    //     // isFetching, 
    //     // isLoading: isLoading_customerr,
    //     isError: isError_customer, 
    //     error: error_customer
    // } = useGetAccountWithIdQuery({id: customerId.toString()});
    // useEffect(() => {
    //     if (isError_customer && error_customer) {
    //         console.error(error_customer);
         
    //     }
    // }, [isError_customer, error_customer])
    // // useEffect(() => {
    // //     setIsLoading(isLoading_customer)
    // // }, [isLoading_customer])
    // useEffect(() => {
    //     setCustomer(data_customer)
    // }, [data_customer]) 

    return (
        <div className='Order_ListOrder_Row'>
            <div className='Order_ListOrder_Row-index'>{index}</div>
            <div className='Order_ListOrder_Row-image'><img src={data.image} /></div>
            <div className='Order_ListOrder_Row-name'>{data.name}</div>
            <div className='Order_ListOrder_Row-size'>{data.size}</div>
            <div className='Order_ListOrder_Row-amount'>{data.amount}</div>
            <div className='Order_ListOrder_Row-fishCodeInProduct'>{data.fishCodeInProduct}</div>
            <div className='Order_ListOrder_Row-fishAmount'>{fishAmount}</div>
            <div className='Order_ListOrder_Row-money'>{money}</div>
            <div className='Order_ListOrder_Row-isPay'>Chưa thanh toán</div>
            {seller ? <div className='Order_ListOrder_Row-seller'>{`${seller?.firstName} ${seller?.lastName}`}</div>:<div className='Order_ListOrder_Row-seller'>Không có người bán</div>}
            {/* <div className='Order_ListOrder_Row-customer'>1111111</div> */}
            <div className='Order_ListOrder_Row-title'>{data.title}</div>
        </div>
    )
};


export default memo(Row);