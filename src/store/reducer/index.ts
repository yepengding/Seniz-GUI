import { combineReducers } from 'redux'
import fileReducer from './fileReducer'
import compileReducer from "./compileReducer";

export default combineReducers({
    fileData: fileReducer,
    compileData: compileReducer
})
