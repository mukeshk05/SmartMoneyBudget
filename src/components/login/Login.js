import React, {Component, useEffect, useState} from "react";
import "./login1.css";
import "./login3.css";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"
import app from "../base";
import * as firebase from "firebase";
import {compose, graphql, withApollo} from "react-apollo";
import {CREATE_USER} from "../../graphql/mutation/user/UserMutation";
import {Button, Spin} from "antd";
import SignUpForm from "./signup/SignUpForm";



class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false
        };

    }

    showModal = () => {
        this.toggleLoading(true);
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.toggleLoading(false);
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
        this.setState({ formRef: formRef });
    };
    toggleLoading = value => {
        this.setState({ loading: value });
    };


    handleSignUp = async event => {
        this.toggleLoading(true);
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
         const { history } = this.props;
        try {
            app.auth().signInWithPopup(provider).then(result=>{
                this.props.createUserMutation({
                    variables: {
                        user_id: result.user.email,
                        screen_user_name:result.user.displayName
                    }
                });
                this.toggleLoading(false);
                history.push('/');
            });

        } catch (error) {
            alert(error);
        }
    };



    handleFbSignUp = async event => {
        this.toggleLoading(true);
        event.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();
        const { history } = this.props;
        try {
            app.auth().signInWithPopup(provider).then(result=> {
                this.props.createUserMutation({
                    variables: {
                        user_id: result.user.email,
                        screen_user_name:result.user.displayName
                    }
                });
                this.toggleLoading(false);
                history.push('/');
            });
        } catch (error) {
            alert(error);
        }
    };


    render() {

        return (

            <div className="container-login100">

                <div className="wrap-login100">
                    <Spin size="large" spinning={this.state.loading}>


                    <form action="" method="post" className="login100-form validate-form">
					<span className="login100-form-title p-b-43">
						Login to continue
					</span>


                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="email" style={{background:"#f2f2f2",height:"78px",border:"0px"}}/>
                            <span className="focus-input100"/>
                            <span className="label-input100">Email</span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" name="pass" style={{background:"#f2f2f2",height:"78px",border:"0px"}}/>
                            <span className="focus-input100"/>
                            <span className="label-input100">Password</span>
                        </div>


                        <div className="flex-sb-m w-full p-t-3 p-b-32">
                            <div>
                                <a href="#" className="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                            <Button type="primary" onClick={this.showModal}>
                               Sign UP
                            </Button>
                            <SignUpForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />

                        </div>


                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Login
                            </button>
                        </div>

                        <div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							Login Using
						</span>
                        </div>

                        <div className="login100-form-social flex-c-m">
                            <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5" onClick={this.handleFbSignUp}>
                                <i className="fa fa-facebook-f" aria-hidden="true"/>
                            </a>

                            <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                <i className="fa fa-twitter" aria-hidden="true"/>
                            </a>
                            <a href="#" className="login100-form-social-item flex-c-m bg3 m-r-5" onClick={
                                this.handleSignUp
                            }>
                                <i className="fa fa-google" aria-hidden="true" />
                            </a>
                        </div>
                    </form>


                    </Spin>
                    <div className="login100-more">
                    </div>
                </div>

            </div>



        );
    }
}

export default compose(
    graphql(CREATE_USER, { name: "createUserMutation" })
)(withApollo(Login));
