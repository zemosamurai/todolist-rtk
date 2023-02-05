import {taskSlice, TaskStateType} from "../reducers/taskSlice";

const {addTask, removeTask, changeTaskStatus, changeTaskTitle} = taskSlice.actions

let startState: { tasks: TaskStateType }
beforeEach(() => {
    startState = {
        tasks: {
            ['todolistId1']: [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
            ['todolistId2']: [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
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
        const action = addTask({todoId: 'todolistId2', title: 'Kimcheck'})

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
                    {id: '1', title: 'CSS', isDone: false},
                    {id: '2', title: 'JS', isDone: true},
                    {id: '3', title: 'React', isDone: false}
                ],
                ['todolistId2']: [
                    {id: '1', title: 'bread', isDone: false},
                    {id: '3', title: 'tea', isDone: false}
                ]
            }
        })
    })

    it('status of specified task should be changed', () => {
        const action = changeTaskStatus({todoId: 'todolistId1', taskId: '2', isDone: false})

        const endState = taskSlice.reducer(startState, action)
        expect(endState.tasks['todolistId1'][1].isDone).toBe(false)
        expect(endState.tasks['todolistId2'][1].isDone).toBe(true)
    })

    it('title of specified task should be changed', () => {
        const action = changeTaskTitle({todoId: 'todolistId1', taskId: '1', title: 'good test'})

        const endState = taskSlice.reducer(startState, action)
        expect(endState.tasks['todolistId1'][0].title).toBe('good test')
        expect(endState.tasks['todolistId1'].length).toBe(3)
    })
})