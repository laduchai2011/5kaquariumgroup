import { useRef } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux';
import { HeaderSelections } from '@src/component/Header/HeaderLeft/type';
import { HOME, EVENT, LIVE, MY_LIVE, PROFILE } from '@src/const/text';




const HeaderTop = () => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    const headerSelected: HeaderSelections = useSelector((state: RootState) => state.headerLeftSlice.headerSelected);    

    const Headers = [HOME, EVENT, LIVE, MY_LIVE, PROFILE]

    return (
        <div className={style.parent} ref={parent_element}>
            <div></div>
            <div>{Headers[headerSelected]}</div>
            <div>
                <img src='https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg' alt='' />
            </div>
        </div>
    );
};

export default HeaderTop;
