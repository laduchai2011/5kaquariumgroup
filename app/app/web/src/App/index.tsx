import { useEffect, useState } from 'react';
import AppRouter from '@src/router';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';
import type { AppDispatch } from '@src/redux';
import { useDispatch } from 'react-redux';
import { unstable_batchedUpdates } from 'react-dom';
import NormalLoading from '@src/component/NormalLoading';
import { useGetStatisticQuery, useCreateStatisticMutation } from '@src/redux/query/accountRTK';


const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const myId = sessionStorage.getItem("myId");
        if (myId === null) {
            const fetchCheckSignin = async () => {
                try {
                    setIsLoading(true)
                    const response = await axiosInstance.get<MyResponse<number>>(
                        `/api/service_account/query/isSignin`
                    );
                    const resData = response.data;
                    if (resData.isSuccess) {
                        unstable_batchedUpdates(() => {
                            if (resData.data) {
                                sessionStorage.setItem("myId", `${resData.data}`);
                            } 
                        });
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false)
                }
            }

            fetchCheckSignin();
        }
        
    }, [dispatch])

    ///////////////////////////////////////////////
    const [createStatistic] = useCreateStatisticMutation()
    const {
        data: data_Statistic, 
        // isFetching, 
        isLoading: isLoading_Statistic,
        isError: isError_Statistic, 
        error: error_Statistic
    } = useGetStatisticQuery();

    useEffect(() => {
        if (isError_Statistic && error_Statistic) {
            console.error(error_Statistic);
        }
    }, [isError_Statistic, error_Statistic])

    useEffect(() => {
       setIsLoading(isLoading_Statistic);
    }, [isLoading_Statistic])

    useEffect(() => {
        const resData = data_Statistic
        if (resData?.isSuccess) {
            if (resData?.isEmptyData) {
                createStatistic()
                .catch(err => {
                    console.error(err)
                    alert('Tạo thống kê thất bại')
                })
            }
        }
    }, [data_Statistic, createStatistic]) 
    /////////////////////////////////
   

    if (isLoading) {
        return <NormalLoading />
    }

    return (
        <div>
            <AppRouter />
        </div>
    );

};

export default App;
