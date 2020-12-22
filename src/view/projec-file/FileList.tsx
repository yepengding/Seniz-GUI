import React, {useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {deleteFile, getFile} from "../../store/action/fileAction";
import {ProjectFile} from "../../store/model";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {getProjectFileList} from "../../store/action/projectAction";

const FileList = (props: any) => {

    useEffect(() => {
        if (props.currentProject.id !== undefined) {
            props.getProjectFileList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadFile = (fileId: number | undefined) => {
        props.getFile(fileId);
    }

    const deleteFile = (fileId: number | undefined) => {
        if (fileId != null) {
            props.deleteFile(fileId);
        }
        props.getProjectFileList();
    }

    const fileList = (
        <List dense={true}>
            {props.fileList.map((file: ProjectFile) =>
                <ListItem button={true} onClick={() => {
                    loadFile(file.id)
                }} key={file.id}>
                    <ListItemIcon>
                        <InsertDriveFileIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={file.name}
                    />
                    <IconButton onClick={() => deleteFile(file.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
            )}
        </List>
    );

    return (
        <div>
            {fileList}
        </div>

    );
}

const mapStateToProps = (state: any) => ({
    currentProject: state.projectData.currentProject,
    fileList: state.projectData.fileList,
    loading: state.fileData.loading
});

export default connect(mapStateToProps, {getFile, deleteFile, getProjectFileList})(FileList)
