import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios.client';


const Dashboard = () => {
    const {user, setUser} =useStateContext()

    useEffect(()=> {
      axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
    },[])
  return (
    <div>
        <Container>
        <Row >
        <Col lg={2} >
        Welcome !
        <br />
        {user.name}
        </Col>
        <Col lg={11} className='d-flex justify-content-center' >
        Dashboard    
        </Col>
        </Row>
       </Container>
    </div>
  )
}

export default Dashboard
