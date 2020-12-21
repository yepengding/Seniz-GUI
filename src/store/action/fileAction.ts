import {GET_FILE, GET_FILES, FILE_ERROR, CREATE_FILE, UPDATE_FILE, DELETE_FILE} from '../actionType'
import request from '../../api/request'
import {ProjectFile} from "../model";

export const getFile = (id: number) => async (dispatch: any) => {
    try {
        const res = await request.get('file/get/' + id)
        dispatch({
            type: GET_FILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FILE_ERROR,
            payload: console.log(e),
        })
    }
}

export const createFile = (file: ProjectFile) => async (dispatch: any) => {
    try {
        const res = await request.post('file/create', file)
        if (res.data.code === 200) {
            dispatch({
                type: CREATE_FILE,
                payload: res.data
            });
        } else {
            dispatch({
                type: FILE_ERROR,
                payload: res.data.message
            })
        }

    } catch (e) {
        dispatch({
            type: FILE_ERROR,
            payload: console.log(e),
        })
    }
}

export const updateFile = (file: ProjectFile) => async (dispatch: any) => {
    try {
        const res = await request.post('file/update', file)
        dispatch({
            type: UPDATE_FILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FILE_ERROR,
            payload: console.log(e),
        })
    }
}

export const deleteFile = (id: number) => async (dispatch: any) => {
    try {
        const res = await request.post('file/delete/' + id)
        dispatch({
            type: DELETE_FILE,
            payload: res.data.message
        })
    } catch (e) {
        dispatch({
            type: FILE_ERROR,
            payload: console.log(e),
        })
    }
}

export const getFileList = () => async (dispatch: any) => {

    try {
        const res = await request.get('file/list')
        dispatch({
            type: GET_FILES,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FILE_ERROR,
            payload: console.log(e),
        })
    }

}
