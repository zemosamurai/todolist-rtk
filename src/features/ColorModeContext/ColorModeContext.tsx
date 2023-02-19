import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import App from "../../app/App";
import {useMediaQuery} from "@mui/material";
import {blue, deepPurple} from "@mui/material/colors";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export const ToggleColorMode = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const defaultMode = prefersDarkMode ? 'dark' : 'light'
    const [mode, setMode] = React.useState<'light' | 'dark'>(defaultMode);

    const colorMode = React.useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        }
    }), []);

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'dark' ? deepPurple[800] : blue[700]
            },
        }
    }), [mode])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}