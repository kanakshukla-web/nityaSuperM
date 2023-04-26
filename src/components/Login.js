import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logInApi } from '../ApiPaths';
import Card from 'react-bootstrap/Card';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const { email, password } = loginForm;

    const handleChange = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill the form values");
        }

        console.log(loginForm);

        logIn(loginForm);
    }

    const logIn = async (loginData) => {
        try {
            const response = await fetch(logInApi, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            const result = await response.json();
            if (result.Response.statusCode == 200) {
                console.log(result.Response.message);
                localStorage.setItem("isLoggedIn", 'true')
                localStorage.setItem("loginMode", 'normal')
                navigate("../");
                clearForm();
            }
            else {
                localStorage.clear();
            }
            alert(result.Response.message);

        } catch (error) {
            console.log("Error while Login");
            alert("Error while Login")
            console.log(error);
            localStorage.clear();
        }
    }

    const clearForm = () => {
        setLoginForm({
            email: '',
            password: ''
        })
    }

    const googleResponseMessage = (response) => {
        try {
            console.log(response);
            const userObject = jwt_decode(response.credential);
            console.log(userObject);
            if (userObject && userObject.email) {
                localStorage.setItem('user', JSON.stringify(userObject));
                localStorage.setItem("isLoggedIn", 'true')
                localStorage.setItem("loginMode", 'google')
                navigate("../");
                clearForm();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const googleErrorMessage = (error) => {
        console.log(error);
    };

    return (
        <Card className='login-card'>
            <Card.Header as="h5" className='text-center'>WELCOME BACK SuperM MEMBER</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <form>
                        <div>
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text"
                                placeholder="Enter Registered Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required />

                            <button className='btn btn-primary' type="button" onClick={handleSubmit}>Login</button>
                            <hr />
                            <label>
                                <input type="checkbox"
                                    checked="checked"
                                    name="remember" /> Remember me
                            </label>
                            <span className="psw"><a href="#">Forgot password?</a></span>
                        </div>

                    </form>

                    <hr />
                    <div style={{ marginLeft: '30%' }}>
                        <GoogleLogin
                            onSuccess={googleResponseMessage}
                            onError={googleErrorMessage}
                            auto_select />
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>


    )
}

export default Login