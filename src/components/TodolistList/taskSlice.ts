import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolistSlice";

const initialState: InitialStateType = {
    tasks: {}
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            state.tasks[action.payload.todoId] = state.tasks[action.payload.todoId]
                .filter(el => el.id !== action.payload.taskId)
        },
        addTask: (state, action: PayloadAction<{ todoId: string, title: string }>) => {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            state.tasks[action.payload.todoId].unshift(newTask)
        },
        changeTaskStatus: (state, action: PayloadAction<{ todoId: string, taskId: string, isDone: boolean }>) => {
            const task = state.tasks[action.payload.todoId].find(el => el.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        },
        changeTaskTitle: (state, action: PayloadAction<{ todoId: string, taskId: string, title: string }>) => {
            const task = state.tasks[action.payload.todoId].find(el => el.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state.tasks[action.payload.todoId]
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state.tasks[action.payload.todoId] = []
        })
    }
})

//types
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type InitialStateType = {
    tasks: TaskStateType
}