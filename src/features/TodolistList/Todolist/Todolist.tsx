import React, {memo, useCallback} from "react";
import {Task} from "./Task/Task";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import {
    changeTodoFilter,
    changeTodolistTitleTC,
    FilterValueType,
    removeTodolistTC
} from "../../../store/slice/todolistSlice";
import {TaskStatuses} from "../../../api/todolist-api";
import {RequestStatusType} from "../../../store/slice/appSlice";
import {addTasksTC, TaskDomainType} from "../../../store/slice/taskSlice";
import {useAppDispatch} from "../../../store/hooks";

type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterValueType
    tasks: TaskDomainType[]
    entityStatus: RequestStatusType
}

export const Todolist = memo(({todoId, title, filter, tasks, entityStatus}: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    const changeFiler = (filter: FilterValueType) => {
        dispatch(changeTodoFilter({todoId, filter}))
    }
    const removeTodoList = () => {
        dispatch(removeTodolistTC(todoId))
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC({todoId, title}))
    }, [todoId])
    const addTask = useCallback((title: string) => {
        dispatch(addTasksTC({todoId, title}))
    }, [todoId])

    let taskFromTodo = tasks

    if (filter === 'active') {
        taskFromTodo = taskFromTodo?.filter(tl => tl.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        taskFromTodo = taskFromTodo?.filter(tl => tl.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{marginTop: '0'}}>
                <EditableSpan
                    value={title}
                    changeValue={changeTodolistTitle}
                    disabled={entityStatus === 'loading'}
                />
                <IconButton onClick={removeTodoList} size={'small'} disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'}/>
            <div style={{margin: '15px 0'}}>
                {taskFromTodo?.map(t => {
                    return <Task
                        key={t.id}
                        todoId={todoId}
                        task={t}
                        entityStatus={t.entityStatus}
                    />
                })}
            </div>
            <div>

                <Button
                    onClick={() => changeFiler('all')}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                >All</Button>

                <Button
                    onClick={() => changeFiler('active')}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={'warning'}
                    size={'small'}
                >Active</Button>

                <Button
                    onClick={() => changeFiler('completed')}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={'success'}
                    size={'small'}
                >Completed</Button>
            </div>
        </div>
    )
})