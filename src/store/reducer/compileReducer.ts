import {COMPILE_FILE} from '../actionType'

const initialState = {
    stateData: {},
    loading: true
}

const compileReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case COMPILE_FILE:
            return {
                ...state,
                stateData: action.payload,
                loading: false
            }

        default:
            return state
    }

}

export default compileReducer
