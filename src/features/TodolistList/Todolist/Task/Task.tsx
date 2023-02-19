import React, {ChangeEvent, memo, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {RequestStatusType} from "../../../../store/slice/appSlice";
import {useAppDispatch} from "../../../../store/hooks";
import {deleteTaskTC, updateTaskTC} from "../../../../store/slice/taskSlice";

type TaskPropsType = {
    todoId: string
    task: TaskType
    entityStatus: RequestStatusType
}

export const Task = memo(({todoId, task, entityStatus}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const onRemoveTask = () => dispatch(deleteTaskTC({todoId, taskId: task.id}))
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC({todoId, taskId: task.id, domainModel: {status}}))
    }, [todoId, task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC({todoId, taskId: task.id, domainModel: {title}}))
    }, [todoId, task.id])

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
                size={'small'}
                disabled={entityStatus === 'loading'}
                color={'success'}
            />
            <EditableSpan value={task.title} changeValue={changeTaskTitle} disabled={entityStatus === 'loading'}/>
            <Button size={'small'} color={'error'} onClick={onRemoveTask}
                    disabled={entityStatus === 'loading'}>x</Button>
        </div>
    )
})