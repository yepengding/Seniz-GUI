import {CREATE_PROJECT, GET_PROJECTS, PROJECT_ERROR} from '../actionType'
import request from '../../api/request'
import {Project} from "../model";

export const createProject = (project: Project) => async (dispatch: any) => {
    try {
        const res = await request.post('project/create', project)
        if (res.data.code === 200) {
            dispatch({
                type: CREATE_PROJECT,
                payload: res.data
            });
        } else {
            dispatch({
                type: PROJECT_ERROR,
                payload: res.data.message
            })
        }

    } catch (e) {
        dispatch({
            type: PROJECT_ERROR,
            payload: console.log(e),
        })
    }
}

export const getProjectList = () => async (dispatch: any) => {

    try {
        const res = await request.get('project/list')
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: PROJECT_ERROR,
            payload: console.log(e),
        })
    }

}
