import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1fd655'
        },
        secondary: {
            main: '#FF0D86'
        },
        gradientBackground: {
            primary: 'linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(97, 149, 219) 158.5%)'
        },
        navBackground: {
            primary: 'rgb(0, 10, 110)'
        }
    },
    
    });

theme = responsiveFontSizes(theme);

export default theme;