import {CLOSE_SNACKBAR, OPEN_SNACKBAR} from "../actionType";

const initialState = {
    snackbar: {
        message: '',
        open: false
    }
}

const appReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case OPEN_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    message: action.payload,
                    open: true
                }
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    message: action.payload,
                    open: false
                }
            }

        default:
            return state
    }

}

export default appReducer
