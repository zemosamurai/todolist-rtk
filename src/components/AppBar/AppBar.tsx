import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {RequestStatusType} from "../../store/slice/appSlice";
import {logoutTC} from "../../store/slice/authSlice";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {useTheme} from "@mui/material/styles";
import {ColorModeContext} from "../../features/ColorModeContext/ColorModeContext";

export const AppBarHeader = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);


    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" component="nav">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>


                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    News
                </Typography>

                <IconButton sx={{mr: 2}} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>

                {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log Out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress color="success"/>}
        </AppBar>
    );
}