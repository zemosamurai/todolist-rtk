import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType,} from "../../store/slice/todolistSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {TaskStateType} from "../../store/slice/taskSlice";
import {Navigate} from "react-router-dom";

export const TodolistList = () => {
    const dispatch = useAppDispatch()
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolist.todolists)
    let tasks = useAppSelector<TaskStateType>(state => state.task.tasks)
    let isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container sx={{margin: '30px 0'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container maxWidth={'lg'}  sx={{marginBottom: '30px'}} spacing={4}
        >
            {todolists.map(tl => {
                const taskFromTodo = tasks[tl.id]
                return <Grid item key={tl.id} xs={12} sm={6} md={4}>
                    <Paper style={{padding: '25px'}} elevation={2}>
                        <Todolist
                            todoId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={taskFromTodo}
                            entityStatus={tl.entityStatus}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}