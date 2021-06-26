import React, { useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import Home from './Home';

function Search(props){
    var pin = document.getElementById('pin');
    console.log(pin)
    function changePin(){
        console.log(pin);
        props.search(pin);
    }
    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
              formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
        props.search(formDataObj);
      }
    return(
        <div className="container">
            <Form onSubmit={onFormSubmit}>
                <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="1">
                    Name
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control type="text" placeholder="Name" name="name" />
                    </Col>

                    <Form.Label column sm="1">
                    Phone
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control type="number" required placeholder="Phone" name="phone"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="1">
                    Email
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control type="email" required placeholder="email" name="email"/>
                    </Col>

                    <Form.Label column sm="1">
                    Pincode
                    </Form.Label>
                    <Col sm="5">
                    <Form.Control type="number" required placeholder="Pincode" onChange={evt => pin = evt.target.value} name="pin"/>
                    </Col>
                </Form.Group>
                
                <Button className="right" type="submit">Submit</Button>
            </Form>
            <hr />
        </div>
    )
}

export default Search;