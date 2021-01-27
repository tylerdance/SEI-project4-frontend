// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        const info = {
            email: userData.email,
            online: true
        }
        await axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            // console.log(response.data)
            // Save token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            // Set current user
            props.nowCurrentUser(decoded);
            axios.post(`${REACT_APP_SERVER_URL}/api/users/profile/status`, info)
        })
        .catch(error =>{
            // console.log(error);
            alert('Either email or password is incorrect')
        })
    } 
    let notification
    if (props.user) {notification = `/chat/${props.user.id}`}
    if (props.user) return <Redirect to={notification} />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;