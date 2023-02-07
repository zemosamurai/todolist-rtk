import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "../store";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {fetchTasksTC} from "./taskSlice";

const initialState: InitialStateType = {
    todolists: []
}

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            state.todolists = action.payload.map(el => ({...el, filter: 'all'}))
        },
        changeFiler: (state, action: PayloadAction<ChangeFilterType>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodolistTitle: (state, action: PayloadAction<ChangeTodolistTitleType>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.title = action.payload.title
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            state.todolists = state.todolists.filter(el => el.id !== action.payload.todoId)
        })
        builder.addCase(addTodolistAC, (state, action) => {
            const newTodo: TodolistDomainType = {...action.payload.todo, filter: 'all'}
            state.todolists.unshift(newTodo)
        })
    }
})

//actions
export const removeTodolistAC = createAction('REMOVE-TODOLIST', (todoId: string) => ({
    payload: {todoId}
}))
export const addTodolistAC = createAction('ADD-TODOLIST', (todo: TodolistType) => ({
    payload: {todo}
}))

// asyncThunk
export const fetchTodolistsTC = () => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.getTodolists()
        dispatch(todolistSlice.actions.setTodolists(res.data))
        res.data.forEach((el) => {
            dispatch(fetchTasksTC(el.id))
        })
    } catch (e) {

    }
}
export const addTodolistTC = (title: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e) {

    }
}
export const removeTodolistTC = (todoId: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.deleteTodolist(todoId)
        dispatch(removeTodolistAC(todoId))
    } catch (e) {

    }
}
export const changeTodolistTitleTC = (todoId: string, title: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.updateTodolist(todoId, title)
        dispatch(todolistSlice.actions.changeTodolistTitle({todoId, title}))
    } catch (e) {

    }
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}
type InitialStateType = {
    todolists: TodolistDomainType[]
}
type ChangeFilterType = {
    todoId: string
    filter: FilterValueType
}
type ChangeTodolistTitleType = {
    todoId: string,
    title: string
}
