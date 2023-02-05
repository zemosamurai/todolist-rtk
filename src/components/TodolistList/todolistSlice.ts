import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

const initialState: InitialStateType = {
    todolists: []
}

export const removeTodolistAC = createAction('REMOVE-TODOLIST', (todoId: string) => {
    return {
        payload: {
            todoId
        }
    }
})
export const addTodolistAC = createAction('ADD-TODOLIST', (title: string) => {
    return {
        payload: {
            title,
            todoId: v1()
        }
    }
})

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        changeFiler: (state, action: PayloadAction<{ todoId: string, filter: FilterValueType }>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todoId: string, title: string }>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.title = action.payload.title
        },

    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            state.todolists = state.todolists.filter(el => el.id !== action.payload.todoId)
        })
        builder.addCase(addTodolistAC, (state, action) => {
            const newTodo: TodolistType = {id: action.payload.todoId, title: action.payload.title, filter: 'all'}
            state.todolists.unshift(newTodo)
        })
    }
})

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type InitialStateType = {
    todolists: TodolistType[]
}
