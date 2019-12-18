import React from "react";
import "./login.css";
class Login extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div className="body">
            <div  className = "container">

                <div className="login-item">
                        <form action="" method="post" className="form form-login">
                            <div className="form-field">
                                <label className="user" htmlFor="login-username"><span className="hidden">Username</span></label>
                                <input id="login-username" type="text" className="form-input" placeholder="Username" required>
                                </input>
                            </div>

                            <div className="form-field">
                                <label className="lock" htmlFor="login-password"><span className="hidden">Password</span></label>
                                <input id="login-password" type="password" className="form-input" placeholder="Password" required>
                                </input>
                            </div>

                            <div className="form-field">
                                <input type="submit" value="Log in">
                                </input>
                            </div>
                        </form>
                    </div>
                <div className="container1">Hello</div>

            </div>

            </div>


        );
    }
}

export default Login;