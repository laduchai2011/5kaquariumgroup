import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { 
    EditorState, 
    Editor,
    convertFromRaw 
} from 'draft-js';
import blockRendererFn from './component/blockRendererFn';
import type { FishCodeField } from '@src/dataStruct/fishCode';


const Row: React.FC<{ data: FishCodeField, index: number }> = ({ data, index }) => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    const detail_element = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        const handleShowContent = () => {
            if (data.detail.length > 0) {
                const contentState = convertFromRaw(JSON.parse(data.detail));
                setEditorState(EditorState.createWithContent(contentState));
            }
        };
        handleShowContent()
    }, [data.detail])

    const handleSelect = () => {
        if (parent_element.current && detail_element.current) {
            parent_element.current.classList.toggle('active');
            detail_element.current.classList.toggle('show');
        }
    }

    const handleAddProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        navigate(
            '/createProduct',
            {
                state: {
                    fishCodeId: data.id
                },
            }
        );
    }

    return (
        <div className="List-Table-Row" ref={parent_element} onClick={() => handleSelect()}>
            <div className='List-Row-row'>
                <div className='List-Row-row-index'>{index}</div>
                <div className='List-Row-row-name'>{data.name}</div>
                <div className='List-Row-row-size'>{data.size}</div>
                <div className='List-Row-row-amount'>{data.amount}</div>
                <div className='List-Row-row-price'>{data.price}</div>
                <div className='List-Row-row-btnContainer'>
                    <div onClick={(e) => handleAddProduct(e)}>Tạo sản phẩm</div>
                </div>
            </div>
            <div className='List-Row-detail' ref={detail_element}>
                <Editor 
                    editorState={editorState} 
                    onChange={setEditorState}
                    blockRendererFn={blockRendererFn} 
                />
            </div>
        </div>
    );
};

export default Row;
