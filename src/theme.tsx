import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#424242',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
        // background: {
        //     default: '#fff',
        // },
        type: 'dark'
    },
});

export default theme;
