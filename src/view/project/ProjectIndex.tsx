import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import {connect} from "react-redux";
import {createProject, getProjectList} from "../../store/action/projectAction";
import ProjectList from "./ProjectList";
import {Project} from "../../store/model";

const ProjectIndex = (props: any) => {

    const [createOpen, setCreateOpen] = useState(false);
    const [disableCreateBtn, setDisableCreateBtn] = useState(true);

    const [selectValue, setSelectValue] = useState('');

    const nameRef = useRef<any>("");
    const descRef = useRef<any>("");

    // Update current project
    useEffect(() => {
        if (props.currentProject.id !== undefined) {
            props.getProjectList().then(()=>{
                setSelectValue(props.currentProject.id);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentProject.id])

    const createProject = () => {
        const newProject: Project = {
            name: nameRef.current.value,
            description: descRef.current.value
        };
        props.createProject(newProject);
        setCreateOpen(false);
        setDisableCreateBtn(true);
    }

    return (
    <Box>
        {/* Project List */}
        <ProjectList value={selectValue}/>

        {/* Create project */}
        <IconButton onClick={() => {setCreateOpen(true)}}>
            <LibraryAddIcon/>
        </IconButton>
        {/* Create project dialog */}
        <Dialog open={createOpen} onClose={() => {
            setCreateOpen(false);
            setDisableCreateBtn(true);
        }} aria-labelledby="create-project-dialog">
            <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    label="Project name"
                    fullWidth
                    inputRef={nameRef}
                    onChange={(e) => {
                        setDisableCreateBtn(e.target.value.length === 0)
                    }}
                />
                <TextField
                    margin="dense"
                    label="Project description"
                    fullWidth
                    inputRef={descRef}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setCreateOpen(false);
                    setDisableCreateBtn(true);
                }} color="secondary">
                    Cancel
                </Button>
                <Button onClick={createProject} color="secondary" disabled={disableCreateBtn}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );

}

const mapStateToProps = (state: any) => ({
    currentProject: state.projectData.currentProject
});

export default connect(mapStateToProps, {createProject, getProjectList})(ProjectIndex)
