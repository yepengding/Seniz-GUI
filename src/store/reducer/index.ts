import { combineReducers } from 'redux'
import appReducer from "./appReducer";
import fileReducer from './fileReducer'
import compileReducer from "./compileReducer";

export default combineReducers({
    appData: appReducer,
    fileData: fileReducer,
    compileData: compileReducer
})
