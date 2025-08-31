import { useEffect, useState, useContext } from 'react';
import style from './style.module.scss';
import { useGetStatisticQuery } from '@src/redux/query/accountRTK';
import { StatisticField } from '@src/dataStruct/account';
import { ProfileContext } from '../context';


const OverView = () => {
    const profileContext = useContext(ProfileContext);

    if (!profileContext) {
        throw new Error("profileContext in OverView component cant undefined !");
    }

    const {
        setIsLoading,
        setMessage
    } = profileContext;

    const [statistic, setStatistic] = useState<StatisticField>({
        id: 0,
        myRank: 0,
        allOrder: 0,
        allMoney: 0,
        preMonthOrder: 0,
        thisMonthOrder: 0,
        preMonthMoney: 0,
        thisMonthMoney: 0,
        status: '',
        userId: -1,
        updateTime:'',
        createTime: '',
    })

    const {
        data, 
        // isFetching, 
        isLoading,
        isError, 
        error
    } = useGetStatisticQuery();

    useEffect(() => {
        if (isError && error) {
            setMessage({
                message: 'Đã có lỗi xảy ra tại OverView !',
                type: 'error'
            })
            console.error(error);
        }
    }, [isError, error, setMessage])

    useEffect(() => {
       setIsLoading(isLoading);
    }, [setIsLoading, isLoading])

    useEffect(() => {
        const resData = data
        if (resData?.isSuccess && resData?.data) {
            setStatistic(resData.data)
        }
    }, [data]) 

    return (
        <div className={style.parent}>
            <div>
                <div>Vị trí của bạn:</div>
                <div>{statistic.myRank}</div>
            </div>
            <div>
                <div>Tổng số đơn:</div>
                <div>{statistic.allOrder}</div>
            </div>
            <div>
                <div>Tổng số tiền:</div>
                <div className={style.moneyNumber}>{statistic.allMoney}</div>
            </div>
            <div>
                <div>Đơn tháng trước:</div>
                <div>{statistic.preMonthOrder}</div>
            </div>
            <div>
                <div>Đơn tháng này:</div>
                <div className={style.orderThisMonth}>{statistic.thisMonthOrder}</div>
            </div>
             <div>
                <div>Tiền tháng trước:</div>
                <div>{statistic.preMonthMoney}</div>
            </div>
            <div>
                <div>Tiền tháng này:</div>
                <div className={style.moneyThisMonth}>{statistic.thisMonthMoney}</div>
            </div>
        </div>
    )
}

export default OverView;