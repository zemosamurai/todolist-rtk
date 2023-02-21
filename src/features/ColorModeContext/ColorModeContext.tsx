import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {useMediaQuery} from "@mui/material";
import {blue, deepPurple} from "@mui/material/colors";

type ToggleColorModePropsType = {
    children: React.ReactNode
}

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export const ToggleColorMode = ({children}: ToggleColorModePropsType) => {
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
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}