import {configureStore} from '@reduxjs/toolkit'
import {todolistSlice} from './slice/todolistSlice'
import {taskSlice} from "./slice/taskSlice";
import {appSlice} from "./slice/appSlice";
import {authSlice} from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        todolist: todolistSlice.reducer,
        task: taskSlice.reducer,
        app: appSlice.reducer,
        auth: authSlice.reducer
    },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store