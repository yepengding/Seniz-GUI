import {monaco} from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import {ControlledEditor} from "@monaco-editor/react";

import React from "react";

import {registerLanguage} from "./language-register";

monaco
    .init()
    .then((monacoInstance) => {
        // MonacoEnvironment = {
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
        //         return './editor.worker.js';
        //     }
        // }
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

    const handleEditorChange = (ev: any, value: any) => {
        props.setValue(value);
    };

    return (
        <ControlledEditor
            language={"seniz"}
            theme={"dark"}
            value={props.value}
            onChange={handleEditorChange}
        />
    );
}

export default SenizEditor;
