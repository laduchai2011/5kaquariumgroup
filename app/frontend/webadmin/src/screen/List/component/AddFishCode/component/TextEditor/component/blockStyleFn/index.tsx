import './style.css';
import {
    EditorState,
    ContentBlock,
    Modifier
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Map as ImmutableMap } from 'immutable';
import type { Alignment } from './type';



const blockStyleFn = (contentBlock: ContentBlock): string => {
    const data = contentBlock.getData();
    const textAlign = data.get('textAlign') as Alignment | undefined;

    switch (textAlign) {
        case 'center':
            return 'blockStyleFn-align-center';
        case 'right':
            return 'blockStyleFn-align-right';
        default:
            return 'blockStyleFn-align-left';
    }
};

export const setBlockAlignment = (
    editorState: EditorState,
    alignment: Alignment
): EditorState => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const blockData = ImmutableMap({ textAlign: alignment }); // Immutable Map

    const newContent = Modifier.setBlockData(content, selection, blockData);

    return EditorState.push(editorState, newContent, 'change-block-data');
};

export default blockStyleFn;