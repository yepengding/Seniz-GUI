import {connect} from "react-redux";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import React, {ChangeEvent, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getProject, getProjectFileList, getProjectList} from "../../store/action/projectAction";
import {Project} from "../../store/model";

const ProjectList = (props: any) => {

    const classes = useStyles();

    useEffect(() => {
        props.getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const projectChange = (event: ChangeEvent<{ value: unknown }>) => {
        const id = event.target.value as number;
        props.getProject(id);
        props.getProjectFileList(id);
    }

    return (
        <FormControl className={classes.projectSelect}>
            <Select
                defaultValue={''}
                value={props.value}
                onChange={projectChange}
            >
                {props.projectList.map((project: Project) =>
                    <MenuItem value={project.id} key={project.id}>{project.name}</MenuItem>
                )}

            </Select>
        </FormControl>
    );

}

const useStyles = makeStyles((theme) => ({
    projectSelect: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


const mapStateToProps = (state: any) => ({
    projectList: state.projectData.projectList,
});

export default connect(mapStateToProps, {getProject, getProjectList, getProjectFileList})(ProjectList)
