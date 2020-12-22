import {combineReducers} from 'redux'
import appReducer from "./appReducer";
import fileReducer from './fileReducer'
import compileReducer from "./compileReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
    appData: appReducer,
    projectData: projectReducer,
    fileData: fileReducer,
    compileData: compileReducer
})
