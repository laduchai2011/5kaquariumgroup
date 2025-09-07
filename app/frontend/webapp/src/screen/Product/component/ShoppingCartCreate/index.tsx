import { useContext, useState } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProductContext } from '../../context';
import { useCreateShoppingCartMutation } from '@src/redux/query/orderRTK';
import { OrderField } from '@src/dataStruct/order';




const ShoppingCartCreate = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShoppingCartEdit component cant undefined !");
    }
    const {
        setIsLoading,
        setMessage,
        setIsShoppingCartCreate
    } = productContext;
    const [createShoppingCart] = useCreateShoppingCartMutation();
    const [shoppingCart, setShoppingCart] = useState<OrderField>({
        id: -1,
        label: '',
        total: '0',
        note: '',
        status: '',
        userId: -1,
        updateTime: '',
        createTime: ''
    })

    const handleClose = () => {
        setIsShoppingCartCreate(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;

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

    const handleCreate = () => {
        const shoppingCart_cp = {...shoppingCart}
        shoppingCart_cp.label = shoppingCart_cp.label.trim();
        shoppingCart_cp.note = shoppingCart_cp.note.trim();
        setIsLoading(true);
        createShoppingCart(shoppingCart_cp)
        .then(res => {
            if (res.data?.isSuccess) {
                setMessage({
                    message: 'Tạo giỏ hàng thành công !',
                    type: 'success'
                })
                setIsShoppingCartCreate(false);
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

    return (
        <div className={style.parent}>
            <div>
                <div><IoClose onClick={() => handleClose()} size={25} title='Đóng' /></div>
                <div>
                    <div>
                        <div>Nhãn</div>
                        <div><input value={shoppingCart.label} onChange={(e) => handleChange(e, 'label')} /></div>
                    </div>
                    <div>
                        <div>Ghi chú</div>
                        <div><input value={shoppingCart.note} onChange={(e) => handleChange(e, 'note')} /></div>
                    </div>
                </div>
                <div>
                    <div onClick={() => handleCreate()}>Tạo</div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartCreate;