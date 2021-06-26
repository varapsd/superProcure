import React from 'react'
import { Button,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from '../App'
import Search from './Search'
import Login from './Login'
import Result from './Result'
import axios from 'axios';
import BranchHome from './BranchHome';
import AdminHome from './AdminHome';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          branches : [],
          isBranchLogin : false,
          branchLogin : null,
          isAdminLogin: false,
          adminData : null,
          isSearch: false
        };
        this.search = this.search.bind(this);
        this.login = this.login.bind(this);
        this.branchLogout = this.branchLogout.bind(this);
        this.branchDataSet = this.branchDataSet.bind(this);
        this.adminDataSet = this.adminDataSet.bind(this);
        this.adminLogout = this.adminLogout.bind(this);
    }
    search(inputData){
        axios.post("/search",inputData)
        .then(res =>{
            this.setState({branches: res.data, isSearch: true})
        });
    }
    login(inputData){
        if(inputData.uName == "admin"){
            axios.post("http://localhost:8080/adminLogin",inputData)
            .then(res =>{
                if(res.data.isSuccess){
                    this.setState({isAdminLogin : true, adminData: res.data});
                }
                else
                    this.setState({isLoginFailed:true});

            })
        }
        else{
            console.log(inputData);
            axios.post("http://localhost:8080/login",inputData)
            .then(res =>{
                if(res.data.isSuccess)
                    this.setState({isBranchLogin: true, branchLogin: res.data});
                else
                    this.setState({isLoginFailed:true})
            })
        }
    }
    branchDataSet(res){
        this.setState({isBranchLogin: true, branchLogin: res.data, isAdminLogin:false});
    }
    branchLogout(){
        this.setState({isBranchLogin : false, branchLogin : null, isSearch : false, branches : []});
    }
    adminDataSet(res){
        console.log(res);
        this.setState({isAdminLogin : true, adminData: res.data, isBranchLogin:false});
    }
    adminLogout(){
        this.setState({isAdminLogin : false, adminData : null, isSearch: false, branches:[]});
    }
    render(){
        if(this.state.isAdminLogin){
            return(
                <div>
                    <AdminHome logout={this.adminLogout} adminData={this.state.adminData}/>
                </div>
            )
        }
        else if(this.state.isBranchLogin){
            return(
                <div>
                    <BranchHome logout={this.branchLogout} branchData={this.state.branchLogin}/>
                </div>
            )
        }
        return(
        <div className="container">
            <Row>
                <Col className="h1">Welcome to the Beenut Hunt</Col>
                <Col sm="1"><Login adminDataSet={this.adminDataSet} branchDataSet={this.branchDataSet}/></Col>
            </Row>
            <Row><Col className="text-center h5">Search for branches with pincodes</Col></Row>
            <Search search={this.search}/>
            <Result branches = {this.state.branches} isSearch={this.state.isSearch}/>
        </div>
        )
    }
}   

export default Home;