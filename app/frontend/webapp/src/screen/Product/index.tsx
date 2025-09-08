import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import { PRODUCT } from '@src/const/text';
import { useGetAProductWithIdQuery } from '@src/redux/query/productRTK';
import { useGetAFishCodeWithIdQuery } from '@src/redux/query/fishCodeRTK';
import { useGetAccountWithIdQuery } from '@src/redux/query/accountRTK';
import { ProductField } from '@src/dataStruct/product';
import { FishCodeField } from '@src/dataStruct/fishCode';
import { OrderContactField, OrderProductField, OrderField } from '@src/dataStruct/order';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import TextEditorDisplay from '@src/component/TextEditorDisplay';
import { AccountField } from '@src/dataStruct/account';
import { getCookie } from '@src/utility/cookie';
import { ProductContext } from './context';
import { ProductContextInterface } from './type';
import OverView from './component/OverView';
import ShoppingCart from './component/ShoppingCart';
// import ShoppingCartEdit from './component/ShoppingCartEdit';
// import ShoppingCartCreate from './component/ShoppingCartCreate';
import type { AppDispatch, RootState } from '@src/redux';
import { useSelector, useDispatch } from 'react-redux';
import { set_isLoading, set_message } from '@src/redux/slice/globalSlice';




const Product = () => {
    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.globalSlice.isLoading);
    const message = useSelector((state: RootState) => state.globalSlice.message);

    const [product, setProduct] = useState<ProductField | undefined>(undefined);
    const [fishCode, setFishCode] = useState<FishCodeField | undefined>(undefined);
    // const [shoppingCartEdit, setShoppingCartEdit] = useState<ShoppingCartEditInterface>({ isShow: false, shoppingCart: undefined });
    const [selectedShoppingCart, setSelectedShoppingCart] = useState<OrderField | undefined>(undefined);
    // const [isShoppingCartCreate, setIsShoppingCartCreate] = useState<boolean>(false);
    const [sellerId, setSellerId] = useState<string>('')
    const [seller, setSeller] = useState<AccountField | undefined>(undefined)
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
        orderId: -1,
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
            dispatch(set_message({
                message: 'Sản phầm không được tìm thấy !',
                type: 'error'
            }))
        }
    }, [dispatch, isError_product, error_product])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_product))
    }, [dispatch, isLoading_product])
    useEffect(() => {
        if (data_product) {
            setProduct(data_product)
            setOrderProduct(pre => {
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
            dispatch(set_message({
                message: 'Mã cá không được tìm thấy !',
                type: 'error'
            }))
        }
    }, [dispatch, isError_fishCode, error_fishCode])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_fishCode))
    }, [dispatch, isLoading_fishCode])
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
            dispatch(set_message({
                message: 'Không tìm thấy người bán !',
                type: 'warn'
            }))
        }
    }, [dispatch, isError_seller, error_seller])
    useEffect(() => {
        dispatch(set_isLoading(isLoading_seller))
    }, [dispatch, isLoading_seller])
    useEffect(() => {
        if (data_seller) {
            setSeller(data_seller)
            setOrderProduct(pre => {
                return {
                    ...pre,
                    sellerId: data_seller.id
                }
            })
        }
    }, [data_seller]) 

    const handleCloseMessage = () => {
        dispatch(set_message({...message, message: ''}))
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

    const valueContext = useMemo<ProductContextInterface>(() => ({
        product,
        setProduct,
        orderProduct,
        setOrderProduct,
        contact,
        // shoppingCartEdit,
        // setShoppingCartEdit,
        selectedShoppingCart,
        setSelectedShoppingCart,
        // setIsShoppingCartCreate
    }), [product, orderProduct, contact, selectedShoppingCart]);

    return (
        <div className={style.parent}>
            {isLoading && <MainLoading />}
            {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
            <div className={style.headerLeft}><HeaderLeft header={PRODUCT} /></div>
            <div className={style.headerTop}><HeaderTop header={PRODUCT} /></div>
            <ProductContext.Provider value={valueContext}>
            { product ?
                <div className={style.main}>
                    <OverView />
                    <ShoppingCart />
                    {/* {shoppingCartEdit.isShow && <ShoppingCartEdit />} */}
                    {/* {isShoppingCartCreate && <ShoppingCartCreate />} */}
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
            </ProductContext.Provider>
        </div>
    );
};

export default Product;
