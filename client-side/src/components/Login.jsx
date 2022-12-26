import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login-Register.css";

let loginInitialValues = {
  email: "",
  password: "",
};

function Login() {
  const [loginData, setLoginData] = useState(loginInitialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginDataHandler = (e) => {
    e.preventDefault();

    const loginUser = {
      email: loginData.email,
      password: loginData.password,
    };

    console.log(loginUser);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    }).then((resp) => {
      resp.json().then((result) => {
        console.log(result);
        setLoginData({
          email: "",
          password: "",
        });
      });
    });
  };

  return (
    <Form
      className="container login-container  text-black"
      onSubmit={loginDataHandler}
    >
      <Form.Group className="mb-3 input-label " controlId="formBasicEmail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          className="input-fields"
          type="mail"
          name="email"
          placeholder="Enter Your Registered Mail Here"
          onChange={handleInputChange}
          value={loginData.email}
        />
      </Form.Group>

      <Form.Group className="mb-3 input-label" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="input-fields"
          type="password"
          placeholder="Enter Password Here"
          name="password"
          onChange={handleInputChange}
          value={loginData.password}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="">
        Login
      </Button>
    </Form>
  );
}

export default Login;
