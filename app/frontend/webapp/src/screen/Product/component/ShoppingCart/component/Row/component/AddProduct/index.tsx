import { FC, memo, useState, useContext, useEffect } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { ProductContext } from '@src/screen/Product/context';
import { OrderField, OrderProductField } from '@src/dataStruct/order';
import { isNumber } from '@src/utility/string';
import { useAddProductToShoppingCartMutation } from '@src/redux/query/orderRTK';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';





const AddProduct: FC<{shoppingCart: OrderField, onClose: () => void}> = ({ shoppingCart, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in ShippingCart-Row-AddProduct component cant undefined !");
    }
    const {
        product,
    } = productContext;

    const [orderProduct, setOrderProduct] = useState<OrderProductField>({
        id: -1,
        title: '',
        image: '',
        name: '',
        size: '',
        amount: '0',
        discount: '',
        fishCodeInProduct: '',
        price: '',
        status: '',
        orderId: shoppingCart.id,
        productId: -1,
        sellerId: 1,
        updateTime: '',
        createTime: '',
    });
    const [moneyTotal, setMoneyTotal] = useState({
        old: 0,
        new: 0
    })
    const [msg, setMsg] = useState<string>('');
    const [amount, setAmount] = useState<string>('0');
    const [addProductToShoppingCart] = useAddProductToShoppingCartMutation()

    useEffect(() => {
        if (product) {
            setOrderProduct({
                id: -1,
                title: product.title,
                image: product.image,
                name: product.name,
                size: product.size,
                amount: '0',
                discount: product.discount,
                fishCodeInProduct: product.fishCodeInProduct,
                price: product.price,
                status: '',
                orderId: shoppingCart.id,
                productId: product.id,
                sellerId: null,
                updateTime: '',
                createTime: '',
            })
        }
    }, [product, shoppingCart.id])

    const handleAddAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMsg('');
        if (!isNumber(value)) {
            setMsg('Số lượng phải là 1 số !');
        } else {
            handleMoney(value);
            setOrderProduct({...orderProduct, amount: value});
        }
        setAmount(value);
    }

    const handleMoney = (amount: string) => {
        const discount = product?.discount;
        const price = product?.price;
        if (amount && discount && price) {
            const amount_number = Number(amount);
            const discount_number = Number(discount);
            const price_number = Number(price);

            const oldTotal = amount_number * price_number;
            const discountTotal = oldTotal * (discount_number / 100);
            const newTotal = oldTotal - discountTotal;

            setMoneyTotal({
                old: oldTotal,
                new: newTotal
            })
        }
    }

    const handleClose = () => {
       onClose()
    }

    const handleAddProduct = () => {
        const orderProduct_cp = {...orderProduct}
        orderProduct_cp.amount = orderProduct_cp.amount.trim()

        dispatch(set_isLoading(true))
        addProductToShoppingCart(orderProduct_cp)
        .then(res => {
            if (res.data && res.data.isSuccess) {
                dispatch(set_message({
                    message: `Thêm sản phẩm vào giỏ hàng có nhãn (${shoppingCart.label})  thành công !`,
                    type: 'success'
                }))
                onClose()
            } else {
                dispatch(set_message({
                    message: 'Thêm sản phẩm vào giỏ hàng KHÔNG thành công !',
                    type: 'success'
                }))
            }
        })
        .catch(err => {
            console.error(err);
            dispatch(set_message({
                message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng !',
                type: 'error'
            }))
        })
        .finally(() => dispatch(set_isLoading(false)))
    }

    return (
        <div className={style.parent} >
            <div>
                <div><IoClose onClick={() => handleClose()} size={25} title='Đóng' /></div>
                <div>
                    <div>Nhập số lượng</div>
                    <div><input value={amount} onChange={(e) => handleAddAmount(e)} /></div>
                </div>
                <div>{msg}</div>
                <div>
                    <div>{moneyTotal.new}</div>
                    <div>{moneyTotal.old}</div>
                </div>
                <div onClick={() => handleAddProduct()}>
                    <div>
                        <FaShoppingCart size={25} color='white' />
                        <div>Thêm vào giỏ hàng</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AddProduct);