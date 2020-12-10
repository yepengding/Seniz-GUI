import {GET_FILES} from '../actionType'

const initialState = {
    files: [],
    loading: true
}

export default function(state = initialState, action: any){

    switch(action.type){

        case GET_FILES:
            return {
                ...state,
                files: action.payload,
                loading: false

            }
        default: return state
    }

}
