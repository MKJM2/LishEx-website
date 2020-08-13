import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import image from '../assets/authentication.svg'


const Register = ({history}) => {


	const [formData, setFormData] = useState({
		email:'',
		password1:'',
	})

	const {email,password1} = formData

	//Handle change from inputs
	const handleChange = text => e => {
		const target = e.target

		const value = text === "rememberMe" ? target.checked : target.value
		setFormData({...formData, [text]: value})

	}


	
	//Submit data to backend
	const handleSubmit = e => {
		e.preventDefault()
		if(email&&password1){
			//Post request - redux thunk
		} else {
			//Error - specify mail and password
		}
	}

	return (
		<div>
			<p>Register Page</p>
			<img src={image} alt="Image"/>
		</div>
	)
}

export default Register
