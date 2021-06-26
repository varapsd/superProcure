import React, {useState} from 'react'
import {Modal, Button, Form, Row, Col } from 'react-bootstrap'
import Home from './Home'
import axios from 'axios';

function Login(props) {
    const [show, setShow] = useState(false);
    const [isLoginFailed, setLoginFailed] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onFormSubmit = e => {
      e.preventDefault()
      const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
      loginHere(formDataObj);
    }
    var loginHere = function(inputData){
      if(inputData.uName == "admin"){
          axios.post("/adminLogin",inputData)
          .then(res =>{
              if(res.data.isSuccess){
                setLoginFailed(false)
                props.adminDataSet(res);
              }
              else
                setLoginFailed(true)
          })
      }
      else{
          console.log(inputData);
          axios.post("/login",inputData)
          .then(res =>{
            if(res.data.isSuccess){
                setLoginFailed(false);
                props.branchDataSet(res);
            }
            else
              setLoginFailed(true);
            })
      }
  }
    return (
      <div>
        <Button variant="outline-primary" onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onFormSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="email" name="uName"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="passwd"/>
                    </Col>
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Login
                </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
              {isLoginFailed && <p>Login failed</p>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
export default Login;