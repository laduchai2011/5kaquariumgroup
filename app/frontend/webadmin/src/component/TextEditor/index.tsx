import React, { useState, useContext } from 'react';
import './style.css';
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
import { ListContext } from '@src/screen/List/context';



const TextEditor: React.FC<{
    data: string,
    onSave?: (data: string) => void
}> = ({data, onSave}) => {
    const listContext = useContext(ListContext)
    if (!listContext) {
        throw new Error("listContext in TextEditor component cant undefined !");
    }
    const {
        setMessage
    } = listContext;

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
            setMessage({
                message: 'Lưu chi tiết thành công !',
                type: 'success'
            })
        }
    };

    return (
        <div className="TextEditor">
            <div className='TextEditor-controler'>
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
