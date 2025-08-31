import React, { useState } from 'react';
import style from './style.module.scss';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    AtomicBlockUtils,
    convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import blockRendererFn from './component/blockRendererFn';




const TextEditor: React.FC<{
    data: string,
    onSave?: (data: string) => void
}> = ({data, onSave}) => {

    const editorStateInit = data.length > 0 ? EditorState.createWithContent(convertFromRaw(JSON.parse(data))) : EditorState.createEmpty();
    const [editorState, setEditorState] = useState(editorStateInit);

    const handleKeyCommand = (command: string): 'handled' | 'not-handled' => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleBold = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const addImage = (url: string) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            " "
        );
        setEditorState(newEditorState);
    };

    const saveContent = () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        if (onSave) {
            onSave(JSON.stringify(rawContent));
        }
    };

    return (
        <div className={style.parent}>
            <div className={style.controller}>
                <button onClick={saveContent}>Save</button>
                <button onClick={toggleBold}>Bold</button>
                <button onClick={() => addImage("https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi.jpg")}>
                    Thêm ảnh
                </button>
            </div>
            <div style={{ border: '1px solid #ccc', minHeight: 100, padding: 10 }}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    blockRendererFn={blockRendererFn}
                />
            </div>
        </div>
    );
};

export default TextEditor;
