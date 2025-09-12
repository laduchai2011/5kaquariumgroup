import { FC, useEffect, useRef } from 'react';
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@src/redux';
import { MdOutlineMenu } from "react-icons/md";
import { set_isShow, set_headerSelected } from '@src/redux/slice/headerLeftSlice';
import { HOME, PRODUCT, LIST, ORDER, PROFILE, ABOUT5K } from '@src/const/text';
import { HeaderSelections, HeaderSelected } from '@src/component/Header/HeaderLeft/type';
import { useNavigate } from 'react-router-dom';



const HeaderLeft: FC<{header: string}> = ({header}) => {
    const navigate = useNavigate();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const isShow: boolean = useSelector((state: RootState) => state.headerLeftSlice.isShow);
    const currentProductId: number = useSelector((state: RootState) => state.productSlice.currentProductId);

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
            case HeaderSelections.PRODUCT: { 
                navigate(`/product/${currentProductId}`)
                break; 
            } 
            case HeaderSelections.LIST: { 
                navigate('/list')
                break; 
            } 
            case HeaderSelections.MY_ORDER: { 
                navigate('/myOrder')
                break; 
            } 
            case HeaderSelections.PROFILE: { 
                navigate('/profile')
                break; 
            } 
            case HeaderSelections.ABOUT5K: { 
                navigate('/about5k')
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    }

    const return_headerSelected = (_header: string) => {
        if (header === _header) {
            return style.headerSelected
        } else {
            return '';
        }
    }

    const handleClose = () => {
        dispatch(set_isShow(!isShow))
    }

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.content}>
                <div>
                    <span>5K-AQUARIUM</span>
                    <MdOutlineMenu onClick={() => handleClose()} size={25} />
                </div>
                <div className={`${return_headerSelected(HOME)}`} onClick={() => handleSelected(HeaderSelections.HOME)}>{ HOME }</div>
                <div className={`${return_headerSelected(PRODUCT)}`} onClick={() => handleSelected(HeaderSelections.PRODUCT)}>{ PRODUCT }</div>
                <div className={`${return_headerSelected(LIST)}`} onClick={() => handleSelected(HeaderSelections.LIST)}>{ LIST }</div>
                <div className={`${return_headerSelected(ORDER)}`} onClick={() => handleSelected(HeaderSelections.MY_ORDER)}>{ ORDER }</div>
                <div className={`${return_headerSelected(PROFILE)}`} onClick={() => handleSelected(HeaderSelections.PROFILE)}>{ PROFILE }</div>
                <div className={`${return_headerSelected(ABOUT5K)}`} onClick={() => handleSelected(HeaderSelections.ABOUT5K)}>{ ABOUT5K }</div>
            </div>
        </div>
    );
};

export default HeaderLeft;
