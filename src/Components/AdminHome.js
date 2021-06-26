import React from 'react';
import { Col,Row,Table,Button } from 'react-bootstrap'
import './BranchHome.css';

function AdminHome(props){
    console.log('admin')
    console.log(props)
    var check = function(){
        props.logout();
    }
    var notifications = [];
    for(var i=props.adminData.notifications.length;i>0;i--){
        var oneNotificationArr = [];
        var oneNotification = props.adminData.notifications[i-1];
        oneNotificationArr.push(oneNotification.name);
        oneNotificationArr.push(oneNotification.phone);
        oneNotificationArr.push(oneNotification.email);
        oneNotificationArr.push(oneNotification.pin);
        notifications.push(oneNotificationArr);
    }
    var newLen = props.adminData.newNotificaitons.length;
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
                    <Col><h1>AdminHome Home Page</h1></Col>
                    <Col sm="1"><Button onClick={check}>logout</Button></Col>
                </Row>
                <hr />
                <p><span className="h3">Notifications</span> *colored are new notifications</p>
                <span>{makingTable()}</span>
            </div>
        )
}

export default AdminHome;