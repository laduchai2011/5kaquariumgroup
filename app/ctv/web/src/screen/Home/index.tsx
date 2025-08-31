import { useEffect } from 'react';
import style from './style.module.scss';
import { HOME } from '@src/const/text';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@src/redux';
import { useSelector } from 'react-redux';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import { InitComponent } from '@src/App/handleCommon';
import { HeaderSelected } from "@src/component/Header/HeaderLeft/type";



const Home = () => {
    const navigate = useNavigate();
    const isSignin: boolean = useSelector((state: RootState) => state.appSlice.isSignin);
    const headerSelected: HeaderSelected = useSelector((state: RootState) => state.headerLeftSlice.headerSelected);

    useEffect(() => {
        InitComponent(isSignin, navigate, headerSelected);
    }, [navigate, isSignin, headerSelected])

    return (
        <div className={style.parent}>
            <div className={style.headerLeft}><HeaderLeft /></div>
            <div className={style.headerTop}><HeaderTop /></div>
           { HOME }
        </div>
    );
};

export default Home;
