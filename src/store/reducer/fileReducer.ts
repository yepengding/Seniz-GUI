import {CREATE_FILE, DELETE_FILE, FILE_ERROR, GET_FILE, UPDATE_FILE} from '../actionType'

const initialState = {
    currentFile: {

    },
    message: null,
    loading: true
}

const fileReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case GET_FILE:
        case UPDATE_FILE:
        case CREATE_FILE:
            return {
                ...state,
                currentFile: action.payload.data,
                loading: false
            }
        case DELETE_FILE:
        case FILE_ERROR:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state
    }

}

export default fileReducer
