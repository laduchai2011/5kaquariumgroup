import { useState, useEffect } from 'react';
import AppRouter from '@src/router';
import MainLoading from '@src/component/MainLoading';
import axiosInstance from '@src/api/axiosInstance';
import type { MyResponse } from '@src/dataStruct/response';
import type { RoleField } from '@src/dataStruct/role';

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const appRole = sessionStorage.getItem("appRole");
        if (appRole === null) {
            const fetchCheckRole = async () => {
                try {
                    setIsLoading(true);
                    const response = await axiosInstance.get<MyResponse<RoleField>>(
                        `/api/service_account/query/role`
                    );
                    const resData = response.data;
                    if (resData.isSuccess) {
                        let role = 'customer';
                        let myId = null;
                        if (resData.data?.role) {
                            role = resData.data?.role;
                        }
                        if (resData.data?.userId) {
                            myId = resData.data?.userId;
                        }
                        sessionStorage.setItem("appRole", `${role}`);
                        sessionStorage.setItem("myId", `${myId}`);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchCheckRole();
        }
    }, [])

    if (isLoading) {
        return <MainLoading />
    }

    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
