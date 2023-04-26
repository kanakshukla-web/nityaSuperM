import React, { useState } from 'react'
import { registerApi } from '../ApiPaths';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Button from './Button';

const Register = () => {

    const [details, setDetails] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const navigate = useNavigate();

    const { email, password, repeatPassword } = details;

    const changeHandler = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);

        if (!email || !password || !repeatPassword) {
            alert("Please fill all the fields.")
            return;
        }

        if (password !== repeatPassword) {
            alert("Password and RepeatPassword must be same");
            return;
        }
        addUser(details);
    }

    const addUser = async (userData) => {
        try {
            const response = await fetch(registerApi, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const result = await response.json();
            if (result.Response.statusCode == 201) {
                console.log(result.Response.message);
                clearForm();
                navigate("../login");
            }
            alert(result.Response.message);

        } catch (error) {
            console.log("Error while create User");
            alert("Error while create User")
            console.log(error);
        }
    }

    const clearForm = () => {
        setDetails({ email: '', password: '', repeatPassword: '' })
    }

    return (
        <Card className='login-card'>
            <Card.Header as="h5" className='text-center'>BECOME A SuperM MEMBER</Card.Header>
            <Card.Body>
                <Card.Text>
                    <form>
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={(e) => changeHandler(e)}
                            id="email"
                            required
                        />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={(e) => changeHandler(e)}
                            id="psw"
                            required />

                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={(e) => changeHandler(e)}
                            id="psw-repeat"
                            required
                        />
                        <hr />

                        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Register</button>

                    </form>
                </Card.Text>
            </Card.Body>
        </Card>


    )
}

export default Register