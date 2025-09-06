import React, { useEffect, useRef } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { HOME, Order, LIST, CREATE_ORDER } from '@src/const/text';
import type { select_type } from '@src/screen/Header/type';
import { select_options } from '@src/screen/Header/type';

const dfIndex = {
    [select_options.HOME]: 0,
    [select_options.ORDER]: 1,
    [select_options.LIST]: 2,
    [select_options.CREATE_ORDER]: 3,
};

const dfRouter = {
    [select_options.HOME]: '/',
    [select_options.ORDER]: '/order',
    [select_options.LIST]: '/list',
    [select_options.CREATE_ORDER]: '/createOrder',
};

const Center: React.FC = () => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let index_selected: number = dfIndex[select_options.HOME];
        switch (location.pathname) {
            case dfRouter[select_options.HOME]: {
                index_selected = dfIndex[select_options.HOME];
                break;
            }
            case dfRouter[select_options.ORDER]: {
                index_selected = dfIndex[select_options.ORDER];
                break;
            }
            case dfRouter[select_options.LIST]: {
                index_selected = dfIndex[select_options.LIST];
                break;
            }
            case dfRouter[select_options.CREATE_ORDER]: {
                index_selected = dfIndex[select_options.CREATE_ORDER];
                break;
            }
            default: {
                index_selected = dfIndex[select_options.HOME];
                break;
            }
        }

        if (parent_element.current) {
            const selections_element = parent_element.current.children;
            const len_selections_element = selections_element.length;

            for (let i: number = 0; i < len_selections_element; i++) {
                selections_element[i].classList.remove('active');
            }

            selections_element[index_selected].classList.add('active');
        }
    }, [location.pathname]);

    const handleSelected = (selected: select_type) => {
        navigate(dfRouter[selected]);
    };

    return (
        <div className="Header_Center" ref={parent_element}>
            <div onClick={() => handleSelected(select_options.HOME)}>{HOME}</div>
            <div onClick={() => handleSelected(select_options.ORDER)}>{Order}</div>
            <div onClick={() => handleSelected(select_options.LIST)}>{LIST}</div>
            <div onClick={() => handleSelected(select_options.CREATE_ORDER)}>{CREATE_ORDER}</div>
        </div>
    );
};

export default Center;
