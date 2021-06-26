import React from 'react';
import { Col,Row,Table,Button } from 'react-bootstrap'
import './BranchHome.css';

function BranchHome(props){

    var check = function(){
        props.logout();
    }
    console.log(props.branchData);
    var notifications = [];
    for(var i=props.branchData.notifications.length;i>0;i--){
        var oneNotificationArr = [];
        var oneNotification = props.branchData.notifications[i-1];
        oneNotificationArr.push(oneNotification.name);
        oneNotificationArr.push(oneNotification.phone);
        oneNotificationArr.push(oneNotification.email);
        oneNotificationArr.push(oneNotification.pin);
        notifications.push(oneNotificationArr);
    }
    var newLen = props.branchData.newNotificaitons.length;
    var row = function(rowValues){
        if(0 < newLen--)
            return(
                <tr className="selectedRow">
                    {rowValues.map(item=>(
                        <td>{item}</td>
                    ))}
                </tr>
            )
        else
            return(
                <tr className="notselected">
                    {rowValues.map(item=>(
                        <td>{item}</td>
                    ))}
                </tr>
            )
    }
    var makingTable = function(){
        return(
            <div>
                <Table>
                    <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Search Pin</th>
                    </tr>
                    </thead>
                    <tbody>
                        {notifications.map(oneNotify=> row(oneNotify))}
                    </tbody>
                </Table>
            </div>
        )
    }

        return(
            <div className="container">
                <Row>
                    <Col><h1>Branch Home Page</h1></Col>
                    <Col sm="1"><Button onClick={check}>logout</Button></Col>
                </Row>
                <hr />
                <Row>
                    <Col sm="3">
                        <Row><Col><b>Branch Name : </b>{props.branchData.branchData.branchName}</Col></Row>
                        <Row><Col><b>Incharge Name : </b>{props.branchData.branchData.branchInchanrge}</Col></Row>
                    </Col>
                    <Col>
                        <Row><b>Contact Number:</b></Row><Row>{props.branchData.branchData.contactNumbers.map(num=> num=num+",")}</Row>
                    </Col>
                    <Col>
                        <Row><b>Pin Codes :</b></Row><Row>{props.branchData.branchData.Pincodes.map(num=> num=num+",")}</Row>
                    </Col>
                    <Col>
                        <Row><b>City :</b>{props.branchData.branchData.city}</Row>
                        <Row><b>Address : </b>{props.branchData.branchData.address}</Row>
                    </Col>
                </Row>
                <hr />
                <p><span className="h3">Notifications</span> *colored are new notifications</p>
                <span>{makingTable()}</span>
            </div>
        )
}

export default BranchHome;