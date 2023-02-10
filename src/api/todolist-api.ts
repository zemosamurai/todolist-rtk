import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '094b4b7f-1906-468f-afd0-b62ea8f89b2d'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('/todo-lists', {title})
    },
    updateTodolist(todoId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`/todo-lists/${todoId}`, {title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`)
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    updateTask(todoId: string, taskId: string, model: UpdateModelType) {
        return instance.put<UpdateModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todoId}/tasks/${taskId}`, model)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
}

export const authLoginAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>('/auth/me')
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/login')
    },
}


//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type UpdateModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type MeResponseType = {
    id: number
    email: string
    login: string
}