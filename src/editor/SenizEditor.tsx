import {monaco} from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import React from "react";

import { registerLanguage } from "./language-register";

// @ts-ignore
// window.MonacoEnvironment = {
//     getWorkerUrl: function (_moduleId: any, label: string) {
//         if (label === 'json') {
//             return './json.worker.bundle.js';
//         }
//         if (label === 'css') {
//             return './css.worker.bundle.js';
//         }
//         if (label === 'html') {
//             return './html.worker.bundle.js';
//         }
//         if (label === 'typescript' || label === 'javascript') {
//             return './ts.worker.bundle.js';
//         }
//         return './editor.worker.bundle.js';
//     }
// };

monaco
    .init()
    .then((monacoInstance) => {
        registerLanguage({
            id: 'seniz',
            extensions: ['.sz'],
            aliases: ['Seniz', 'seniz'],
            mimetypes: ['text/x-seniz-source', 'text/x-seniz'],
            loader: () => import('./seniz-lang')
        });

    })
    .catch((error) =>
        console.error("An error occurred during initialization of Monaco: ", error)
    );

const SenizEditor = (props: any) => {
    const valueGetter = props.forwardedRef;

    const handleEditorDidMount = (_valueGetter: any) => {
        valueGetter.current = _valueGetter;
    }

    return (
        <Editor
            language={"seniz"}
            theme={"dark"}
            value={"// write your code here"}
            editorDidMount={handleEditorDidMount}
        />
    );
}

export default SenizEditor;