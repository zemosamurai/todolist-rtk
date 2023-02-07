import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC} from "./todolistSlice";
import {AppDispatchType, RootStateType} from "../store";
import {TaskType, todolistApi, UpdateModelType} from "../../api/todolist-api";

const initialState: InitialStateType = {
    tasks: {}
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            action.payload.forEach(el => {
                state.tasks[el.todoListId] = action.payload
            })
        },
        removeTask: (state, action: PayloadAction<RemoveTaskType>) => {
            state.tasks[action.payload.todoId] = state.tasks[action.payload.todoId]
                .filter(el => el.id !== action.payload.taskId)
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks[action.payload.todoListId].unshift(action.payload)
        },
        updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
            let tasks = state.tasks[action.payload.todoId]
            state.tasks[action.payload.todoId] = tasks.map(el => el.id === action.payload.taskId ? {...el, ...action.payload.model} : el)
        },
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
export const fetchTasksTC = (todoId: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.getTasks(todoId)
        dispatch(taskSlice.actions.setTasks(res.data.items))
    } catch (e) {

    }
}
export const addTasksTC = (todoId: string, title: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.createTask(todoId, title)
        dispatch(taskSlice.actions.addTask(res.data.data.item))
    } catch (e) {

    }
}
export const deleteTaskTC = (todoId: string, taskId: string) => async (dispatch: AppDispatchType) => {
    try {
        const res = await todolistApi.deleteTask(todoId, taskId)
        dispatch(taskSlice.actions.removeTask({todoId, taskId}))
    } catch (e) {

    }
}
export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainModelType) =>
    async (dispatch: AppDispatchType, getState: () => RootStateType) => {
        const task = getState().task.tasks[todoId].find(el => el.id === taskId)

        if (task) {
            const model: UpdateModelType = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description,
                completed: task.completed,
                ...domainModel
            }

            try {
                const res = await todolistApi.updateTask(todoId, taskId, model)
                dispatch(taskSlice.actions.updateTask({todoId, taskId, model: domainModel}))
            } catch (e) {

            }
        }

    }


//types
export type TaskStateType = {
    [key: string]: TaskType[]
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


