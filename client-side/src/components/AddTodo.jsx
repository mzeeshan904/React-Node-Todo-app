import React, { useState } from 'react';
import "./AddTodo.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function AddTodo() {

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setDateInput] = useState('');
 
  const addTodoHandler = (event) => {

    event.preventDefault();

    const taskItem = {

      id: Math.random().toString(),
      title: titleInput,
      description: descriptionInput,
      date: dateInput
    }
    console.log(taskItem);
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskItem)
    }).then((resp) => {
      resp.json().then((result) => {
        setTitleInput("");
        setDescriptionInput("");
        setDateInput("");
      });
    });
  }

  return (
    <Form className='container add-todo-container  text-black'
      onSubmit={addTodoHandler}>


      <Form.Group 
        className="mb-3 todo-label "
        controlId="formBasicEmail">
        <Form.Label>Todo's Title</Form.Label>
        <Form.Control
          className='todo-input'
          type="text"
          placeholder="Enter Todo Title Here"
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput} />
      </Form.Group>

      <Form.Group
        className="mb-3 todo-label"
        controlId="formBasicEmail">
        <Form.Label>Todo's Description</Form.Label>
        <Form.Control
          className='todo-input' 
          type="text"
          placeholder="Enter Todo's Detail Here"
          name='description'
          onChange={(e) => setDescriptionInput(e.target.value)}
          value={descriptionInput} />
      </Form.Group>

      <Form.Group 
          className="mb-3 todo-label" 
          controlId="formBasicEmail">
        <Form.Label>Select Todo's Date</Form.Label>
        <Form.Control
          className='todo-input'
          type="date"
          placeholder="Enter Todo's Detail Here"
          onChange={(e) => setDateInput(e.target.value)}
          value={dateInput} />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className=''>
        Submit
      </Button>
      
    </Form>
  )
}

export default AddTodo;
