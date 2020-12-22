import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CameraIcon from '@material-ui/icons/Camera';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SenizEditor from "./editor/SenizEditor";
import {connect} from "react-redux";
import {compileFile} from "./store/action/compileAction";

import {defaultPreview} from "./data/default";

import SenizViewer from "./preview/SenizViewer";
import {Snackbar} from "@material-ui/core";
import {createFile, getFile, getFileList, updateFile} from "./store/action/fileAction";
import {closeSnackbar, openSnackbar} from "./store/action/appAction";
import {demoCode} from "./data/demo";
import Copyright from "./view/CopyRight";
import FileOperation from "./view/projec-file/FileIndex";
import ProjectOperation from "./view/project/ProjectIndex";
import {getProjectList} from "./store/action/projectAction";

const App = (props: any) => {
    const classes = useStyles();
    const editorPaper = clsx(classes.paper, classes.editorHeight);
    const outputPaper = clsx(classes.paper, classes.outputHeight);

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [editorValue, setEditorValue] = useState("");
    const [message, setMessage] = useState("");
    const [previewValue, setPreviewValue] = useState(defaultPreview);

    // const filenameRef = useRef<any>("");

    useEffect(() => {
        if (props.fileMsg !== null) {
            props.openSnackbar(props.fileMsg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.fileMsg])

    useEffect(() => {
        if (props.compileInfo.data) {
            setPreviewValue(props.compileInfo.data);
        } else {
            setPreviewValue(defaultPreview);
        }
        if (props.compileInfo.message) {
            setMessage(props.compileInfo.message);
        } else {
            setMessage("");
        }

    }, [props.compileInfo]);

    // Update current project
    useEffect(() => {
        if (props.currentProject.id !== undefined) {
            props.getProjectList();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentProject.id])

    // Update current file
    useEffect(() => {
        if (props.currentFile.id !== undefined) {
            setEditorValue(props.currentFile.content);
            props.getFileList();
        } else {
            setEditorValue("// Write your test code here.")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentFile.id])

    const visualize = () => {
        props.currentFile.content = editorValue;
        props.compileFile(props.currentFile);
    }

    const loadDemoCode = () => {
        setEditorValue(demoCode);
    }

    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                            setDrawerOpen(true)
                        }}
                        className={clsx(classes.menuButton, {[classes.menuButtonHidden]: drawerOpen})}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid container justify="space-between">
                        <Grid item>

                            <ProjectOperation/>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={loadDemoCode}>
                                <HourglassEmptyIcon/>
                            </IconButton>
                            <IconButton onClick={visualize}>
                                <CameraIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>


                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, {[classes.drawerPaperClose]: !drawerOpen}),
                }}
                open={drawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
                        <Link color="inherit" href="https://github.com/yepengding/Seniz" target={"_blank"}>
                            Seniz
                        </Link>
                    </Typography>
                    <IconButton onClick={() => {
                        setDrawerOpen(false)
                    }}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>

                <Divider/>

                {/* File operation and list */}
                <FileOperation content={editorValue}/>


                <Divider/>
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Editor */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={editorPaper}>
                                <SenizEditor
                                    forwardedRef={editorValue}
                                    value={editorValue}
                                    setValue={setEditorValue}
                                />
                            </Paper>
                        </Grid>
                        {/* Graphic */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={editorPaper}>
                                <SenizViewer preview={previewValue}/>
                            </Paper>
                        </Grid>
                        {/* Output */}
                        <Grid item xs={12}>
                            <Paper className={outputPaper}>
                                {message}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>

            {/*  Snackbar  */}
            <Snackbar open={props.snackbar.open}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                      }}
                      autoHideDuration={5000}
                      message={props.snackbar.message}
                      onClose={props.closeSnackbar}
            />
        </div>
    );
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    projectSelect: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    editorHeight: {
        height: 600,
    },
    outputHeight: {
        height: 150,
    },
}));

const mapStateToProps = (state: any) => ({
    snackbar: state.appData.snackbar,
    currentProject: state.projectData.currentProject,
    currentFile: state.fileData.currentFile,
    fileList: state.fileData.fileList,
    fileMsg: state.fileData.message,
    compileInfo: state.compileData.stateData
});

export default connect(mapStateToProps, {
    openSnackbar,
    closeSnackbar,
    getProjectList,
    createFile,
    updateFile,
    getFile,
    getFileList,
    compileFile
})(App)
