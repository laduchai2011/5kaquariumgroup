import { useContext } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProductContext } from '../../context';




const ShoppingCartEdit = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCartEdit component cant undefined !");
    }
    const {
        setShoppingCartEdit
    } = productContext;

    const handleClose = () => {
        setShoppingCartEdit(pre => {
            return {...pre, isShow: false}
        })
    }

    return (
        <div className={style.parent}>
            <div>
                <div><IoClose onClick={() => handleClose()} size={25} title='Đóng' /></div>
                <div>
                    <div>
                        <div>Nhãn</div>
                        <div><input /></div>
                    </div>
                    <div>
                        <div>Ghi chú</div>
                        <div><input /></div>
                    </div>
                </div>
                <div>
                    <div>Đồng ý</div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartEdit;