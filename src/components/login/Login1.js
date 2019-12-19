import React from "react";
import "./login.css";
import {Icon} from "antd";
class Login extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div className="container1">
                <div className="container">
                    <div className="logo"><Icon type="dollar" />Smart Money</div>
                    <div className="login-item">
                        <form action="" method="post" className="form form-login">
                            <div className="form-field">
                                <label className="user" htmlFor="login-username"><span
                                    className="hidden">Username</span></label>
                                <input id="login-username" type="text" className="form-input" placeholder="Username"
                                       required/>
                            </div>

                            <div className="form-field">
                                <label className="lock" htmlFor="login-password"><span
                                    className="hidden">Password</span></label>
                                <input id="login-password" type="password" className="form-input" placeholder="Password"
                                       required/>
                            </div>

                            <div className="form-field">
                                <input  type="submit" value="Log in"/>
                            </div>
                            <div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							or sign up using
						</span>
                            </div>

                            <div className="login100-form-social flex-c-m">
                                <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                                    <i className="fa fa-facebook-f" aria-hidden="true"/>
                                </a>

                                <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                    <i className="fa fa-twitter" aria-hidden="true"/>
                                </a>
                                <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                    <i className="fa fa-google" aria-hidden="true"/>
                                </a>
                            </div>


                        </form>

                    </div>
                </div>
            </div>

        );
    }
}

export default Login;