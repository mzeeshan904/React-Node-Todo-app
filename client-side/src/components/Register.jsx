import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login-Register.css";

let formInitialValues = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register() {
  const [formData, setFormData] = useState(formInitialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // setFormData({});
    const newUser = {
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    console.log(newUser);

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((resp) => {
      resp.json().then((result) => {
        console.log(result);
        setFormData({
          full_name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      });
    });
  };
  return (
    <Form
      onSubmit={formSubmitHandler}
      className="container login-container text-black mt-5"
    >
      <Form.Group className="mb-3 input-label " controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          className="input-fields"
          type="text"
          placeholder="Enter Your Full Name Here"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3 input-label " controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="input-fields"
          type="mail"
          placeholder="Enter Your Mail Here"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3 input-label" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="input-fields"
          type="password"
          placeholder="Enter Password Here"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3 input-label" controlId="formBasicEmail">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          className="input-fields"
          type="password"
          placeholder="Enter Confirm Password Here"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-4">
        Register
      </Button>
    </Form>
  );
}

export default Register;
