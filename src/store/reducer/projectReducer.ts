import {CREATE_PROJECT, GET_PROJECTS} from "../actionType";

const initialState = {
    currentProject: {},
    projectList: []
}

const projectReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case CREATE_PROJECT:
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

        default:
            return state
    }

}

export default projectReducer
