import { FC, useState, memo } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { useCreateShoppingCartMutation } from '@src/redux/query/orderRTK';
import { OrderField } from '@src/dataStruct/order';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';




const Create: FC<{onClose: () => void}> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
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
        onClose()
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
        
        dispatch(set_isLoading(true))
        createShoppingCart(shoppingCart_cp)
        .then(res => {
            if (res.data?.isSuccess) {
                dispatch(set_message({
                    message: 'Tạo giỏ hàng thành công !',
                    type: 'success'
                }))
                onClose()
            } else {
                console.error(res.data?.err)
                dispatch(set_message({
                    message: 'Đã có lỗi xảy ra !',
                    type: 'error'
                }))
            }
        })
        .catch((err) => {
            console.error(err);
            dispatch(set_message({
                message: 'Đã có lỗi xảy ra !',
                type: 'error'
            }))
        })
        .finally(() => dispatch(set_isLoading(false)))
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

export default memo(Create);