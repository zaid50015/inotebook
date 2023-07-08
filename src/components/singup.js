import React, { useState } from "react";
import "../style/auth.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
export default function Singup(props) {
  const [credentails, setCredentails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentails.name,
        email: credentails.email,
        password: credentails.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account created successfully","success")
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };

  const onchange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section>
        <Form className="container p-4 form-container" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="name"
              value={credentails.name}
              onChange={onchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={credentails.email}
              onChange={onchange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter the Password"
              name="password"
              value={credentails.password}
              onChange={onchange}
              required
              minLength={5}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="cpassword"
              value={credentails.cpassword}
              onChange={onchange}
              required
              minLength={5}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            SingUp
          </Button>
        </Form>
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
      </section>
    </>
  );
}
