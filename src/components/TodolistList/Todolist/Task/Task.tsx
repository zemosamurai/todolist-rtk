import React, {ChangeEvent, memo, useCallback} from "react";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {RequestStatusType} from "../../../../store/slice/appSlice";

type TaskPropsType = {
    todoId: string
    task: TaskType
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    entityStatus: RequestStatusType
}

export const Task = memo(({todoId, task, removeTask, changeTaskStatus, changeTaskTitle, entityStatus}: TaskPropsType) => {
    const onRemoveTask = () => removeTask(todoId, task.id)
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(todoId, task.id, title)
    },[todoId, task.id])

    return (
        <li style={{display: 'flex', alignItems:'center'}}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeTaskStatus}
                size={'small'}
                disabled={entityStatus === 'loading'}
            />
            <EditableSpan value={task.title} changeValue={onChangeTaskTitle} disabled={entityStatus === 'loading'}/>
            <Button size={'small'} color={'error'} onClick={onRemoveTask} disabled={entityStatus === 'loading'}>x</Button>
        </li>
    )
})