import React, {useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {deleteFile, getFile, getFileList} from "../../store/action/fileAction";
import {ProjectFile} from "../../store/model";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const FileList = (props: any) => {

    useEffect(() => {
        props.getFileList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadFile = (fileId: number | undefined) => {
        props.getFile(fileId);
    }

    const deleteFile = (fileId: number | undefined) => {
        if (fileId != null) {
            props.deleteFile(fileId);
        }
        props.getFileList();
    }

    const fileList = (
        <List dense={true}>
            {props.fileList.map((file: ProjectFile) =>
                <ListItem button={true} onClick={() => {loadFile(file.id)}} key={file.id} >
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
    fileList: state.fileData.fileList,
    loading: state.fileData.loading
});

export default connect(mapStateToProps, {getFile, deleteFile, getFileList})(FileList)
