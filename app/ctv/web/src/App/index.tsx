import { useEffect } from 'react';
import AppRouter from '@src/router';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';
import type { RootState, AppDispatch } from '@src/redux';
import { useSelector, useDispatch } from 'react-redux';
import { set_id, set_isSignin, set_isLoading } from '@src/redux/slice/appSlice';
import { unstable_batchedUpdates } from 'react-dom';
import NormalLoading from '@src/component/NormalLoading';


const App = () => {
    const isLoading: boolean = useSelector((state: RootState) => state.appSlice.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const myId = sessionStorage.getItem("myId");
        if (myId === null) {
            const fetchCheckSignin = async () => {
                try {
                    dispatch(set_isLoading(true));
                    const response = await axiosInstance.get<MyResponse<number>>(
                        `/api/service_account/query/isSignin`
                    );
                    const resData = response.data;
                    if (resData.isSuccess) {
                        unstable_batchedUpdates(() => {
                            if (resData.data) {
                                dispatch(set_id(resData.data));
                                dispatch(set_isSignin(true));
                                sessionStorage.setItem("myId", `${resData.data}`);
                            } 
                        });
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    dispatch(set_isLoading(false));
                }
            }

            fetchCheckSignin();
        } else {
            dispatch(set_id(Number(myId)));
            dispatch(set_isSignin(true));
        }
        
    }, [dispatch])
   

    if (isLoading) {
        return <NormalLoading />
    }

    return (
        <div>
            <AppRouter />
        </div>
    );
    
    return
};

export default App;
