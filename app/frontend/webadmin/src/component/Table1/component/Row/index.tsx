import React, { useEffect, useRef, useContext, memo } from 'react';
import './style.css';
import Cell from './component/Cell';
import Option from './component/Option';
import CellIndex from './component/CellIndex';
import { Context as Context_Table1 } from '@src/component/Table1/context';

const Row: React.FC = () => {
    const rowMain_element = useRef<HTMLDivElement | null>(null);
    const context_value_Context_Table1 = useContext(Context_Table1);

    if (!context_value_Context_Table1) {
        throw new Error('context_value_Context_Table1 is undefined');
    }

    const { myTable } = context_value_Context_Table1;

    useEffect(() => {
        if (rowMain_element.current) {
            const pos_x = myTable.pos_x;
            const marginLeft = pos_x;
            rowMain_element.current.style.marginLeft = `${marginLeft}px`;
        }
    }, [myTable]);

    const list_Cell = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((data, index) => {
        return <Cell key={index} data={data.toString()} />;
    });

    return (
        <div className="Table1-Row">
            <div className="Table1-Row-listCell" ref={rowMain_element}>
                {list_Cell}
            </div>
            <div className="Table1-Row-cellIndex">
                <CellIndex />
            </div>
            <div className="Table1-Row-option">
                <Option />
            </div>
            {/* <div>editor</div> */}
        </div>
    );
};

export default memo(Row);
