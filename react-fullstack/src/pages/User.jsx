import React, { useEffect, useState } from 'react'
import { Container, Row, Col,Table,Button,NavLink } from 'react-bootstrap';
import axiosClient from '../axios.client';
import { Link, Navigate } from 'react-router-dom'

const User = () => {
const [users, setUsers]= useState([])
const [loading, setLoading]= useState(false)

useEffect(()=>{
  getUsers();
},[])

const onDelete = (user)=> {
  if (!window.confirm("Are u sure to delete this user?")) {
    return
  }

  axiosClient.delete(`/users/${user.id}`)
  .then(()=> {
    getUsers()
  })
}

const getUsers= ()=>{
  setLoading(true)
  axiosClient.get('/users')
  .then(({data})=> {
    setLoading(false)
   setUsers(data.data)
   console.log(users)
  })
  .catch(()=> {
    setLoading(false)
  })
}

  return (
    <div>
      <Container className='mt-4'>
        <Button className='btn btn-info mb-2'>
          <Link to={'/users/new'} style={{color: 'black', textDecoration: 'none' }}>
            ADD USER 
          </Link>
        </Button>
        <Row >
        <Col lg={12} className='d-flex justify-content-center' >
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date created</th>
          <th>Action</th>
        </tr>
      </thead>
      {loading && <tbody>
    <tr>
          <td colSpan={5} className='text-center'>
            Loading...
          </td>
        </tr>
    </tbody>}
           {!loading && 
            <tbody>
            {users && users.map(user=> (
             <tr key={user.id}>
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>{user.created_at}</td>
               <td>
               <Button>
                 <Link to={'/users/'+user.id} style={{color:'black', textDecoration:'none'}}>
                   Edit
                 </Link>
               </Button>
               &nbsp;
               <Button onClick={e => onDelete(user)} className='btn btn-danger'>Delete</Button>
               </td>
             </tr>
            ))}
             </tbody>
           }
    </Table>
        </Col>
        </Row>
       </Container>
    </div>
  )
}

export default User
