import React, { memo, useEffect, useState } from 'react';
import './style.css';
import type { OrderField } from '@src/dataStruct/order';
import { useGetAccountWithIdQuery } from '@src/redux/query/accountRTK';
import type { AccountField } from '@src/dataStruct/account';




const Row: React.FC<{data: OrderField, index: number}> = ({data, index}) => {
    const amount = Number(data.amount)
    const fishCodeInProduct = Number(data.fishCodeInProduct)
    const price = Number(data.price)
    const discount = Number(data.discount)
    const fishAmount = amount * fishCodeInProduct
    const money = amount * price * (1 - discount/100)
    const sellerId = data.sellerId;
    const customerId = data.userId;
    const [seller, setSeller] = useState<AccountField | undefined>(undefined)
    const [customer, setCustomer] = useState<AccountField | undefined>(undefined)
 

    const {
        data: data_seller, 
        // isFetching, 
        // isLoading: isLoading_seller,
        isError: isError_seller, 
        error: error_seller
    } = useGetAccountWithIdQuery({id: sellerId.toString()});
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

    const {
        data: data_customer, 
        // isFetching, 
        // isLoading: isLoading_customerr,
        isError: isError_customer, 
        error: error_customer
    } = useGetAccountWithIdQuery({id: customerId.toString()});
    useEffect(() => {
        if (isError_customer && error_customer) {
            console.error(error_customer);
         
        }
    }, [isError_customer, error_customer])
    // useEffect(() => {
    //     setIsLoading(isLoading_customer)
    // }, [isLoading_customer])
    useEffect(() => {
        setCustomer(data_customer)
    }, [data_customer]) 

    return (
        <div className='Order_Table_Row'>
            <div className='Order_Table_Row-index'>{index}</div>
            <div className='Order_Table_Row-image'><img src={data.image} /></div>
            <div className='Order_Table_Row-name'>{data.name}</div>
            <div className='Order_Table_Row-size'>{data.size}</div>
            <div className='Order_Table_Row-amount'>{data.amount}</div>
            <div className='Order_Table_Row-fishCodeInProduct'>{data.fishCodeInProduct}</div>
            <div className='Order_Table_Row-fishAmount'>{fishAmount}</div>
            <div className='Order_Table_Row-money'>{money}</div>
            <div className='Order_Table_Row-seller'>{`${seller?.firstName} ${seller?.lastName}`}</div>
            <div className='Order_Table_Row-customer'>{`${customer?.firstName} ${customer?.lastName}`}</div>
            <div className='Order_Table_Row-title'>{data.title}</div>
        </div>
    )
};


export default memo(Row);