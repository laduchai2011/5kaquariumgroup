import { useContext } from 'react';
import style from './style.module.scss';
import { FaEdit } from "react-icons/fa";
import { ProductContext } from '../../context';

const ShoppingCart = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCart component cant undefined !");
    }
    const {
        setShoppingCartEdit
    } = productContext;

    const ShowEdit = () => {
        setShoppingCartEdit(pre => {
            return {...pre, isShow: true}
        })
    }

    return (
        <div className={style.parent}>
            <div>Giỏ hàng của bạn</div>
            <div className={style.table}>
                <div className={`${style.row} ${style.rowHeader}`}>
                    <div className={style.row1}>
                        <div className={style.rowIndex}>Stt</div>
                        <div className={style.rowLabel}>Nhãn</div>
                        <div className={style.rowTotal}>Tổng</div>
                        <div className={style.rowNote}>Chú thích</div>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.row1}>
                        <div className={style.rowIndex}>Stt</div>
                        <div className={style.rowLabel}>label</div>
                        <div className={style.rowTotal}>total</div>
                        <div className={style.rowNote}>note</div>   
                    </div>
                    <input className={style.rowSelect} type='checkbox' />
                    <div className={style.rowIcon}>
                        <FaEdit onClick={() => ShowEdit()} title='Chỉnh sửa' color='green' />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.row1}>
                        <div className={style.rowIndex}>Stt</div>
                        <div className={style.rowLabel}>label</div>
                        <div className={style.rowTotal}>total</div>
                        <div className={style.rowNote}>note</div>   
                    </div>
                    <input className={style.rowSelect} type='checkbox' />
                    <div className={style.rowIcon}>
                        <FaEdit title='Chỉnh sửa' color='green' />
                    </div>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <div>Tạo giỏ hàng mới</div>
            </div>
        </div>
    )
}

export default ShoppingCart;