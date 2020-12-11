import {GET_FILES, GET_FILES_ERROR} from '../actionType'
import request from '../../api/request'

export const getFiles = () => async (dispatch: any) => {

    try {
        const res = await request.get('file/list')
        dispatch({
            type: GET_FILES,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: GET_FILES_ERROR,
            payload: console.log(e),
        })
    }

}
