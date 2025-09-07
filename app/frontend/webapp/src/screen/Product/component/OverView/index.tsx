import { useContext, useState } from 'react';
import style from './style.module.scss';
import { GrFormAdd, GrFormSubtract  } from "react-icons/gr";
import { ProductContext } from '../../context';
import { isNumber } from '@src/utility/string';
import { useBuyNowMutation } from '@src/redux/query/orderRTK';
import { BuyNowBodyType, OrderField } from '@src/dataStruct/order';






const OverView = () => {
    const productContext = useContext(ProductContext)
    if (!productContext) {
        throw new Error("productContext in List component cant undefined !");
    }
    const {
        product,
        orderProduct,
        setOrderProduct,
        contact,
        setIsLoading,
        setMessage
    } = productContext;
    const [buyNow] = useBuyNowMutation()
    const [moneyTotal, setMoneyTotal] = useState({
        old: 0,
        new: 0
    })
    const [order, setOrder] = useState<OrderField>({
        id: -1,
        label: '',
        total: '',
        note: '',
        status: '',
        userId: -1,
        createTime: '',
        updateTime: ''
    })

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

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNumber(value)) {
            setMessage({
                message: 'Số lượng phải là 1 số !',
                type: 'error'
            })
        } else {
            handleMoney(value);
            setOrderProduct({...orderProduct, amount: value});
        }
    }

    const handleSubAmount = () => {
        const {amount} = orderProduct;
        if (isNumber(amount)) {
            let amount_number = Number(amount);
            if (amount_number > 1) {
                amount_number = amount_number - 1;
                setOrderProduct({...orderProduct, amount: amount_number.toString()})
                handleMoney(amount_number.toString());
            } 
        }
    }

    const handleAddAmount = () => {
        const {amount} = orderProduct;
        const maxAmount = product?.amount
        if (isNumber(amount) && maxAmount && isNumber(maxAmount)) {
            let amount_number = Number(amount);
            const maxAmount_number = Number(maxAmount)
            if (amount_number < maxAmount_number) {
                amount_number = amount_number + 1;
                setOrderProduct({...orderProduct, amount: amount_number.toString()})
                handleMoney(amount_number.toString());
            } 
        }
    }

    const handleBuyNow = () => {
        const myId = sessionStorage.getItem("myId");
        if (myId) {
            if (contact) {
                const orderBody: BuyNowBodyType = {
                    order: order,
                    product: orderProduct,
                    payment: {
                        id: -1,
                        method: 'cash',
                        infor: '',
                        isPay: false,
                        orderId: -1,
                        updateTime: '',
                        createTime: ''
                    },
                    contact: contact
                }
                setIsLoading(true);
                buyNow(orderBody)
                    .then(res => {
                    if (res.data?.isSuccess) {
                        setMessage({
                            message: 'Bạn đã đặt hàng, hãy theo dõi đơn hàng của bạn !',
                            type: 'success'
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                    setMessage({
                        message: 'Đặt hàng thất bại !',
                        type: 'error'
                    })
                })
                .finally(() => {
                    setIsLoading(false);
                })
            } else {
                setMessage({
                    message: 'Bạn cần thiết lập liên hệ trước khi đặt hàng !',
                    type: 'error'
                })
            }
        } else {
            setMessage({
                message: 'Bạn cần đăng nhập trước khi đặt hàng !',
                type: 'error'
            })
        }  
    }

    return (
        <div className={style.parent}>
            <div className={style.imageContainer}>
                <img src={product?.image} alt='' />
            </div>
            <div className={style.inforContainer}>
                <span className={style.title}>{product?.title}</span>
                <div className={style.infor}>
                    <div>
                        <div>Tên</div>
                        <div>{product?.name}</div>
                    </div>
                    <div>
                        <div>Size</div>
                        <div>{product?.size}</div>
                    </div>
                    <div>
                        <div>Giảm giá</div>
                        <div>{`${product?.discount} %`}</div>
                    </div>
                    <div>
                        <div>Số lượng</div>
                        <div>{product?.amount}</div>
                    </div>
                    <div>
                        <div>Đã bán</div>
                        <div>{product?.sold || 0}</div>
                    </div>
                    <div>
                        <div>Giá</div>
                        <div>{`${product?.price} VND`}</div>
                    </div>
                </div>
                <div className={style.order}>
                    <div className={style.ordertitle}>{`Đặt hàng tại đây, bạn đã đặt ${orderProduct.amount}`}</div>
                    <div className={style.buttonContainer}>
                        <div>
                            <div>
                                <div className={style.amountInput}>
                                    <div><GrFormSubtract onClick={() => handleSubAmount()} size={30} /></div>
                                    <div><input value={orderProduct.amount} onChange={(e) => handleAmount(e)} /></div>
                                    <div><GrFormAdd onClick={() => handleAddAmount()} size={30} /></div>
                                </div>
                            </div>
                            <div>
                                <div className={style.orderBtn} onClick={() => handleBuyNow()}>Mua ngay</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.moneyTotal}>
                        <div>
                            <div>{orderProduct.amount}</div>
                            <div>{moneyTotal.old}</div>
                            <div>{moneyTotal.new}</div>
                            <div>VND</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView;