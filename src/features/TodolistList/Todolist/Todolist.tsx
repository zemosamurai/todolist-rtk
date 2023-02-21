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
import s from './Todolist.module.css'
import Box from "@mui/material/Box";

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
        <Box className={s.todoWrapper}>
            <Box className={s.titleWrapper}>
                <EditableSpan
                    value={title}
                    variant={'h6'}
                    changeValue={changeTodolistTitle}
                    disabled={entityStatus === 'loading'}
                />
                <IconButton onClick={removeTodoList} size={'small'} disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </Box>

            <AddItemForm
                addItem={addTask}
                disabled={entityStatus === 'loading'}
                description={'add task'}
            />

            <Box style={{margin: '15px 0'}}>
                {taskFromTodo?.map(t => {
                    return <Task
                        key={t.id}
                        todoId={todoId}
                        task={t}
                        entityStatus={t.entityStatus}
                    />
                })}
            </Box>

            <Box style={{display: 'flex'}}>
                <Button
                    onClick={() => changeFiler('all')}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'large'}
                >All</Button>
                <Button
                    onClick={() => changeFiler('active')}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={'warning'}
                    size={'large'}
                >Active</Button>
                <Button
                    onClick={() => changeFiler('completed')}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={'success'}
                    size={'large'}
                >Completed</Button>
            </Box>
        </Box>
    )
})