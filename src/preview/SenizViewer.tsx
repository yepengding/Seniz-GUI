import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import {AutoSizer} from 'react-virtualized';
import parse from 'html-react-parser';

const SenizViewer = (props: any) => {

    const classes = useStyles();

    return (
        <div className={classes.viewer}>
            <AutoSizer>
                {(({width, height}) => width === 0 || height === 0 ? null : (
                    <UncontrolledReactSVGPanZoom
                        width={width} height={height}
                        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                    >
                        {parse(props.preview)}
                    </UncontrolledReactSVGPanZoom>
                ))}
            </AutoSizer>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    viewer: {
        height: "100%",
        width: "100%"
    }
}));

export default SenizViewer
