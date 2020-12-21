import React, {useEffect, useRef, useState} from 'react';
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
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SaveIcon from '@material-ui/icons/Save';


import FileList from "./FileList";
import SenizEditor from "./editor/SenizEditor";
import {connect} from "react-redux";
import {compileFile} from "./store/action/compileAction";
import {ProjectFile} from "./store/model";

import {defaultPreview} from "./data/default";

import SenizViewer from "./preview/SenizViewer";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField
} from "@material-ui/core";
import {createFile, getFile, getFileList, updateFile} from "./store/action/fileAction";
import {closeSnackbar, openSnackbar} from "./store/action/appAction";
import {demoCode} from "./data/demo";

const App = (props: any) => {
    const classes = useStyles();
    const editorPaper = clsx(classes.paper, classes.editorHeight);
    const outputPaper = clsx(classes.paper, classes.outputHeight);

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [createFileOpen, setCreateFileOpen] = useState(false);
    const [disableCreateFileBtn, setDisableCreateFileBtn] = useState(true);
    const [editorValue, setEditorValue] = useState("");
    const [message, setMessage] = useState("");
    const [previewValue, setPreviewValue] = useState(defaultPreview);

    const filenameRef = useRef<any>("");

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

    const createFile = () => {
        const newFile: ProjectFile = {
            name: filenameRef.current.value,
            content: "",
            projectId: 1
        };
        props.createFile(newFile);
        setCreateFileOpen(false);
        setDisableCreateFileBtn(true);
    }

    const saveFile = () => {
        props.currentFile.content = editorValue;
        props.updateFile(props.currentFile);
    }

    return (
        <div className={classes.root}>
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
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Seniz GUI
                    </Typography>
                    <IconButton onClick={loadDemoCode}>
                        <HourglassEmptyIcon/>
                    </IconButton>
                    <IconButton onClick={visualize}>
                        <CameraIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
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

                <Box m={1}>
                    <IconButton onClick={() => {
                        setCreateFileOpen(true)
                    }}>
                        <NoteAddIcon/>
                    </IconButton>
                    <IconButton onClick={saveFile}>
                        <SaveIcon/>
                    </IconButton>
                </Box>

                <FileList/>

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

            {/* Create file dialog */}
            <Dialog open={createFileOpen} onClose={() => {
                setCreateFileOpen(false);
                setDisableCreateFileBtn(true);
            }} aria-labelledby="create-file-dialog">
                <DialogTitle id="form-dialog-title">Create new file</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input file name:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="File name"
                        fullWidth
                        inputRef={filenameRef}
                        onChange={(e) => {
                            setDisableCreateFileBtn(e.target.value.length === 0)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setCreateFileOpen(false);
                        setDisableCreateFileBtn(true);
                    }} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={createFile} color="secondary" disabled={disableCreateFileBtn}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

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

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://yepengding.github.io/" target={"_blank"}>
                Yepeng Ding
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
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
    currentFile: state.fileData.currentFile,
    fileList: state.fileData.fileList,
    fileMsg: state.fileData.message,
    compileInfo: state.compileData.stateData
});

export default connect(mapStateToProps, {
    openSnackbar,
    closeSnackbar,
    createFile,
    updateFile,
    getFile,
    getFileList,
    compileFile
})(App)
