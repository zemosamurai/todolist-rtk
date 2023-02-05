import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React from "react";
import {
    addTodolistAC,
    FilterValueType,
    removeTodolistAC,
    todolistSlice,
    TodolistType
} from "./todolistSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {taskSlice, TaskStateType} from "./taskSlice";

export const TodolistList = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<TodolistType[]>(state => state.todolist.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.task.tasks)

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(taskSlice.actions.removeTask({todoId, taskId}))
    }
    const addTask = (todoId: string, title: string) => {
        dispatch(taskSlice.actions.addTask({todoId, title}))
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(taskSlice.actions.changeTaskStatus({todoId, taskId, isDone}))
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        dispatch(taskSlice.actions.changeTaskTitle({todoId, taskId, title}))
    }

    const changeFiler = (todoId: string, filter: FilterValueType) => {
        dispatch(todolistSlice.actions.changeFiler({todoId, filter}))
    }
    const removeTodoList = (todoId: string) => {
        dispatch(removeTodolistAC(todoId))
    }
    const changeTodolistTitle = (todoId: string, title: string) => {
        dispatch(todolistSlice.actions.changeTodolistTitle({todoId, title}))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return <>
        <Grid container style={{margin: '30px 0'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {todolists.map(tl => {

                return <Grid item key={tl.id}>
                    <Paper style={{padding: '25px'}} elevation={2}>
                        <Todolist
                            todoId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasks}
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