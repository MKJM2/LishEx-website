import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

import {isAuth} from '../features/login/helpers'


import { Button, Icon, Divider, Grid, Header, Image, Modal, Menu, Checkbox, Form, Segment } from 'semantic-ui-react'
import axios from 'axios'

import image from '../assets/authentication_two_color.svg'


const Register = ({history}) => {


	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email:'',
		password1:'',
		password2:''
	})

 	const [menu, setActiveMenuItem] = useState({
		activeMenuItem: '' 
	})

	const [section, setSection] = useState({
		currentSection: 0
	})

	const [formStatus, setFormStatus] = useState({
		isRegistering: false,
		registered: false
	})

  	const handleItemClick = (name) => e => {
		setActiveMenuItem({ activeMenuItem: name })
	}

	const handleSectionButtonClick = e => {
		setSection({currentSection: 1})
	}

	const {firstName, lastName, email, password1, password2} = formData
	const {activeMenuItem} = menu
	const {currentSection} = section
	const {isRegistering, registered} = formStatus

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
				console.log("Passwords match")

				//Should have been in a separate file but w/e
				setFormStatus({isRegistering: true})

				axios.post((process.env.REACT_APP_BACKEND_URI+"/api/auth/register"), {
					firstName, lastName, email, password: password1, role: activeMenuItem
				})
				.then(res => {
						console.log(res)
				}).catch(err => {
					console.log(err)
				}).finally(() => {
					setFormStatus({isRegistering: false, registered: true})
				})
			} else {
				//Toast-> Passwords do not match
				console.log("Passwords do not match")
			}

		} else {
			//Toast - please fill in all the fields
			console.log("Please fill in all the fields")
		}
	}

	const activationModal = () => {
		return (
		<Segment basic textAlign={"center"}>
			<Icon size="huge" name="check circle outline"/>
			<Header>{firstName}, you're almost done!</Header>
			<Header.Subheader>We've sent an email to {email}. Click the
			link in the email to activate your account.
			</Header.Subheader>
			<br/>
			If you don't see the email, please check other places it might be, such as your spam,
			junk, social, or other folders.
			<br/>
			<br/>
			<a href="/help">I didn't receive an email</a>
		</Segment>
		)
	}

	return (

	<div>
	  {isAuth() ? <Redirect to="/" /> : null}
	  <Grid columns={4} stackable stretched>
	    <Grid.Row >

		    <Grid.Column floated='left' width={3}/>

		    <Grid.Column width={4}>

		{registered ? activationModal() : <Segment basic textAlign={currentSection=== 0 ? "center" : "left"}>
				    <Header textAlign='center'>Register Now</Header>
				    {currentSection === 0 ?
				<div>
				    <Header.Subheader>I am a</Header.Subheader>
				    <Menu fluid widths={2}>
					<Menu.Item
					  color='teal'
					  name='Student'
					  active={activeMenuItem === 'student'}
					  onClick={handleItemClick("student")}
					/>
					<Menu.Item
					  color='violet'
					  name='Teacher'
					  active={activeMenuItem === 'teacher'}
					  onClick={handleItemClick("teacher")}
					/>
				    </Menu>
				    {
					    //READ UP ON COPPA
				    }
				    {activeMenuItem==='' ? null :
					    <Button fluid positive
					    onClick={handleSectionButtonClick} 
					    >
					    Register with email
					    </Button>
				    }
				</div>

				: ( //Otherwise

				<Form onSubmit={handleSubmit} loading={isRegistering}>
					<Form.Input
					    fluid
					    type='text'
					    label='Your first name'
					    onChange={handleChange('firstName')}
					    value={firstName}
					/>
					<Form.Input
					    fluid
					    type='text'
					    label='Last name'
					    onChange={handleChange('lastName')}
					    value={lastName}
					/>
					<Form.Input
					    fluid
					    type='email'
					    label='Email address'
					    onChange={handleChange('email')}
					    value={email}
					/>
					<Form.Input
					    fluid
					    type='password'
					    label='Password'
					    onChange={handleChange('password1')}
					    value={password1}
					/>
					<Form.Input
					    fluid
					    type='password'
					    label='Confirm your password'
					    onChange={handleChange('password2')}
					    value={password2}
					/>

					<Form.Button
					    fluid
					    positive
					    type='submit'
					    content="Get started"
					    onClick={handleSubmit}
					/>	
					

				</Form>

				)}

				<Header textAlign='center'
					size='tiny'
					>
				<a href='login'>Already have an account?</a>
				</Header>

			    </Segment>

		   }
			
		    </Grid.Column>

		    <Grid.Column width={6}>
			    <Image fluid verticalAlign='middle' centered='true' src={image}/>
		    </Grid.Column>

		    <Grid.Column floated='right' width={3}/>

	    </Grid.Row>
	  </Grid>
	</div>
	)
}

export default Register
