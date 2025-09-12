import React, { useState, useContext, useRef, useEffect } from 'react';
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
import blockStyleFn, { setBlockAlignment } from './component/blockStyleFn';
import type { Alignment } from './component/blockStyleFn/type';
import { ListContext } from '@src/screen/List/context';
import { FaFileImage } from "react-icons/fa";
import { IMAGE_API } from '@src/const/api/image';
import axios from 'axios';



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
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // const [file, setFile] = useState<File | null>(null);
    const [pendingFiles, setPendingFiles] = useState<{ localUrl: string, file: File }[]>([]);
    const [preview, setPreview] = useState<string>("");

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

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        }
    }, [preview])

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
   

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    // const handleUpload = async () => {
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append("image", file);

    //     try {
    //         const res = await axios.post(IMAGE_API.UPLOAD_AIMAGE, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         // console.log("Uploaded:", res.data.file);
    //         return res;
    //     } catch (err) {
    //         console.error(err);
    //         setMessage({
    //             message: 'Thay đổi ảnh đại diện thất bại !',
    //             type: 'error'
    //         })
    //     }
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            // setFile(file_);
            const localUrl = URL.createObjectURL(e.target.files[0])
            setPreview(localUrl);
            addImage(localUrl)
            setPendingFiles(prev => [...prev, { localUrl, file }]);
        }
    };

    const saveContent = async () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        let contentString = JSON.stringify(rawContent);
        if (onSave) {
            for (const { localUrl, file } of pendingFiles) {
                try {
                    const formData = new FormData();
                    formData.append("image", file);
                    const res = await axios.post<{file: string}>(IMAGE_API.UPLOAD_AIMAGE, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    const uploadedUrl = IMAGE_API.GET_IMAGE + '/' + res.data.file;
                    // Thay localUrl bằng uploadedUrl trong chuỗi JSON
                    contentString = contentString.replaceAll(localUrl, uploadedUrl);
                } catch (error) {
                    console.error("Upload failed", error);
                    setMessage({ message: 'Tải ảnh thất bại!', type: 'error' });
                } 
            }

            onSave(contentString);
            setMessage({
                message: 'Lưu chi tiết thành công !',
                type: 'success'
            })
        }
    };

    const handleAlign = (alignment: Alignment) => {
        const newState = setBlockAlignment(editorState, alignment);
        setEditorState(EditorState.forceSelection(newState, newState.getSelection()));
    };

    useEffect(() => {
        console.log(
            editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getData().toJS()
        );
    }, [editorState])

    return (
        <div className="TextEditor">
            <div className='TextEditor-controler'>
                <button onClick={saveContent}>Lưu</button>
                <button onClick={toggleBold}>Đậm</button>
                <button onClick={() => handleAlign('left')}>Trái</button>
                <button onClick={() => handleAlign('center')}>Giữa</button>
                <button onClick={() => handleAlign('right')}>Phải</button>
                <div className='TextEditor-controler-addImage'>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <FaFileImage
                        title='Chọn ảnh'
                        size={30}
                        style={{ cursor: "pointer" }}
                        color='greenyellow'
                        onClick={handleIconClick}
                    />
                </div>
            </div>
            <div className='TextEditor-editorContainer' style={{ border: '1px solid #ccc', minHeight: 100, padding: 10 }}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    blockRendererFn={blockRendererFn}
                    blockStyleFn={blockStyleFn}
                />
            </div>
        </div>
    );
};

export default TextEditor;
