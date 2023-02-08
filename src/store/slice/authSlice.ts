import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils-error";
import axios from "axios";
import {authLogin, LoginDataType} from "../../api/todolist-api";
import {setIsInitialized, setLoading} from "./appSlice";

const initialState: InitialStateType = {
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})


//asyncThunk
export const loginTC = (data: LoginDataType) => async (dispatch: AppDispatchType) => {
    dispatch(setLoading({status: 'loading'}))
    try {
        const res = await authLogin.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setLoading({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<{error: string}>(e)) {
            const error = e.response?.data ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, error)
        }
    }
}
export const meTC = () => async (dispatch: AppDispatchType) => {
    dispatch(setLoading({status: 'loading'}))
    try {
        const res = await authLogin.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setLoading({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<{error: string}>(e)) {
            const error = e.response?.data ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, error)
        }
    } finally {
        dispatch(setIsInitialized({isInitialized: true}))
    }
}
export const logoutTC = () => async (dispatch: AppDispatchType) => {
    dispatch(setLoading({status: 'loading'}))
    try {
        const res = await authLogin.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            dispatch(setLoading({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<{error: string}>(e)) {
            const error = e.response?.data ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, error)
        }
    }
}

//types
type InitialStateType = {
    isLoggedIn: boolean,
}

const {setIsLoggedIn} = authSlice.actions