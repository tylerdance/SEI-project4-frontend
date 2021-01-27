// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ImageUploadRegister from '../ImageUploadRegister'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [preference, setPreference] = useState('');
    const [location, setLocation] = useState('')
    const [photo, setPhoto] = useState('');
    const handleName = (e) => {
        setName(e.target.value);
    }
    //////////////////////
    const handleAge = (e) => {
        setAge(parseInt(e.target.value));
        // console.log(age)
        // console.log(typeof age)
    }
    const handleBio = (e) => {
        setBio(e.target.value);
    }
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    const handlePreference = (e) => {
        setPreference(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handlePhoto = (e) => {
        setPhoto(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(typeof age)
        if (password === confirmPassword && password.length >= 8 && age >17 && photo!=="" && age !== "" && name!=="" && gender!=="" && preference !== "" && location !== "") {
            const newUser = { name, email, password, age, gender, bio, preference, location, photo };
            await axios.post(`${REACT_APP_SERVER_URL}/api/users/register`, newUser)
            .then(response => {
                // console.log(response);
                setRedirect(true);
            })
            .catch(error => {
                // console.log(error); 
                alert('Email already in use')
            })
        } else if (password !== confirmPassword) {
                alert('Password confirmation does not match password')
        } else if (password.length < 8){
            alert('Password must be at least 8 characters')
        } else if (age < 18 || age === ''){
            alert('Must be 18 or over')
        } else if (photo===""){
            alert("must upload image")
        } else if (name===""){
            alert("must register a name")
        } else if (gender===""){
            alert("must specify gender")
        } else if (gender===""){
             alert("must specify preference")
        } else if (location === '') {
            alert("Please select your location")
        }
    }
    if (redirect) return <Redirect to='/login' />
    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={handleName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age (must be over 18)</label>
                            <input type="number" name="age" value={age} onChange={handleAge} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <select name="location" id="location-drop-down" onChange={handleLocation}>
                                <option value="">Select your location</option>
                                <option value="Atlanta, GA">Atlanta, GA</option>
                                <option value="Austin, TX">Austin, TX</option>
                                <option value="Boston, MA">Boston, MA</option>
                                <option value="Cleveland, OH">Cleveland, OH</option>
                                <option value="DC">DC</option>
                                <option value="Denver, CO">Denver, CO</option>
                                <option value="El Paso, TX">El Paso, TX</option>
                                <option value="Jacksonville, FL">Jacksonville, FL</option>
                                <option value="Kansas City, KS">Kansas City, KS</option>
                                <option value="Las Vegas, NV">Las Vegas, NV</option>
                                <option value="Los Angeles, CA">Los Angeles, CA</option>
                                <option value="Miami, FL">Miami, FL</option>
                                <option value="Minneapolis, MN">Minneapolis, MN</option>
                                <option value="Nashville, TN">Nashville, TN</option>
                                <option value="New York, NY">New York, NY</option>
                                <option value="Oakland, CA">Oakland, CA</option>
                                <option value="Philadelphia, PA">Philadelphia, PA</option>
                                <option value="Phoenix, AZ">Phoenix, AZ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Bio">Bio</label>
                            <input type="text" name="bio" value={bio} onChange={handleBio} className="form-control" />
                       </div>
                       <div className="form-group">
                            <input type="radio" id="male" name="gender" value="male" onChange={handleGender}/>
                            <label for="male">Male</label><br />
                            <input type="radio" id="female" name="gender" value="female" onChange={handleGender}/>
                            <label for="female">Female</label><br/>
                       </div>
                        <div className="form-group">
                            <label htmlFor="Preference">Preference</label>
                            <select name="preference" id="preference"  onChange={handlePreference}>
                                <option value="">Select your preference</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                        <div>
                            <p>Upload your profile picture</p>
                            <ImageUploadRegister photo={setPhoto}/>
                            <input type="hidden" name="photo" value={photo} onChange={handlePhoto} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup;