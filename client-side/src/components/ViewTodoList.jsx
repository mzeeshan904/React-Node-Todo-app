import React, { useEffect, useState } from 'react';
import "./ViewTodoList.css";
import EditTodo from './EditTodo';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


function ViewTodoList() {

  const [taskItem, setTaskItem] = useState([]);

  

  function getTasks() {

    fetch("http://localhost:5000/get/all").then((result) => {

      result.json().then((response) => {

        // setTaskItem(response.data.tasks);
         setTaskItem([...response.data.tasks]);
      }); 
    });
  };

  useEffect(() => {
    getTasks();
  },[taskItem]);
  // Function delete task

  function deleteTask(task_id) {
    console.log(task_id);
    fetch(`http://localhost:5000/delete/task/${task_id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((response) => {
        getTasks();
      });
    });
  };

  return (
    <div>
      <Table striped bordered hover className='table-container container mt-5 text-center'>
        <thead>
          <tr>
            <th>Task_id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            taskItem.map((item, i) => {
              return (

                <tr key={i}>
                  <td>{item.task_id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td><EditTodo item = {item} /></td>
                  <td><Button className='btn-danger' onClick={() => deleteTask(item.task_id)} >Delete</Button></td>
                </tr>)
            })
          }
        </tbody>
      </Table>

    </div>
  )
}

export default ViewTodoList;
