import React, {ChangeEvent} from "react";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import {TaskType} from "../../taskSlice";

type TaskPropsType = {
    todoId: string
    task: TaskType
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
}

export const Task = ({todoId, task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
    const onRemoveTask = () => removeTask(todoId, task.id)
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoId, task.id, e.currentTarget.checked)
    }
    const onChangeTaskTitle = (title: string) => {
        changeTaskTitle(todoId, task.id, title)
    }

    return (
        <li style={{display: 'flex', alignItems:'center'}}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeTaskStatus}
                size={'small'}
            />
            <EditableSpan value={task.title} changeValue={onChangeTaskTitle}/>
            <Button size={'small'} color={'error'} onClick={onRemoveTask}>x</Button>
        </li>
    )
}