import {connect} from "react-redux";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getProjectList} from "../../store/action/projectAction";
import {Project} from "../../store/model";

const ProjectList = (props: any) => {

    const classes = useStyles();

    useEffect(() => {
        props.getProjectList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <FormControl className={classes.projectSelect}>
            <Select
                // value={age}
                // onChange={handleChange}
            >
                {props.projectList.map((project: Project) =>
                    <MenuItem value={project.id}>{project.name}</MenuItem>
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

export default connect(mapStateToProps, {getProjectList})(ProjectList)
