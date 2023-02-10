import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "../store";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {fetchTasksTC} from "./taskSlice";
import {RequestStatusType, setLoading} from "./appSlice";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils-error";


const initialState: InitialStateType = {
    todolists: []
}


export const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            state.todolists = action.payload.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoFilter: (state, action: PayloadAction<ChangeFilterType>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodoTitle: (state, action: PayloadAction<ChangeTodolistTitleType>) => {
            const todo = state.todolists.find(el => el.id === action.payload.todoId)
            if (todo) todo.title = action.payload.title
        },
        setTodoEntityStatus: (state, action: PayloadAction<{ todoId: string, entityStatus: RequestStatusType }>) => {
            state.todolists.forEach(el => el.id === action.payload.todoId
                ? el.entityStatus = action.payload.entityStatus : el)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            state.todolists = state.todolists.filter(el => el.id !== action.payload.todoId)
        })
        builder.addCase(addTodolistAC, (state, action) => {
            const newTodo: TodolistDomainType = {...action.payload.todo, filter: 'all', entityStatus: 'idle'}
            state.todolists.unshift(newTodo)
        })
    }
})


// actions
export const removeTodolistAC = createAction('REMOVE-TODOLIST', (todoId: string) => ({
    payload: {todoId}
}))
export const addTodolistAC = createAction('ADD-TODOLIST', (todo: TodolistType) => ({
    payload: {todo}
}))


// asyncThunk
export const fetchTodolistsTC = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
    'todolist/fetchTodolistsTC',
    async (_, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        try {
            const res = await todolistApi.getTodolists()
            dispatch(setTodolists(res.data))
            res.data.forEach((el) => {
                dispatch(fetchTasksTC(el.id))
            })
            dispatch(setLoading({status: 'succeeded'}))
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                const error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
            }
        }
    })

export const addTodolistTC = createAsyncThunk<unknown, string, AsyncThunkConfig>(
    'todolist/addTodolistTC',
    async (title, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        try {
            const res = await todolistApi.createTodolist(title)
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                let error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
            }
        }
    })

export const removeTodolistTC = createAsyncThunk<unknown, string, AsyncThunkConfig>(
    'todolist/removeTodolistTC',
    async (todoId, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        dispatch(setTodoEntityStatus({todoId, entityStatus: 'loading'}))
        try {
            const res = await todolistApi.deleteTodolist(todoId)
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todoId))
                dispatch(setLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                const error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
                dispatch(setTodoEntityStatus({todoId, entityStatus: 'failed'}))
            }
        }
    })

export const changeTodolistTitleTC = createAsyncThunk<unknown, { todoId: string, title: string }, AsyncThunkConfig>(
    'todolist/changeTodolistTitleTC',
    async (payload, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        try {
            const res = await todolistApi.updateTodolist(payload.todoId, payload.title)
            if (res.data.resultCode === 0) {
                dispatch(changeTodoTitle({todoId: payload.todoId, title: payload.title}))
                dispatch(setLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                const error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
            }
        }
    })


//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
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
type AsyncThunkConfig = { dispatch: AppDispatchType }

export const {changeTodoTitle, setTodolists, setTodoEntityStatus, changeTodoFilter} = todolistSlice.actions
