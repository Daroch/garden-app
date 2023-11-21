//import React, { Component } from 'react';
//import LoginImg from "../../../static/assets/images/auth/login.jpg";
import Login from '../auth/login';

export default function Auth () {
    constructor(props){
        super(props);

        this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
        this.handleUnsuccesfulAuth = this.handleUnsuccesfulAuth.bind(this);
    }

    function handleSuccesfulAuth(){
        handleSuccesfulLogin();
        this.props.history.push("/");
    }

    function handleUnsuccesfulAuth(){
        this.props.handleUnsuccesfulLogin();
    }

    render() {
        return (
            <div className="auth-page-wrapper">
                <div className="left-column" 
                style={{
                    backgroundImage: `url(${LoginImg})`
                }}
                />
                <div className="right-column">
                    <Login 
                    handleSuccesfulAuth={handleSuccesfulAuth}
                    handleUnsuccesfulAuth={handleUnsuccesfulAuth}
                    />
                </div>
            </div>
        );
    }
}
