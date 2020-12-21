import {CLOSE_SNACKBAR, OPEN_SNACKBAR} from "../actionType";

export const openSnackbar = (msg: string) => (dispatch: any) => {

    dispatch({
        type: OPEN_SNACKBAR,
        payload: msg
    })

}

export const closeSnackbar = () => (dispatch: any) => {

    dispatch({
        type: CLOSE_SNACKBAR,
        payload: ""
    })

}
