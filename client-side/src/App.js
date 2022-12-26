import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Components import
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import ViewTodoList from './components/ViewTodoList';
import Login from "./components/Login";
import Register from "./components/Register"
// import EditTodo from './components/EditTodo';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ViewTodoList/>}/>
        <Route path="/add" element={<AddTodo/>}/>
         <Route path="/login" element={<Login/>}/> 
         <Route path="/register" element={<Register/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

