import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, FilterValueType,
    removeTodolistTC, TodolistDomainType, todolistSlice,
} from "../../store/reducers/todolistSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addTasksTC, deleteTaskTC, TaskStateType, updateTaskTC} from "../../store/reducers/taskSlice";
import {TaskStatuses} from "../../api/todolist-api";

export const TodolistList = () => {
    const dispatch = useAppDispatch()
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolist.todolists)
    let tasks = useAppSelector<TaskStateType>(state => state.task.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(deleteTaskTC(todoId, taskId))
    }, [])
    const addTask = useCallback((todoId: string, title: string) => {
        dispatch(addTasksTC(todoId, title))
    }, [])
    const changeTaskStatus = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoId, taskId, {status}))
    }, [])
    const changeTaskTitle = useCallback((todoId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todoId, taskId, {title}))
    }, [])

    const changeFiler = useCallback((todoId: string, filter: FilterValueType) => {
        dispatch(todolistSlice.actions.changeFiler({todoId, filter}))
    }, [])
    const removeTodoList = useCallback((todoId: string) => {
        dispatch(removeTodolistTC(todoId))
    }, [])
    const changeTodolistTitle = useCallback((todoId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoId, title))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return <>
        <Grid container style={{margin: '30px 0'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {todolists.map(tl => {
                const taskFromTodo = tasks[tl.id]
                return <Grid item key={tl.id}>
                    <Paper style={{padding: '25px'}} elevation={2}>
                        <Todolist
                            todoId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={taskFromTodo}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeFiler={changeFiler}
                            removeTodoList={removeTodoList}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}