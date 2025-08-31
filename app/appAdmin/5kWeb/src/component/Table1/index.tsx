import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import Row from './component/Row';
import { Context } from './context';
import type { context_type, scroll_control_type, table_option } from './type';

const Table1: React.FC = () => {
    const scrollTab_element = useRef<HTMLDivElement | null>(null);
    const table_element = useRef<HTMLDivElement | null>(null);
    const width_index_config = 50;
    const width_scrollTab_config = 700;
    const [myTable, setMyTable] = useState<table_option>({
        width_index: width_index_config,
        width: width_scrollTab_config,
        widthFull: 0,
        pos_x: width_index_config,
    });
    const scroll_control = useRef<scroll_control_type>({
        isScroll: false,
        clientX: 0,
        scroll_pos: 0,
        min_pos: 0,
        max_pos: 0,
    });

    useEffect(() => {
        if (table_element.current) {
            const table_on_element = table_element.current.children[0] as HTMLElement;
            const widthFull_table = table_on_element.clientWidth;
            setMyTable((pre) => {
                return {
                    ...pre,
                    widthFull: widthFull_table,
                };
            });
        }
    }, []);

    useEffect(() => {
        if (scrollTab_element.current && table_element.current && scroll_control.current.isScroll === false) {
            const scroll_element = scrollTab_element.current.children[0] as HTMLElement;
            const width_scrollTab = width_scrollTab_config;
            const width_row_hidden = myTable.widthFull - width_scrollTab;
            const rate_row_hidden = width_row_hidden / myTable.widthFull;
            const width_scroll_hidden = rate_row_hidden * width_scrollTab;
            const width_scroll = width_scrollTab - width_scroll_hidden;
            scrollTab_element.current.style.width = `${width_scrollTab}px`;
            table_element.current.style.width = `${width_scrollTab}px`;
            scroll_element.style.width = `${width_scroll}px`;

            scroll_control.current = {
                ...scroll_control.current,
                max_pos: width_scroll_hidden,
            };
        }
    }, [myTable]);

    useEffect(() => {
        function handleMouseUp_doc() {
            scroll_control.current = {
                ...scroll_control.current,
                isScroll: false,
            };
        }

        function handleMouseMove_doc(event: MouseEvent) {
            const min_pos = scroll_control.current.min_pos;
            const max_pos = scroll_control.current.max_pos;
            const isScroll = scroll_control.current.isScroll;
            if (isScroll === true) {
                const clientX = event.clientX;
                const clientX_before = scroll_control.current.clientX;
                const offset_x_scroll = clientX - clientX_before;
                const new_scroll_pos = scroll_control.current.scroll_pos + offset_x_scroll;

                if (scrollTab_element.current && table_element.current) {
                    if (new_scroll_pos <= min_pos) {
                        setMyTable((pre) => {
                            return {
                                ...pre,
                                pos_x: pre.width_index,
                            };
                        });
                        scroll_control.current = {
                            ...scroll_control.current,
                            scroll_pos: 0,
                        };
                    } else if (new_scroll_pos >= max_pos) {
                        setMyTable((pre) => {
                            return {
                                ...pre,
                                pos_x: myTable.width_index - (myTable.widthFull - myTable.width),
                            };
                        });

                        scroll_control.current = {
                            ...scroll_control.current,
                            scroll_pos: max_pos,
                        };
                    } else {
                        const width_scrollTab = width_scrollTab_config;
                        const rate_offset_x = offset_x_scroll / width_scrollTab;
                        const offset_x_row = rate_offset_x * myTable.widthFull;
                        setMyTable((pre) => {
                            const pos_x_before = pre.pos_x;
                            return {
                                ...pre,
                                offset_x_row: offset_x_row,
                                pos_x: pos_x_before - offset_x_row,
                            };
                        });

                        scroll_control.current = {
                            ...scroll_control.current,
                            clientX: clientX,
                            scroll_pos: new_scroll_pos,
                        };
                    }

                    const scroll_element = scrollTab_element.current.children[0] as HTMLElement;
                    scroll_element.style.marginLeft = `${scroll_control.current.scroll_pos}px`;
                }
            }
        }

        document.addEventListener('mouseup', handleMouseUp_doc);
        document.addEventListener('mousemove', handleMouseMove_doc);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp_doc);
            document.removeEventListener('mousemove', handleMouseMove_doc);
        };
    }, [myTable]);

    const handleClickDownScroll = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clientX = event.clientX;
        scroll_control.current = {
            ...scroll_control.current,
            isScroll: true,
            clientX: clientX,
        };
    };

    const context_value: context_type = {
        myTable: myTable,
    };

    return (
        <Context.Provider value={context_value}>
            <div className="Table1">
                <div>Table1</div>
                <div className="Table1-table" ref={table_element}>
                    <div>
                        <Row />
                        <Row />
                        <Row />
                    </div>
                </div>
                <div className="Table1-scroll" ref={scrollTab_element}>
                    <div onMouseDown={(e) => handleClickDownScroll(e)} />
                </div>
            </div>
        </Context.Provider>
    );
};

export default Table1;
