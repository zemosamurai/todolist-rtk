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

export const AppBarHeader = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static">
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
                {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log Out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress color="success"/>}
        </AppBar>
    );
}