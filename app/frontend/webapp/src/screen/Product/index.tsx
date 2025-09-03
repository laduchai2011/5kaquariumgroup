import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.scss';
import { GrFormAdd, GrFormSubtract  } from "react-icons/gr";
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import { PRODUCT } from '@src/const/text';
import { useGetAProductWithIdQuery } from '@src/redux/query/productRTK';
import { useGetAFishCodeWithIdQuery } from '@src/redux/query/fishCodeRTK';
import { useGetAccountWithIdQuery } from '@src/redux/query/accountRTK';
import { ProductField } from '@src/dataStruct/product';
import { FishCodeField } from '@src/dataStruct/fishCode';
import { OrderField, AddOrderBody, OrderContactField } from '@src/dataStruct/order';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import { MessageDataInterface } from '@src/component/MessageDialog/type';
import TextEditorDisplay from '@src/component/TextEditorDisplay';
import { useAddOrderWithTransactionMutation } from '@src/redux/query/orderRTK';
import { isNumber } from '@src/utility/string';
import { AccountField } from '@src/dataStruct/account';
import { getCookie } from '@src/utility/cookie';




const Product = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductField | undefined>(undefined);
    const [fishCode, setFishCode] = useState<FishCodeField | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })
    const [moneyTotal, setMoneyTotal] = useState({
        old: 0,
        new: 0
    })
    const [sellerId, setSellerId] = useState<string>('')
    const [seller, setSeller] = useState<AccountField | undefined>(undefined)
    const [addOrderWithTransaction] = useAddOrderWithTransactionMutation();
    const [order, setOrder] = useState<OrderField>({
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
        userId: -1,
        productId: -1,
        sellerId: 1,
        updateTime: '',
        createTime: '',
    });
    const [contact, setContact] = useState<OrderContactField | undefined>(undefined)

    const {
        data: data_product, 
        // isFetching, 
        isLoading: isLoading_product,
        isError: isError_product, 
        error: error_product
    } = useGetAProductWithIdQuery({id: id || ''}, { skip: !id });
    useEffect(() => {
        if (isError_product && error_product) {
            console.error(error_product);
            setMessage({
                message: 'Sản phầm không được tìm thấy !',
                type: 'error'
            })
        }
    }, [isError_product, error_product])
    useEffect(() => {
        setIsLoading(isLoading_product)
    }, [isLoading_product])
    useEffect(() => {
        if (data_product) {
            setProduct(data_product)
            setOrder(pre => {
                return {
                    ...pre,
                    title: data_product.title,
                    name: data_product.name,
                    image: data_product.image,
                    size: data_product.size,
                    productId: data_product.id,
                    discount: data_product.discount,
                    fishCodeInProduct: data_product.fishCodeInProduct,
                    price: data_product.price
                }
            })
        }
    }, [data_product]) 

    const {
        data: data_fishCode, 
        // isFetching, 
        isLoading: isLoading_fishCode,
        isError: isError_fishCode, 
        error: error_fishCode
    } = useGetAFishCodeWithIdQuery({id: product?.fishCodeId.toString() || ''}, { skip: !product?.fishCodeId });

    useEffect(() => {
        if (isError_fishCode && error_fishCode) {
            console.error(error_fishCode);
            setMessage({
                message: 'Mã cá không được tìm thấy !',
                type: 'error'
            })
        }
    }, [isError_fishCode, error_fishCode])
    useEffect(() => {
        setIsLoading(isLoading_fishCode)
    }, [isLoading_fishCode])
    useEffect(() => {
        if (data_fishCode) {
            setFishCode(data_fishCode)
        }
    }, [data_fishCode]) 

    const {
        data: data_seller, 
        // isFetching, 
        isLoading: isLoading_seller,
        isError: isError_seller, 
        error: error_seller
    } = useGetAccountWithIdQuery({id: sellerId}, { skip: sellerId.length === 0 });
    useEffect(() => {
        if (isError_seller && error_seller) {
            console.error(error_seller);
            setMessage({
                message: 'Không tìm thấy người bán !',
                type: 'warn'
            })
        }
    }, [isError_seller, error_seller])
    useEffect(() => {
        setIsLoading(isLoading_seller)
    }, [isLoading_seller])
    useEffect(() => {
        if (data_seller) {
            setSeller(data_seller)
            setOrder(pre => {
                return {
                    ...pre,
                    sellerId: data_seller.id
                }
            })
        }
    }, [data_seller]) 

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
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
            setOrder({...order, amount: value});
        }
    }

    const handleSubAmount = () => {
        const {amount} = order;
        if (isNumber(amount)) {
            let amount_number = Number(amount);
            if (amount_number > 1) {
                amount_number = amount_number - 1;
                setOrder({...order, amount: amount_number.toString()})
                handleMoney(amount_number.toString());
            } 
        }
    }

    const handleAddAmount = () => {
        const {amount} = order;
        const maxAmount = product?.amount
        if (isNumber(amount) && maxAmount && isNumber(maxAmount)) {
            let amount_number = Number(amount);
            const maxAmount_number = Number(maxAmount)
            if (amount_number < maxAmount_number) {
                amount_number = amount_number + 1;
                setOrder({...order, amount: amount_number.toString()})
                handleMoney(amount_number.toString());
            } 
        }
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

    const handleSellerId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSeller(undefined);
        setSellerId(value.trim())
    }

    useEffect(() => {
        const _selectedContactCookie = getCookie('selectedContact');
        if (_selectedContactCookie) {
            const _selectedContact = JSON.parse(_selectedContactCookie) as OrderContactField
            setContact({
                id: -1,
                name: _selectedContact.name,
                phone: _selectedContact.phone,
                address: _selectedContact.address,
                contactId: _selectedContact.id,
                orderId: -1,
                updateTime: '',
                createTime: ''
            })
        }
    }, [])

    const handleAddOrder = () => {
        const myId = sessionStorage.getItem("myId");
        if (myId) {
            if (contact) {
                const orderBody: AddOrderBody = {
                order: order,
                paymentMethod: {
                    id: -1,
                    method: 'cash',
                        infor: '',
                        isPay: false,
                        orderId: -1,
                        updateTime: '',
                        createTime: ''
                    },
                    orderContact: contact
                }
                setIsLoading(true);
                addOrderWithTransaction(orderBody)
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
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <div className={style.headerLeft}><HeaderLeft header={PRODUCT} /></div>
            <div className={style.headerTop}><HeaderTop header={PRODUCT} /></div>
            { product ?
                <div className={style.main}>
                    <div className={style.product}>
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
                                <div className={style.ordertitle}>{`Đặt hàng tại đây, bạn đã đặt ${order.amount}`}</div>
                                <div className={style.buttonContainer}>
                                    <div>
                                        <div>
                                            <div className={style.amountInput}>
                                                <div><GrFormSubtract onClick={() => handleSubAmount()} size={30} /></div>
                                                <div><input value={order.amount} onChange={(e) => handleAmount(e)} /></div>
                                                <div><GrFormAdd onClick={() => handleAddAmount()} size={30} /></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={style.orderBtn} onClick={() => handleAddOrder()}>Đặt hàng</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.moneyTotal}>
                                    <div>
                                        <div>{order.amount}</div>
                                        <div>{moneyTotal.old}</div>
                                        <div>{moneyTotal.new}</div>
                                        <div>VND</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.seller}>
                        <div>Người bán</div>
                        <div>Cần có thông tin người bán để được giảm giá</div>
                        <div>
                            <input value={sellerId} onChange={(e) => handleSellerId(e)} placeholder='Nhập id người bán tại đây' />
                        </div>
                        {seller && <div>{`${seller?.firstName} ${seller?.lastName}`}</div>}
                    </div>
                    <div className={style.paymentMethod}>
                        <div>Phương thức thanh toán</div>
                        <div>Liên hệ người bán</div>
                    </div>
                    <div className={style.describe}>
                        <div>Mô tả</div>
                        <div>
                            {fishCode?.detail && <TextEditorDisplay data={fishCode?.detail} />}
                        </div>
                    </div>
                </div> :
                <div className={style.notifyNOTproduct}><h2>Không có sản phẩm nào được tìm thấy</h2></div>
            }
        </div>
    );
};

export default Product;
