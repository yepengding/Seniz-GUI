import {CREATE_PROJECT, GET_PROJECT, GET_PROJECT_FILES, GET_PROJECTS} from "../actionType";

const initialState = {
    currentProject: {},
    projectList: [],
    fileList: []
}

const projectReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case CREATE_PROJECT:
            return {
                ...state,
                currentProject: action.payload.data,
                loading: false
            }
        case GET_PROJECT:
            return {
                ...state,
                currentProject: action.payload.data,
                loading: false
            }
        case GET_PROJECTS:
            return {
                ...state,
                projectList: action.payload.data,
                loading: false
            }
        case GET_PROJECT_FILES:
            return {
                ...state,
                fileList: action.payload.data,
                loading: false
            }

        default:
            return state
    }

}

export default projectReducer
