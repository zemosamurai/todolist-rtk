import React from 'react';
import './App.css';
import {AppBarHeader} from "../components/AppBar/AppBar";
import Container from "@mui/material/Container";
import {TodolistList} from "../components/TodolistList/TodolistList";

function App() {
    return (
        <div className="App">
            <AppBarHeader/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404 NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
