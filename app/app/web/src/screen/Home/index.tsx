import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import Control from './component/Control';
import Fish from './component/Fish';
import { HOME } from '@src/const/text';
import { useNavigate } from 'react-router-dom';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import { MessageDataInterface } from '@src/component/MessageDialog/type';
import { useGetProductsQuery } from '@src/redux/query/productRTK';
import { ProductField } from '@src/dataStruct/product';
import { ProductContext } from './context';
import { ProductContextInterface } from './type';




const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fishCodeId = location?.state?.fishCodeId;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const myId = sessionStorage.getItem("myId");
    const [data, setData] = useState<ProductField[]>([]);
    const [page, setPage] = useState<string>('1');
    const size = '10';
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })
    const [selectedFishCodeId, setSelectedFishCodeId] = useState<number>(-2);
    useEffect(() => {
        if (selectedFishCodeId === -2) {
            if (fishCodeId) {
                setSelectedFishCodeId(fishCodeId)
            } else {
                setSelectedFishCodeId(-1)
            }
        }
    }, [selectedFishCodeId, fishCodeId])

    const {
        data: data_, 
        // isFetching, 
        isLoading: isLoading_,
        isError, 
        error
    } = useGetProductsQuery({page: page, size: size, fishCodeId: selectedFishCodeId.toString() || '-1'});
    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])
    useEffect(() => {
        setIsLoading(isLoading_);
    }, [isLoading_])
    useEffect(() => {
        if (data_?.items) {
            setData(data_.items)
        }
    }, [data_]) 

    const goToSignup = () => {
        navigate('/signup');
    }

    const goToSignin = () => {
        navigate('/signin');
    }

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    const valueContext: ProductContextInterface = {
        products: data,
        page: page,
        setPage: setPage,
        setIsLoading,
        setMessage,
        selectedFishCodeId,
        setSelectedFishCodeId
    }

    return (
        <ProductContext.Provider value={valueContext}>
            <div className={style.parent}>
                {isLoading && <MainLoading />}
                {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
                <div className={style.headerLeft}><HeaderLeft header={HOME} /></div>
                <div className={style.headerTop}><HeaderTop header={HOME} /></div>
                <div className={style.main}>
                    <div className={style.main1}>
                        {myId === null && <div className={style.notificate}>
                            <div>
                                <div>Đăng ký nhận ngay 20k</div>
                                <div onClick={() => goToSignup()}>Đăng ký</div>
                                <div onClick={() => goToSignin()}>Đăng nhập</div>
                            </div>
                        </div>}
                        <div><Control /></div>
                        <div><Fish /></div>
                    </div>
                </div>
            </div>
        </ProductContext.Provider>
    );
};

export default Home;
