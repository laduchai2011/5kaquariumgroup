import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { OrderContext } from '@src/screen/Order/context';
import Row from './component/Row';
import { useGetAllOrderProductsInOrderQuery } from '@src/redux/query/orderRTK';
import type { OrderProductField } from '@src/dataStruct/order';



const ListProduct: React.FC = () => {
    const orderContext = useContext(OrderContext)
    if (!orderContext) {
        throw new Error("orderContext in ListProduct component cant undefined !");
    }
    const {
        selectedOrder,
        setIsLoading
    } = orderContext;
    
    const [allProducts, setAllProducts] = useState<OrderProductField[]>([])

    const {
        data: data_allProducts, 
        // isFetching, 
        isLoading: isLoading_allProducts,
        isError: isError_allProducts, 
        error: error_allProducts
    } = useGetAllOrderProductsInOrderQuery({orderId: selectedOrder?.id.toString() || '-1'});
    useEffect(() => {
        if (isError_allProducts && error_allProducts) {
            console.error(error_allProducts);
        }
    }, [isError_allProducts, error_allProducts])
    useEffect(() => {
        setIsLoading(isLoading_allProducts);
    }, [setIsLoading, isLoading_allProducts])
    useEffect(() => {
        if (data_allProducts?.isSuccess && data_allProducts.data) {
            setAllProducts(data_allProducts.data)
        } else {
            setAllProducts([])
        }
    }, [data_allProducts]) 


    const list_orderProduct = allProducts.map((data, key) => {
        return (
            <Row data={data} index={key} key={data.id} />
        )
    })

    return (
        <div className="Order_ListProduct">
            <div>
                <div className='Order_ListProduct-row'>
                    <div className='Order_ListProduct-row-index Order_ListProduct-row-header'>Stt</div>
                    <div className='Order_ListProduct-row-image Order_ListProduct-row-header'>Hình ảnh</div>
                    <div className='Order_ListProduct-row-name Order_ListProduct-row-header'>Tên</div>
                    <div className='Order_ListProduct-row-size Order_ListProduct-row-header'>Kích thước</div>
                    <div className='Order_ListProduct-row-amount Order_ListProduct-row-header'>Số lượng</div>
                    <div className='Order_ListProduct-row-fishCodeInProduct Order_ListProduct-row-header'>FIP</div>
                    <div className='Order_ListProduct-row-fishAmount Order_ListProduct-row-header'>Số lượng cá</div>
                    <div className='Order_ListProduct-row-money Order_ListProduct-row-header'>Tiền</div>
                    <div className='Order_ListProduct-row-isPay Order_ListProduct-row-header'>Thanh toán</div>
                    <div className='Order_ListProduct-row-seller Order_ListProduct-row-header'>Người bán</div>
                    {/* <div className='Order_ListProduct-row-customer Order_ListProduct-row-header'>Khách hàng</div> */}
                    <div className='Order_ListProduct-row-title Order_ListProduct-row-header'>Tiêu đề</div>
                </div>
                { list_orderProduct }
            </div>
        </div>
    );
};

export default ListProduct;
