import { useEffect, useState, memo, useMemo, useCallback } from 'react';
import style from './style.module.scss';
// import { ProductContext } from '../../context';
import { useGetShoppingCartsQuery } from '@src/redux/query/orderRTK';
import { GrFormNext, GrFormPrevious  } from "react-icons/gr";
import { OrderField } from '@src/dataStruct/order';
import Row from './component/Row';
import Create from './component/Create';
import Edit from './component/Edit';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';




const ShoppingCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<string>('1');
    const size = '5';
    const [totalCount, setTotalCount] = useState<number>(10);
    const [shoppingCarts, setShoppingCarts] = useState<OrderField[]>([]);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<OrderField | undefined>(undefined) 

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
            dispatch(set_message({
                message: 'Đã có lỗi xảy ra !',
                type: 'error'
            }))
        }
    }, [dispatch, isError_ShoppingCart, error_ShoppingCart])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_ShoppingCart))
    }, [dispatch, isLoading_ShoppingCart])
    useEffect(() => {
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
            const kqn = Math.floor(totalCount / Number(size));
            const kqd = totalCount % Number(size);
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


    const handleShowEdit = useCallback((data: OrderField) => {
        setIsEdit(true)
        setDataEdit(data)
    }, []);
    const handleCloseEdit = useCallback(() => {
        setIsEdit(false)
    }, []);

    const handleShowCreate = useCallback(() => {
        setIsCreate(true)
    }, []);
    const handleCloseCreate = useCallback(() => {
        setIsCreate(false);
    }, []);

    const list_shoppingCart = useMemo(() => {
        return shoppingCarts.map((item, index) => (
            <Row 
                data={item} 
                index={index} 
                key={item.id} 
                onShowEdit={handleShowEdit} 
            />
        ));
    }, [shoppingCarts, handleShowEdit]);

    return (
        <div className={style.parent}>
            {isCreate && <Create onClose={() => handleCloseCreate()} />}
            {isEdit && <Edit data={dataEdit} onClose={() => handleCloseEdit()} />}
            <div className={style.header}>Giỏ hàng của bạn</div>
            {shoppingCarts.length > 0 ? <div className={style.main}>
                <div className={style.table}>
                    <div className={`${style.row} ${style.rowHeader}`}>
                        <div className={style.row1}>
                            <div className={style.rowIndex}>Stt</div>
                            <div className={style.rowLabel}>Nhãn</div>
                            <div className={style.rowTotal}>Tổng (VND)</div>
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
                <div onClick={() => handleShowCreate()}>Tạo giỏ hàng mới</div>
            </div>
        </div>
    )
}

export default memo(ShoppingCart);