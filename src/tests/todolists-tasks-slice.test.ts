import {taskSlice, TaskStateType} from "../reducers/taskSlice";
import {addTodolistAC, removeTodolistAC, todolistSlice, TodolistType} from "../reducers/todolistSlice";

describe('task-todo-slice tests', () => {
    it('ids should be equals', () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: TodolistType[] = []

        const action = addTodolistAC('NewTodo')

        const endTasksState = taskSlice.reducer({tasks: startTasksState}, action)
        const endTodolistsState = todolistSlice.reducer({todolists: startTodolistsState}, action)

        const keys = Object.keys(endTasksState.tasks)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState.todolists[0].id

        expect(idFromTasks).toBe(action.payload.todoId)
        expect(idFromTodolists).toBe(action.payload.todoId)
    })

    it('ids should be equals', () => {
        const startState: TaskStateType = {
            'todolistId1': [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
            'todolistId2': [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
            ]
        }

        const action = removeTodolistAC('todolistId2')

        const endState = taskSlice.reducer({tasks: startState}, action)


        const keys = Object.keys(endState)

        expect(keys.length).toBe(1)
        expect(endState.tasks['todolistId2']).not.toBeDefined()
    })
})
