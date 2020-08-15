import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

import {isAuth} from '../features/login/helpers'

import image from '../assets/authentication_two_color.svg'


const Register = ({history}) => {


	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email:'',
		password1:'',
		password2:''
	})

	const {firstName, lastName, email, password1, password2} = formData

	//Handle change from inputs
	const handleChange = text => e => {
		setFormData({...formData, [text]: e.target.value})
	}

	
	//Submit data to backend
	const handleSubmit = e => {
		e.preventDefault()
		if(firstName&&lastName&&email&&password1){
			if(password1===password2){
				//Post request - redux thunk
				//dispatch(blablabla)
			} else {
				//Toast-> Passwords do not match
			}

		} else {
			//Toast - please fill in all the fields
		}
	}

	return (
		<div>
			{isAuth() ? <Redirect to="/" /> : null}
			<h1>Register Page</h1>
			<img src={image} alt="Image"/>
		</div>
	)
}

export default Register
