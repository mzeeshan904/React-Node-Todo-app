import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditTodo(props) {

    let title = props.item.title;
    let description = props.item.description;
    let task_id = props.item.task_id;

    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateDescription, setUpdateDescription] = useState(description);


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {

        setShow(false);
        setUpdateTitle(title);
        setUpdateDescription(description);

    }

    // update the task function

    const UpdateTask = () => {

        handleClose();
        let data = {
            task_id: task_id,
            title: updateTitle,
            description: updateDescription
        }
        fetch(`http://localhost:5000/update/task/:${data.task_id}`, {

            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((response) => {
                console.log(response);
            });
        });
        setUpdateTitle(title);
        setUpdateDescription(description);
        

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                autoFocus
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={updateDescription}
                                onChange={(e) => setUpdateDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={UpdateTask}>
                        Update Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditTodo;