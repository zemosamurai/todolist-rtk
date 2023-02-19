import {taskSlice, TaskStateType} from "../store/slice/taskSlice";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

const {addTask, removeTask, updateTask} = taskSlice.actions

let startState: { tasks: TaskStateType }
beforeEach(() => {
    startState = {
        tasks: {
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
    }
})


describe('taskSlice test', () => {
    it('default state', () => {
        const endState = taskSlice.reducer(undefined, {type: ''})
        expect(endState).toEqual({tasks: {}})
    })

    it('correct task should be added to correct array', () => {
        const newTask: TaskType = {
            id: '4',
            title: 'Kimcheck',
            status: TaskStatuses.New,
            todoListId: 'todolistId2',
            startDate: '',
            priority: TaskPriorities.Low,
            description: '',
            deadline: '',
            completed: false,
            order: 0,
            addedDate: ''
        }

        const action = addTask({todoId: 'todolistId2' ,task: newTask})

        const endState = taskSlice.reducer(startState, action)
        expect(endState.tasks['todolistId2'].length).toBe(4)
        expect(endState.tasks['todolistId2'][0].title).toBe('Kimcheck')
        expect(endState.tasks['todolistId1'].length).toBe(3)
    })

    it('correct task should be deleted from correct array', () => {
        const action = removeTask({todoId: 'todolistId2', taskId: '2'})

        const endState = taskSlice.reducer(startState, action)
        expect(endState).toEqual({
            tasks: {
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
        })
    })

    it('status of specified task should be changed', () => {
        const action = updateTask({todoId: 'todolistId1', taskId: '2', model: {status: TaskStatuses.New}})

        const endState = taskSlice.reducer(startState, action)
        expect(endState.tasks['todolistId1'][1].status).toBe(TaskStatuses.New)
        expect(endState.tasks['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    })

    it('title of specified task should be changed', () => {
        const action = updateTask({todoId: 'todolistId1', taskId: '1', model: {title: 'good test'}})

        const endState = taskSlice.reducer(startState, action)
        expect(endState.tasks['todolistId1'][0].title).toBe('good test')
        expect(endState.tasks['todolistId1'].length).toBe(3)
    })
})