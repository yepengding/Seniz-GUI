import React, {useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {getFiles} from "./store/action/fileAction";
import {SourceFile} from "./store/model";

const FileList = (props: any) => {

    useEffect(() => {
        props.getFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fileList = (
        <List dense={true}>
            {props.files.map((file: SourceFile) =>
                <ListItem button key={file.id}>
                    <ListItemIcon>
                        <FolderIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={file.name}
                    />
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
    files: state.fileData.stateData,
    loading: state.fileData.loading
});

export default connect(mapStateToProps, {getFiles})(FileList)
