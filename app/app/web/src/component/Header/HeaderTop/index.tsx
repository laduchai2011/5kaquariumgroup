import { FC, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetAccountQuery } from '@src/redux/query/accountRTK';
import avatarnull from '../../../asset/avatar/avatarnull.png';



const HeaderTop: FC<{header: string}> = ({header}) => {
    const navigate = useNavigate();
    const parent_element = useRef<HTMLDivElement | null>(null);

    const {
        data, 
        // isFetching, 
        // isLoading,
        isError, 
        error
    } = useGetAccountQuery();

    useEffect(() => {
        if (isError && error) {
            console.error(error);
        }
    }, [isError, error])

    // useEffect(() => {
    //     if (data) {
    //         setAccount(data);
    //     }
    // }, [data]) 

    const goToProfile = () => {
        navigate('/profile');
    }

    return (
        <div className={style.parent} ref={parent_element}>
            <div></div>
            <div>{header}</div>
            <div>
                <img 
                    src={data?.avatar || avatarnull}
                    onClick={() => goToProfile()}
                    alt='' 
                />
            </div>
        </div>
    );
};

export default HeaderTop;
