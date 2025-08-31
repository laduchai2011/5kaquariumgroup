import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import { 
    EditorState, 
    Editor,
    convertFromRaw 
} from 'draft-js';
import blockRendererFn from './component/blockRendererFn';



const TextEditorDisplay: React.FC<{ data: string }> = ({ data }) => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        const handleShowContent = () => {
            if (data.length > 0) {
                const contentState = convertFromRaw(JSON.parse(data));
                setEditorState(EditorState.createWithContent(contentState));
            }
        };
        handleShowContent()
    }, [data])

   

    return (
        <div className={style.parent} ref={parent_element}>
            <Editor 
                editorState={editorState} 
                onChange={setEditorState}
                blockRendererFn={blockRendererFn} 
            />
        </div>
    );
};

export default TextEditorDisplay;
