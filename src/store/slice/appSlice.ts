import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialState = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },

})


// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialState = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}

export const {setLoading, setError, setIsInitialized} = appSlice.actions

