import {todolistSlice, TodolistType} from "../reducers/todolistSlice";

const {changeFiler, changeTodolistTitle} = todolistSlice.actions

let startState: { todolists: TodolistType[] }
beforeEach(() => {
    startState = {
        todolists: [
            {id: 'todo1', title: 'TODO-1', filter: 'all'},
            {id: 'todo2', title: 'TODO-2', filter: 'all'},
            {id: 'todo3', title: 'TODO-3', filter: 'all'},
        ]
    }
})


describe('todolistSlice test', () => {
    it('default state', () => {
        const endState = todolistSlice.reducer(undefined, {type: ''})
        expect(endState).toEqual({todolists: []})
    })

    it('filter of specified todolist should be changed', () => {
        const action = changeFiler({todoId: 'todo2', filter: 'active'})

        const endState = todolistSlice.reducer(startState, action)
        expect(endState.todolists[1].filter).toBe('active')
        expect(endState.todolists[0].filter).toBe('all')
    })

    it('title of specified todolist should be changed', () => {
        const action = changeTodolistTitle({todoId: 'todo1', title: 'XXX-FILM(_|_)'})

        const endState = todolistSlice.reducer(startState, action)
        expect(endState.todolists[0].title).toBe('XXX-FILM(_|_)')
        expect(endState.todolists[0].filter).toBe('all')
        expect(endState.todolists.length).toBe(3)
    })
})