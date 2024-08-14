import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Row, Col } from 'react-bootstrap';
import axiosClient from '../axios.client';


const Logged = () => {
    const {user,token,setUser, setToken}= useStateContext()

    if(!token) {
        return <Navigate to={"/signin"}/>
    }
    const onLogout= (e)=> {
        e.preventDefault();

        axiosClient.post('/logout')
        .then(()=> {
          setUser({})
          setToken(null)
        })
      
    }

  return (
    <>
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>React-Fullstack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/user'}>User</Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <main>
       <Container>
        <Row >
        <Col lg={12} >
            <Outlet/>
        </Col>
        </Row>
       </Container>
    </main>
    </>
  )
}

export default Logged
