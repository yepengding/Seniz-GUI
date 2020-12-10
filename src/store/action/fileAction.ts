import {GET_FILES, GET_FILES_ERROR} from '../actionType'
import axios from 'axios'

export const getFiles = () => async (dispatch: any) => {

    try{
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        dispatch( {
            type: GET_FILES,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_FILES_ERROR,
            payload: console.log(e),
        })
    }

}
