import { useEffect, useState } from 'react';
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import { LIST } from '@src/const/text';
import Rows from './Rows';
import Control from './Control';
import { useGetFishCodesAccordingtoNameQuery } from '@src/redux/query/fishCodeRTK';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import { MessageDataInterface } from '@src/component/MessageDialog/type';
import { useNavigate } from 'react-router-dom';
import { FishCodeContextInterface } from './type';
import { FishCodeContext } from './context';
import { PagedFishCodeField } from '@src/dataStruct/fishCode';


const List = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<PagedFishCodeField | undefined>(undefined);
    const [page, setPage] = useState<string>('1');
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })

    const {
        data: data_, 
        // isFetching, 
        isLoading: isLoading_,
        isError, 
        error
    } = useGetFishCodesAccordingtoNameQuery({page: '1', size: '10'});
    useEffect(() => {
        if (isError && error) {
            console.error(error);
            setMessage({
                message: 'Tải mã cá không thành công !',
                type: 'error'
            })
        }
    }, [isError, error, setMessage])
    useEffect(() => {
        setIsLoading(isLoading_);
    }, [isLoading_, setIsLoading])
    useEffect(() => {
        setData(data_);
    }, [data_]) 

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }

    const myId = sessionStorage.getItem("myId");

    const valueContext: FishCodeContextInterface = {
        fishCodes: data?.items,
        totalCount: data?.totalCount,
        page: page,
        setPage: setPage,
        setIsLoading,
        setMessage
    }

    if (myId !== null) {
        return (
            <FishCodeContext.Provider value={valueContext}>
                <div className={style.parent}>
                    <div className={style.headerLeft}><HeaderLeft header={LIST} /></div>
                    <div className={style.headerTop}><HeaderTop header={LIST} /></div>
                    {isLoading && <MainLoading />}
                    {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
                    <div className={style.main}>
                        <div className={style.main1}>
                            <div className={style.control}>
                                <Control />
                            </div>
                            <div>
                                <Rows />
                            </div>
                        </div>
                    </div>
                </div>
            </FishCodeContext.Provider>
        )
    }

    return (
        <div className={style.parent1}>
            <div> 
                <div>Bạn chưa đăng nhập</div>
                <button onClick={() => navigate('/signin')}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default List;