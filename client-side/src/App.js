import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import ViewTodoList from './components/ViewTodoList';
// import EditTodo from './components/EditTodo';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ViewTodoList/>}/>
        <Route path="/add" element={<AddTodo/>}/>
        {/* <Route path="/edit" element={<EditTodo/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

