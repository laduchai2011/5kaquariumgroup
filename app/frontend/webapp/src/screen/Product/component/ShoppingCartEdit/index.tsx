import { useContext, useState, memo } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProductContext } from '../../context';
import { useEditShoppingCartMutation } from '@src/redux/query/orderRTK';
import { OrderField } from '@src/dataStruct/order';




const ShoppingCartEdit = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCartEdit component cant undefined !");
    }
    const {
        shoppingCartEdit,
        setShoppingCartEdit,
        setIsLoading,
        setMessage
    } = productContext;
    const [shoppingCart, setShoppingCart] = useState<OrderField | undefined>(shoppingCartEdit.shoppingCart)
    const [editShoppingCart] = useEditShoppingCartMutation()

    const handleClose = () => {
        setShoppingCartEdit(pre => {
            return {...pre, isShow: false}
        })
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;

        if (shoppingCart) {
            switch(field) { 
                case 'label': { 
                    setShoppingCart({...shoppingCart, label: value})
                    break; 
                } 
                case 'note': { 
                    setShoppingCart({...shoppingCart, note: value})
                    break; 
                } 
                default: { 
                    break; 
                } 
            } 
        }
    }

    const handleEdit = () => {
        if (shoppingCart) {
            const shoppingCart_cp = {...shoppingCart}
            shoppingCart_cp.label = shoppingCart_cp.label.trim();
            shoppingCart_cp.note = shoppingCart_cp.note.trim();

            setIsLoading(true);
            editShoppingCart(shoppingCart_cp)
            .then(res => {
                if (res.data?.isSuccess) {
                    setMessage({
                        message: 'Thay đổi giỏ hàng thành công !',
                        type: 'success'
                    })
                    setShoppingCartEdit({...shoppingCartEdit, isShow: false});
                } else {
                    console.error(res.data?.err)
                    setMessage({
                        message: 'Đã có lỗi xảy ra !',
                        type: 'error'
                    })
                }
            })
            .catch((err) => {
                console.error(err);
                setMessage({
                    message: 'Đã có lỗi xảy ra !',
                    type: 'error'
                })
            })
            .finally(() => setIsLoading(false))
        }
    }

    return (
        <div className={style.parent}>
            <div>
                <div><IoClose onClick={() => handleClose()} size={25} title='Đóng' /></div>
                <div>
                    <div>
                        <div>Nhãn</div>
                        <div><input value={shoppingCart?.label} onChange={(e) => handleChange(e, 'label')} /></div>
                    </div>
                    <div>
                        <div>Ghi chú</div>
                        <div><input value={shoppingCart?.note} onChange={(e) => handleChange(e, 'note')} /></div>
                    </div>
                </div>
                <div>
                    <div onClick={() => handleEdit()}>Đồng ý</div>
                </div>
            </div>
        </div>
    )
}

export default memo(ShoppingCartEdit);