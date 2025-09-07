import { useContext, useEffect, useState } from 'react';
import style from './style.module.scss';
import { ProductContext } from '../../context';
import { useGetShoppingCartsQuery } from '@src/redux/query/orderRTK';
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";
import { OrderField } from '@src/dataStruct/order';
import Row from './component/Row';





const ShoppingCart = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCart component cant undefined !");
    }
    const {
        setIsShoppingCartCreate,
        setMessage,
        setIsLoading
    } = productContext;
    const [page, setPage] = useState<string>('1');
    const size = '5';
    const [totalCount, setTotalCount] = useState<number>(10);
    const [shoppingCarts, setShoppingCarts] = useState<OrderField[]>([]);

    const {
        data: data_ShoppingCart, 
        // isFetching, 
        isLoading: isLoading_ShoppingCart,
        isError: isError_ShoppingCart, 
        error: error_ShoppingCart
    } = useGetShoppingCartsQuery({page: page, size: size});
    useEffect(() => {
        if (isError_ShoppingCart && error_ShoppingCart) {
            console.error(error_ShoppingCart);
            setMessage({
                message: 'Đã có lỗi xảy ra !',
                type: 'error'
            })
        }
    }, [isError_ShoppingCart, error_ShoppingCart, setMessage])
    useEffect(() => {
        setIsLoading(isLoading_ShoppingCart)
    }, [isLoading_ShoppingCart, setIsLoading])
    useEffect(() => {
        console.log('data_ShoppingCart', data_ShoppingCart)
        if (data_ShoppingCart?.isSuccess && data_ShoppingCart.data) {
            setTotalCount(data_ShoppingCart.data.totalCount)
            setShoppingCarts(data_ShoppingCart.data.items)
        }
    }, [data_ShoppingCart]) 


    const handleNextPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ < handlePageNumber()) {
                return (page_ + 1).toString()
            }
            return pre;  
        })
    }

    const handleBackPage = () => {
        setPage(pre => {
            const page_ = Number(pre);
            if (page_ > 1) {
                return (page_ - 1).toString()
            }
            return pre;  
        })
    }

    const handlePageNumber = () => {
        if (totalCount) {
            const kqn = Math.floor(totalCount / 10);
            const kqd = totalCount % 10;
            let pageNumber = 0;
            if (kqd > 0) {
                pageNumber = kqn + 1;
            } else {
                pageNumber = kqn;
            }
            return pageNumber;
        }
        return 10;
    }

    const handleCreateShoppingCart = () => {
        setIsShoppingCartCreate(true);
    }

    const list_shoppingCart = shoppingCarts.map((item, index) => {
        // return (
        //     <div className={style.row} >
        //         <div className={style.row1}>
        //             <div className={style.rowIndex}>{index}</div>
        //             <div className={style.rowLabel}>{item.label}</div>
        //             <div className={style.rowTotal}>{item.total}</div>
        //             <div className={style.rowNote}>{item.note}</div>   
        //         </div>
        //         <input className={style.rowSelect} type='checkbox' />
        //         <div className={style.rowIcon}>
        //             <FaEdit onClick={() => ShowEdit()} title='Chỉnh sửa' color='green' />
        //         </div>
        //     </div>
        // )
        return <Row data={item} index={index} key={item.id} />
    })

    return (
        <div className={style.parent}>
            <div className={style.header}>Giỏ hàng của bạn</div>
            {shoppingCarts.length > 0 ? <div className={style.main}>
                <div className={style.table}>
                    <div className={`${style.row} ${style.rowHeader}`}>
                        <div className={style.row1}>
                            <div className={style.rowIndex}>Stt</div>
                            <div className={style.rowLabel}>Nhãn</div>
                            <div className={style.rowTotal}>Tổng</div>
                            <div className={style.rowNote}>Chú thích</div>
                        </div>
                    </div>
                    { list_shoppingCart }
                </div>
                <div className={style.controllerContainer}>
                    <div>{`${page} / ${handlePageNumber()}`}</div>
                    <div>
                        <GrFormPrevious onClick={() => handleBackPage()} size={20} />
                        <GrFormNext onClick={() => handleNextPage()} size={20} />
                    </div>
                </div>
            </div> : <div className={style.main1}>Bạn chưa có giỏ hàng nào !</div>}
            <div className={style.buttonContainer}>
                <div onClick={() => handleCreateShoppingCart()}>Tạo giỏ hàng mới</div>
            </div>
        </div>
    )
}

export default ShoppingCart;