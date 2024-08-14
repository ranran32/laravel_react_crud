import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from '../axios.client';
import { useStateContext } from '../contexts/ContextProvider';

const Signin = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const [errors, setErrors]=  useState(null);
  const {setUser,setToken} =useStateContext();
  
    const onSubmit= (e)=> {
        e.preventDefault()
        const payload = {
    email:emailRef.current.value,
    password:passwordRef.current.value,
        }
       axiosClient.post('/login', payload)
       .then(({data})=> {
        setUser(data.user)
        setToken(data.token)
       })
       .catch(err=> {
        const response= err.response;
        if(response && response.status === 422){
          if(response.data.errors){
            setErrors(response.data.errors)
          }else {
            setErrors({
              email:[response.data.message]
            })
          }
        }
       })
    }
  return (
    <div>
       <Container className='mt-5'>
        <Row className='d-flex justify-content-center'>
        <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>Sign In</Card.Title>
        {errors &&  <Form.Text className="text-muted">
          {Object.keys(errors).map(key =>(
            <p className='text text-danger' key={key}>{errors[key][0]}</p>
          ))}
        </Form.Text>}
      {!errors &&   <br />}
        <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br/>
      <Form.Text className="text-muted">
       No Account Yet?  <Link to={'/signup'}>Sign Up</Link>
        </Form.Text>
    </Form>
      </Card.Body>
      <Card.Text>No Account Yet? <Link to={'/signup'}>Register</Link> </Card.Text>
    </Card>
        </Row>
       </Container>

      
    </div>
  )
}

export default Signin
