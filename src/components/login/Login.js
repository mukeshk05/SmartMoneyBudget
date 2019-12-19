import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
import "./login1.css";
import "./login3.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDYO5FfdKiE6zp2Bt1rdYUnhL3xxNt3uBI",
    authDomain: "react-firebase-auth-272e9.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-272e9.firebaseio.com",
    projectId: "react-firebase-auth-272e9",
    storageBucket: "react-firebase-auth-272e9.appspot.com",
    messagingSenderId: "922542910301",
    appId: "1:922542910301:web:7d9383dd9b746ba41816b4",
    measurementId: "G-7LTMHK4P84"
};

const Login = props => {
    const [collapsed, onCollapse] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({
        type: CURRENT_COMPONENT,
        payload: { component: "login", sideBarMenuKey: "login" }
      });
    }, [dispatch]);

    const handelGoogleLogin=e=>
    {
      console.log("google login");
        firebase.initializeApp(firebaseConfig);
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log(result)
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }

    {

        return (

            <div className="container-login100">
                <div className="wrap-login100">
                    <form action="" method="post" className="login100-form validate-form">
					<span className="login100-form-title p-b-43">
						Login to continue
					</span>


                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="email"/>
                            <span className="focus-input100"/>
                            <span className="label-input100">Email</span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" name="pass"/>
                            <span className="focus-input100"/>
                            <span className="label-input100">Password</span>
                        </div>

                        <div className="flex-sb-m w-full p-t-3 p-b-32">
                            <div>
                                <a href="#" className="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>


                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Login
                            </button>
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
                            <a href="#" className="login100-form-social-item flex-c-m bg3 m-r-5" onClick={handelGoogleLogin}>
                                <i className="fa fa-google" aria-hidden="true" />
                            </a>
                        </div>
                    </form>

                    <div className="login100-more">
                    </div>
                </div>
            </div>



        );
    }
};
export  default Login;
