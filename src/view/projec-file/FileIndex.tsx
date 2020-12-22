import React, {useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {createFile, updateFile} from "../../store/action/fileAction";
import Box from "@material-ui/core/Box";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SaveIcon from "@material-ui/icons/Save";
import {ProjectFile} from "../../store/model";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import FileList from "./FileList";

const FileIndex = (props: any) => {

    const [createFileOpen, setCreateFileOpen] = useState(false);

    const [disableCreateFileBtn, setDisableCreateFileBtn] = useState(true);

    const filenameRef = useRef<any>("");

    const createFile = () => {
        const newFile: ProjectFile = {
            name: filenameRef.current.value,
            content: "",
            projectId: props.currentProject.id as number
        };
        props.createFile(newFile);
        setCreateFileOpen(false);
        setDisableCreateFileBtn(true);
    }

    const saveFile = () => {
        props.currentFile.content = props.content;
        props.updateFile(props.currentFile);
    }

    return (
        <div>
            <Box m={1}>
                <IconButton onClick={() => {
                    setCreateFileOpen(true)
                }} disabled={props.currentProject.id === undefined}>
                    <NoteAddIcon/>
                </IconButton>
                <IconButton onClick={saveFile} disabled={props.currentFile.id === undefined}>
                    <SaveIcon/>
                </IconButton>
            </Box>

            {/* File list */}
            <FileList/>

            {/* Create file dialog */}
            <Dialog open={createFileOpen} onClose={() => {
                setCreateFileOpen(false);
                setDisableCreateFileBtn(true);
            }} aria-labelledby="create-file-dialog">
                <DialogTitle id="form-dialog-title">Create new file</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        label="File name"
                        fullWidth
                        inputRef={filenameRef}
                        onChange={(e) => {
                            setDisableCreateFileBtn(e.target.value.length === 0)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setCreateFileOpen(false);
                        setDisableCreateFileBtn(true);
                    }} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={createFile} color="secondary" disabled={disableCreateFileBtn}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );

}

const mapStateToProps = (state: any) => ({
    currentFile: state.fileData.currentFile,
    currentProject: state.projectData.currentProject
});

export default connect(mapStateToProps, {createFile, updateFile})(FileIndex)
