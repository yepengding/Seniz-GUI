import React, {useEffect, useState, useRef} from 'react';
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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import FileList from "./FileList";
import SenizEditor from "./editor/SenizEditor";
import Viewer from 'react-viewer';
import {connect} from "react-redux";
import {compileFile} from "./store/action/compileAction";
import {SourceFile} from "./store/model";

const App = (props: any) => {
    const classes = useStyles();
    const editorPaper = clsx(classes.paper, classes.editorHeight);
    const outputPaper = clsx(classes.paper, classes.outputHeight);

    const [open, setOpen] = useState(true);
    const [editorValue, setEditorValue] = useState("// write your code here");

    const [visible, setVisible] = useState(false);

    const [imageURL, setImageURL] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.compileInfo.data) {
            setImageURL(`https://quickchart.io/graphviz?graph=${props.compileInfo.data}`);
        } else {
            setImageURL("");
        }
        if (props.compileInfo.message) {
            setMessage(props.compileInfo.message);
        } else {
            setMessage("");
        }
    }, [props.compileInfo]);

    const currentFile: SourceFile = {
        id: 1,
        name: "file 1",
        size: 100,
        content: ""
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const visualize = () => {
        currentFile.content = editorValue;
        props.compileFile(currentFile);
    }

    const test = () => {
        setEditorValue("// Demo code\n" +
            "system TS over Vars {\n" +
            "    init s0 -> [a1] s1\n" +
            "\n" +
            "    s0 = {\n" +
            "        v: 0\n" +
            "    }\n" +
            "    \n" +
            "    s1 = {\n" +
            "        v: 1\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "variable Vars {\n" +
            "    v :: int\n" +
            "}");
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
                    <IconButton onClick={test}>
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

                <IconButton>
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
                                    value={editorValue}
                                    setValue={setEditorValue}
                                />
                            </Paper>
                        </Grid>
                        {/* Graphic */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={editorPaper}>
                                <div>
                                    <img src={imageURL} onClick={() => {
                                        setVisible(true);
                                    }} alt={'Graph'}/>
                                    <Viewer
                                        visible={visible}
                                        onClose={() => {
                                            setVisible(false);
                                        }}
                                        images={[{src: imageURL, alt: 'Graph'}]}
                                    />
                                </div>
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

const mapStateToProps = (state: any) => ({
    compileInfo: state.compileData.stateData
});

export default connect(mapStateToProps, {compileFile})(App)
