import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'

// get env vars
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = "http://localhost:8000";



const Auth = () =>
{
    let navigate = useNavigate(); 
    const handleGoogleLogin = (response) => {
        const { profileObj } = response;
        console.log(profileObj);
        axios
            .post(`${baseURL}/auth/convert-token`, {
                token: response.accessToken,
                backend: "google-oauth2",
                grant_type: "convert_token",
                client_id: drfClientId,
                client_secret: drfClientSecret,
            })
            .then((res) => {
                console.log(res.data);
                const { access_token, refresh_token } = res.data;
                console.log({ access_token, refresh_token });
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                navigate('/home')
            })
            .catch((err) => {
                console.log("Error Google login", err);
            });
    };
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);
    return (
        <div className="App">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username"/>

                    <label for="password">Password</label>
                    <input type="password" placeholder="Password" id="password"/>

                        <button>Log In</button>
                        <div className="social">
                    {/* <div className="go"><i className="fab fa-google"></i> */}
                        <GoogleLogin
                        clientId={googleClientId}
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={(response) => handleGoogleLogin(response)}
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                type="button"
                                className="login-with-google-btn"
                            >
                                Google
                            </button>
                        )}
                        onFailure={(err) => console.log("Google Login failed", err)}
                    />
                {/* </div> */}
                    {/* <div className="fb"><button><i className="fab fa-facebook"></i>  Facebook</button></div> */}
                        </div>
            </form>
            


        </div>
   
       
       
                    
                                     
    );
};

export default Auth;
