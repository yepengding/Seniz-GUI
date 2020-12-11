import {COMPILE_FILE, COMPILE_FILE_ERROR} from '../actionType'
import request from '../../api/request'
import {SourceFile} from "../model";

export const compileFile = (file: SourceFile) => async (dispatch: any) => {

    try {
        const res = await request.post('compile/' + file.id, file)
        dispatch({
            type: COMPILE_FILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: COMPILE_FILE_ERROR,
            payload: console.log(e),
        })
    }

}
