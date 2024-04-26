import React from "react"
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/login', { email, password })
            .then(result => {
                console.log(result.data)
                if (result.data === 'Success') {
                    navigate('/home');
                } else {
                    navigate('/register')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={handlePassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <Link to='/register' type="submit" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Signup</Link>
            </div>
        </div>
    );
}
export default Login