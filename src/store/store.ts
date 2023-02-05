import {configureStore} from '@reduxjs/toolkit'
import {todolistSlice} from '../reducers/todolistSlice'
import {taskSlice} from "../reducers/taskSlice";

export const store = configureStore({
    reducer: {
        todolist: todolistSlice.reducer,
        task: taskSlice.reducer
    },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store