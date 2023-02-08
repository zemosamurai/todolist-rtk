import {changeTodoFilter, changeTodoTitle, TodolistDomainType, todolistSlice} from "../store/slice/todolistSlice";


let startState: { todolists: TodolistDomainType[] }
beforeEach(() => {
    startState = {
        todolists: [
            {id: 'todo1', title: 'TODO-1', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
            {id: 'todo2', title: 'TODO-2', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
            {id: 'todo3', title: 'TODO-3', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
        ]
    }
})


describe('todolistSlice test', () => {
    it('default state', () => {
        const endState = todolistSlice.reducer(undefined, {type: ''})
        expect(endState).toEqual({todolists: []})
    })

    it('filter of specified todolist should be changed', () => {
        const action = changeTodoFilter({todoId: 'todo2', filter: 'active'})

        const endState = todolistSlice.reducer(startState, action)
        expect(endState.todolists[1].filter).toBe('active')
        expect(endState.todolists[0].filter).toBe('all')
    })

    it('title of specified todolist should be changed', () => {
        const action = changeTodoTitle({todoId: 'todo1', title: 'XXX-FILM(_|_)'})

        const endState = todolistSlice.reducer(startState, action)
        expect(endState.todolists[0].title).toBe('XXX-FILM(_|_)')
        expect(endState.todolists[0].filter).toBe('all')
        expect(endState.todolists.length).toBe(3)
    })
})