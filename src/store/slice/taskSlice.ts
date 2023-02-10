import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC} from "./todolistSlice";
import {AppDispatchType, RootStateType} from "../store";
import {TaskType, todolistApi, UpdateModelType} from "../../api/todolist-api";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils-error";
import {RequestStatusType, setLoading} from "./appSlice";

const initialState: InitialStateType = {
    tasks: {}
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            action.payload.forEach(el => {
                state.tasks[el.todoListId] = action.payload.map(el => ({...el, entityStatus: 'idle'}))
            })
        },
        removeTask: (state, action: PayloadAction<RemoveTaskType>) => {
            const removeTasks = state.tasks[action.payload.todoId].filter(el => el.id !== action.payload.taskId)
            state.tasks[action.payload.todoId] = removeTasks
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            const newTask: TaskDomainType = {...action.payload, entityStatus: 'idle'}
            state.tasks[action.payload.todoListId].unshift(newTask)
        },
        updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
            const tasks = state.tasks[action.payload.todoId]
            const tasksUpdate = tasks.map(el => el.id === action.payload.taskId ? {...el, ...action.payload.model} : el)
            state.tasks[action.payload.todoId] = tasksUpdate
        },
        setTaskEntityStatus: (state, action: PayloadAction<SetTaskEntityStatusType>) => {
            state.tasks[action.payload.todoId].forEach(el =>
                el.id === action.payload.taskId ? el.entityStatus = action.payload.entityStatus : el)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state.tasks[action.payload.todoId]
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state.tasks[action.payload.todo.id] = []
        })
    }
})


//asyncThunk
export const fetchTasksTC = createAsyncThunk<unknown, string, AsyncThunkConfig>(
    'tasks/fetchTasksTC',
    async (todoId, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        try {
            const res = await todolistApi.getTasks(todoId)
            dispatch(setTasks(res.data.items))
            dispatch(setLoading({status: 'succeeded'}))
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                const error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
            }
        }
    })

export const addTasksTC = createAsyncThunk<unknown, { todoId: string, title: string }, AsyncThunkConfig>(
    'tasks/addTasksTC',
    async (payload, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        try {
            const res = await todolistApi.createTask(payload.todoId, payload.title)
            if (res.data.resultCode === 0) {
                dispatch(addTask(res.data.data.item))
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

export const deleteTaskTC = createAsyncThunk<unknown, { todoId: string, taskId: string }, AsyncThunkConfig>(
    'tasks/deleteTaskTC',
    async (payload, {dispatch}) => {
        dispatch(setLoading({status: 'loading'}))
        dispatch(setTaskEntityStatus({todoId: payload.todoId, taskId: payload.taskId, entityStatus: 'loading'}))
        try {
            const res = await todolistApi.deleteTask(payload.todoId, payload.taskId)
            if (res.data.resultCode === 0) {
                dispatch(removeTask({todoId: payload.todoId, taskId: payload.taskId}))
                dispatch(setLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            if (axios.isAxiosError<{ error: string }>(e)) {
                const error = e.response?.data ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, error)
                dispatch(setTaskEntityStatus({todoId: payload.todoId, taskId: payload.taskId, entityStatus: 'failed'}))
            }
        }
    })

export const updateTaskTC = createAsyncThunk<unknown, updateTaskTCType, AsyncThunkConfig>(
    'tasks/updateTaskTC',
    async (payload, {dispatch, getState}) => {
        dispatch(setLoading({status: 'loading'}))
        const task = getState().task.tasks[payload.todoId].find(el => el.id === payload.taskId)

        if (task) {
            const model: UpdateModelType = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description,
                completed: task.completed,
                ...payload.domainModel
            }

            try {
                const res = await todolistApi.updateTask(payload.todoId, payload.taskId, model)
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({todoId: payload.todoId, taskId: payload.taskId, model: payload.domainModel}))
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
        }
    })


//types
export type TaskStateType = {
    [key: string]: TaskDomainType[]
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
type InitialStateType = {
    tasks: TaskStateType
}
export type UpdateDomainModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
type RemoveTaskType = {
    todoId: string,
    taskId: string
}
type UpdateTaskType = {
    todoId: string,
    taskId: string,
    model: UpdateDomainModelType
}
type SetTaskEntityStatusType = {
    todoId: string,
    taskId: string,
    entityStatus: RequestStatusType
}
type AsyncThunkConfig = {
    state: RootStateType
    dispatch: AppDispatchType
}
type updateTaskTCType = { todoId: string, taskId: string, domainModel: UpdateDomainModelType }

const {addTask, removeTask, updateTask, setTasks, setTaskEntityStatus} = taskSlice.actions


