import React from "react";
import {Task} from "./Task/Task";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material'
import  IconButton  from '@mui/material/IconButton'
import {FilterValueType} from "../todolistSlice";
import {TaskStateType, TaskType} from "../taskSlice";

type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterValueType
    tasks: TaskStateType
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeFiler: (todoId: string, filter: FilterValueType) => void
    removeTodoList: (todoId: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {
        todoId, title, filter, tasks, removeTask, addTask, changeTaskStatus,
        changeTaskTitle, changeFiler, removeTodoList, changeTodolistTitle
    } = props

    const onAddTask = (title: string) => addTask(todoId, title)
    const onFilterAll = () => changeFiler(todoId, 'all')
    const onFilterActive = () => changeFiler(todoId, 'active')
    const onFilterCompleted = () => changeFiler(todoId, 'completed')
    const onRemoveTodoList = () => removeTodoList(todoId)
    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todoId, title)
    }

    let taskFromTodo = tasks[todoId]

    if (filter === 'active') {
        taskFromTodo = taskFromTodo.filter(tl => !tl.isDone)
    }
    if (filter === 'completed') {
        taskFromTodo = taskFromTodo.filter(tl => tl.isDone)
    }

    return (
        <div>
            <h3 style={{marginTop: '0'}}>
                <EditableSpan value={title} changeValue={onChangeTodolistTitle}/>
                <IconButton onClick={onRemoveTodoList} size={'small'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddTask}/>
            <ul>
                {taskFromTodo?.map(t => {
                    return <Task
                        key={t.id}
                        todoId={todoId}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                })}
            </ul>
            <div>
                <Button
                    onClick={onFilterAll}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                >All</Button>
                <Button
                    onClick={onFilterActive}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={'warning'}
                    size={'small'}
                >Active</Button>
                <Button
                    onClick={onFilterCompleted}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={'success'}
                    size={'small'}
                >Completed</Button>
            </div>
        </div>
    )
}