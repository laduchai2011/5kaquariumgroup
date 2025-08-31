import { useEffect, useRef } from 'react';
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@src/redux';
import { RxArrowLeft } from "react-icons/rx";
import { set_isShow, set_headerSelected } from '@src/redux/slice/headerLeftSlice';
import { HOME, EVENT, LIVE, MY_LIVE, PROFILE } from '@src/const/text';
import { HeaderSelections, HeaderSelected } from '@src/component/Header/HeaderLeft/type';
import { useNavigate } from 'react-router-dom';


const HeaderLeft = () => {
    const navigate = useNavigate();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const isShow: boolean = useSelector((state: RootState) => state.headerLeftSlice.isShow);
    const headerSelected: HeaderSelections = useSelector((state: RootState) => state.headerLeftSlice.headerSelected);

    useEffect(() => {
        if (parent_element.current) {
            const overbackground_element = parent_element.current.children[0];
            if (isShow) {
                parent_element.current.classList.add(style.parent_show);
                overbackground_element.classList.remove(style.overbackground_show)
            } else {
                parent_element.current.classList.remove(style.parent_show);
                overbackground_element.classList.add(style.overbackground_show)
            }
        }
    }, [isShow]);

    const handleSelected = (headerSelected: HeaderSelected) => {
        dispatch(set_headerSelected(headerSelected))
        switch(headerSelected) { 
            case HeaderSelections.HOME: { 
                navigate('/')
                break; 
            } 
            case HeaderSelections.LIVE: { 
                navigate('/live')
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    }

    const return_headerSelected = (_headerSelected: HeaderSelected) => {
        if (headerSelected === _headerSelected) {
            return style.headerSelected
        } else {
            return '';
        }
    }

    const handleOpen = () => {
        dispatch(set_isShow(true))
    }

    const handleClose = () => {
        dispatch(set_isShow(false))
    }

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.overbackground} onClick={() => handleOpen()} />
            <div className={style.content}>
                <div>
                    <span>CTV-5K</span>
                    <RxArrowLeft onClick={() => handleClose()} size={25} />
                </div>
                <div className={`${return_headerSelected(HeaderSelections.HOME)}`} onClick={() => handleSelected(HeaderSelections.HOME)}>{ HOME }</div>
                <div className={`${return_headerSelected(HeaderSelections.EVENT)}`} onClick={() => handleSelected(HeaderSelections.EVENT)}>{ EVENT }</div>
                <div className={`${return_headerSelected(HeaderSelections.LIVE)}`} onClick={() => handleSelected(HeaderSelections.LIVE)}>{ LIVE }</div>
                <div className={`${return_headerSelected(HeaderSelections.MY_LIVE)}`} onClick={() => handleSelected(HeaderSelections.MY_LIVE)}>{ MY_LIVE }</div>
                <div className={`${return_headerSelected(HeaderSelections.PROFILE)}`} onClick={() => handleSelected(HeaderSelections.PROFILE)}>{ PROFILE }</div>
            </div>
        </div>
    );
};

export default HeaderLeft;
