import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link , useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function NavScrollExample() {
  let location = useLocation();
  let navigate = useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("token");
  navigate('/login')
}
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand>
        
          <Nav.Link as={Link} to={"/"}>
            iNoteBook
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/"} className={`${location.pathname==="/"?"active":""}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/about"} className={`${location.pathname==="/about"?"active":""}`}>
              About
            </Nav.Link>
          </Nav>
         { !localStorage.getItem('token')? <Form className="d-flex">
          <Button as={Link} to={"/login"} className="mx-2" variant="outline-primary">LogIn</Button>
          <Button as={Link} to={"/signup"}className="mx-2" variant="outline-primary">SignUp</Button>
          </Form>: <Button  onClick={handleLogout} className="mx-2" variant="outline-primary">Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
