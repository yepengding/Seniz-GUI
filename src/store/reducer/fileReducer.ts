import {GET_FILES} from '../actionType'

const initialState = {
    stateData: [],
    loading: true
}

const fileReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case GET_FILES:
            return {
                ...state,
                stateData: action.payload.data,
                loading: false
            }

        default:
            return state
    }

}

export default fileReducer
