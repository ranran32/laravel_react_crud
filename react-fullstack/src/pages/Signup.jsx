import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from '../axios.client';
import { useStateContext } from '../contexts/ContextProvider';

const Signup = () => {
  const nameRef=useRef();
  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmationRef=useRef();
  const [errors, setErrors]=  useState(null);

  const {setUser,setToken} =useStateContext();

  const onSubmit= (e)=> {
    e.preventDefault()
   
    const payload = {
      name:nameRef.current.value,
email:emailRef.current.value,
password:passwordRef.current.value,
password_confirmation:passwordConfirmationRef.current.value
    }
   axiosClient.post('/signup', payload)
   .then(({data})=> {
    setUser(data.user)
    setToken(data.token)
    setErrors(null)
   })
   .catch(err=> {
    const response= err.response;
    if(response && response.status === 422){
      console.log(response.data.errors)
      setErrors(response.data.errors) 
    }
   })
}

  return (
    <div>
      <Container className='mt-5'>
        <Row className='d-flex justify-content-center'>
        <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        {errors&& <Form.Text className="text-muted">
           {Object.keys(errors).map(key=> (
            <p key={key} className='text text-danger'>{errors[key][0]}</p>
           ))}
        </Form.Text>}
           {!errors && <br/>}
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
        <Form.Control ref={nameRef} type="text" placeholder="Enter Full Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group> 

      <Form.Group className="mb-3" controlId="password">
        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordConfirmation">
        <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br/>
      <Form.Text className="text-muted">
       Already registered?  <Link to={'/signin'}>Sign In</Link>
        </Form.Text>
    </Form>
      </Card.Body>
    </Card>
        </Row>
       </Container>
    </div>
  )
}

export default Signup
