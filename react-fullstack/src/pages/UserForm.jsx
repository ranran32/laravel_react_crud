import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios.client'
import { Container, Row, Col,Button,Form, Card } from 'react-bootstrap';

const UserForm = () => {
  const navigate= useNavigate();
  const {id} = useParams()
  const [errors, setErrors]=  useState(null);
  const [loading, setLoading]= useState(false)
  const [user, setUser] =useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (id) {
    useEffect(()=> {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
      .then((response)=> {
        setLoading(false)
        const userData= response.data
        setUser(userData)
      })
      .catch(()=> {
        setLoading(false)
      })
    },[])
  }

  const onSubmit= (e)=> {
    e.preventDefault();
    if(user.id){
      axiosClient.put(`/users/${user.id}`, user)
      .then(()=> {
        navigate('/user')
      })
      .catch(err=> {
        const response= err.response;
        if(response && response.status === 422){
          console.log(response.data.errors)
          setErrors(response.data.errors) 
        }
       })
    }
    else{
      axiosClient.post(`/users`, user)
      .then(()=> {
        navigate('/user')
      })
      .catch(err=> {
        const response= err.response;
        if(response && response.status === 422){
          console.log(response.data.errors)
          setErrors(response.data.errors) 
        }
       })
    }
  }


  return (
    <div>
   <Container className='mt-5'>
    <Row>
      <Col className='d-flex justify-content-center'>
        <Card style={{width:'18rem'}}>
          <Card.Body>
          {user.id &&   <Card.Title className='text-center'>Update User:{user.name} </Card.Title>
          }
      {!user.id &&  <Card.Title className='text-center'>New User </Card.Title>}
      {errors&& <Form.Text className="text-muted">
           {Object.keys(errors).map(key=> (
            <p key={key} className='text text-danger'>{errors[key][0]}</p>
           ))}
        </Form.Text>}
      {loading && 
      <Card.Text>
        Loading...
      </Card.Text>
      }
      {!loading &&  
      <>
       <Form onSubmit={onSubmit}>
       <Form.Group className="mb-3" controlId="email">
        <Form.Control onChange={e=> setUser({ ...user, name: e.target.value})} value={user.name} type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Control onChange={e=> setUser({ ...user, email: e.target.value})} value={user.email} type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control onChange={e=> setUser({ ...user, password: e.target.value})}  type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password_confirmation">
        <Form.Control onChange={e=> setUser({ ...user, password_confirmation: e.target.value})} type="password" placeholder="Password_confirmation" />
      </Form.Group>
      <Button type='submit' className='btn btn-info'>Save</Button>
       </Form>
      </>
      }
          </Card.Body>
        </Card>
      </Col>
    </Row>
   </Container>
    </div>
  )
}

export default UserForm
