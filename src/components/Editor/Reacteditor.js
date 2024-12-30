import * as React from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from "./Tools";

function Reacteditor(props){

    const editorInstance = props.instance;
    const initEditorCalled = React.useRef(false); // to prevent double rendering from react strict mode 

    /*
    * See Warning 1 #1
    */
    const initEditor = React.useCallback((content) => {
            console.log('Editor Init--->');
            //console.log('content ',content);
            initEditorCalled.current = true;
            const editor = new EditorJS({
                holder: 'editorjs', // ID of the div where Editor.js will be initialized
                data: content,   // Initial data, if any
                onReady: () => {
                    editorInstance.current = editor;
                },
                /*onChange: async () => {
                const content = await editorInstance.current.save();
                console.log(content);
                /*if (onChange) {
                    onChange(content);
                }*/
                //},
                //autofocus: true,    // Optionally focus the editor on initialization
                tools: EDITOR_JS_TOOLS,
            });
    },[editorInstance]);

    /*
    * See Warning 1 #2
    */
    React.useEffect(() => {
        if (!initEditorCalled.current) {
            const content = sessionStorage.getItem('editorContent');
            //if (content === null) initEditor({});
            /*if (props.newContent !== null){
                content = props.newContent
            }*/  
            initEditor(JSON.parse(content));  
        }
        if(props.newcontent !== null){
            const content = props.newcontent;
            initEditor(content);  
        }
        return () => {
            editorInstance?.current?.destroy();
            editorInstance.current = null;
          };
    }, [editorInstance, initEditor , props.newcontent]);

    return (
        <div id="editorjs" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }} />
    );
}

export default Reacteditor;