import React from 'react';
import clsx from 'clsx';
import {connect} from 'react-redux'
import {getFiles} from './store/action/fileAction'

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import SenizEditor from "./editor/SenizEditor";
// import Editor from "@monaco-editor/react";


const App = (props: any) => {
    const classes = useStyles();
    const editorPaper = clsx(classes.paper, classes.editorHeight);
    const outputPaper = clsx(classes.paper, classes.outputHeight);

    const [open, setOpen] = React.useState(true);
    const editorValue = React.useRef<any>();

    console.log(props.files);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const showEditorValue = () => {
        props.getFiles();
        console.log(props.files)
        if (editorValue.current !== undefined) {
            console.log(editorValue.current());
        }
    }

    return (
        <div className={classes.root}>
            <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, {[classes.menuButtonHidden]: open})}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Seniz GUI
                    </Typography>
                    <IconButton color="inherit" onClick={showEditorValue}>
                        <CameraIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, {[classes.drawerPaperClose]: !open}),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    {/*<Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>*/}
                    {/*    <Link color="inherit" href="https://www-sato.cc.u-tokyo.ac.jp/DING.Yepeng/">*/}
                    {/*        Seniz GUI*/}
                    {/*    </Link>*/}
                    {/*</Typography>*/}
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>

                </div>

                <Divider/>

                <IconButton color="inherit">
                    <InsertDriveFileIcon/>
                </IconButton>
                <FileList/>

                <Divider/>
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Editor */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={editorPaper}>
                                <SenizEditor
                                    forwardedRef={editorValue}
                                />
                            </Paper>
                        </Grid>
                        {/* Graphic */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={editorPaper}>

                            </Paper>
                        </Grid>
                        {/* Output */}
                        <Grid item xs={12}>
                            <Paper className={outputPaper}>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

const FileList = () => {

    const classes = useFileStyles();

    function generate(element: any) {
        // @ts-ignore
        return [...Array(100).keys()].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    return (
        <div>
            <List dense={true} className={classes.fileList}>
                {generate(
                    <ListItem button>
                        <ListItemIcon>
                            <FolderIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="filename"
                        />
                    </ListItem>,
                )}
            </List>
        </div>

    );
}

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www-sato.cc.u-tokyo.ac.jp/DING.Yepeng/">
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

const useFileStyles = makeStyles((theme) => ({
    fileList: {
        paddingTop: theme.spacing(4),
        position: 'absolute'
    },
}));

const mapStateToProps  = (state: any) => ({files: state.files})

export default connect(mapStateToProps, {getFiles})(App)
