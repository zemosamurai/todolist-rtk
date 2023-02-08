import {taskSlice, TaskStateType} from "../store/slice/taskSlice";
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistSlice} from "../store/slice/todolistSlice";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

describe('task-todo-slice tests', () => {
    it('ids should be equals', () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: TodolistDomainType[] = []

        const newTodo: TodolistDomainType = {id: 'Todo1', filter: 'all', title: 'ass', order: 0, addedDate: '', entityStatus: 'idle'}
        const action = addTodolistAC(newTodo)

        const endTasksState = taskSlice.reducer({tasks: startTasksState}, action)
        const endTodolistsState = todolistSlice.reducer({todolists: startTodolistsState}, action)

        const keys = Object.keys(endTasksState.tasks)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState.todolists[0].id

        expect(idFromTasks).toBe(action.payload.todo.id)
        expect(idFromTodolists).toBe(action.payload.todo.id)
    })

    it('ids should be equals', () => {
        const startState: TaskStateType = {
            ['todolistId1']: [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId1',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: false,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: true,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId1',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: false,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                }
            ],
            ['todolistId2']: [
                {
                    id: '1',
                    title: 'bread',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId2',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: false,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                },
                {
                    id: '2',
                    title: 'milk',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: true,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                },
                {
                    id: '3',
                    title: 'tea',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId2',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: '',
                    deadline: '',
                    completed: false,
                    order: 0,
                    addedDate: '',
                    entityStatus: 'idle'
                }
            ]
        }

        const action = removeTodolistAC('todolistId2')

        const endState = taskSlice.reducer({tasks: startState}, action)


        const keys = Object.keys(endState)

        expect(keys.length).toBe(1)
        expect(endState.tasks['todolistId2']).not.toBeDefined()
    })
})
