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
                <TodolistList/>
            </Container>
        </div>
    );
}

export default App;
