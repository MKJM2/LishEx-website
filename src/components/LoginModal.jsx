import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';

import {
  postLoginData,
  selectLoginStatus,
  selectIsLoggingIn,
  selectFailed
} from '../features/login/loginSlice';

import { Button, Icon, Divider, Grid, Header, Image, Modal, Menu, Checkbox, Form, Segment } from 'semantic-ui-react'
import authSvg from '../assets/authentication.svg'


function LoginModal() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoginStatus)
  const isLoggingIn = useSelector(selectIsLoggingIn)
  const failed = useSelector(selectFailed)

  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
	  email:'',
	  password:'',
	  rememberMe: true,
  })

  const { email, password, rememberMe } = formData

//Handle change from inputs
  const handleChange = text => e => {
	e.preventDefault()

	setFormData({...formData, [text]: e.target.value})
  }
  const handleCheckbox = () => {
	  setFormData({...formData, ['rememberMe']: !formData.rememberMe})
  }
  const handleSubmit = e => {
	  e.preventDefault()
	  console.log("Submitting form")
	  dispatch(postLoginData(email, password, rememberMe))

  }
  const debugging = false

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer={true}
      size='large'
      closeIcon
      trigger={<Menu.Item>Login</Menu.Item>}
    >
    <Grid columns={2} padded>
	  <Grid.Row stretched>
	  <Grid.Column width={10}>
	  	  <Image size="massive" src={authSvg} bordered={debugging} />
	  </Grid.Column>
	  <Grid.Column verticalAlign='middle' width={6}>
	  <Segment basic={!debugging} textAlign='center'>
		  <Header size='huge' textAlign='center'>Login to LishEx</Header>
		  <Header.Subheader>
		  Check out our very cool website!
		  </Header.Subheader>
	  	
	  	<Divider/>

		<Form onSubmit={handleSubmit}>
		    <Form.Input
		      fluid
		      size='big'
		      icon='user'
		      type='email'
		      iconPosition='left'
		      placeholder='Email'
		      name='email'
		      value={email}
		      onChange={handleChange('email')}
		    />
		    <Form.Input
		      fluid
		      size='big'
		      icon='lock'
		      type='password'
		      iconPosition='left'
		      placeholder='Password'
		      name='password'
		      value={password}
		      onChange={handleChange('password')}
		    />
		    <Form.Checkbox defaultChecked  label='Remember me?'
	  		onChange={handleCheckbox}/>
		  <Button positive type='submit' loading={isLoggingIn} fluid>
	  		LOGIN<Icon name='arrow right'/>
	  	  </Button>
		</Form>
	  	
		<Divider horizontal>Or</Divider>

	  	<Link to='/register'><Button fluid>Create an account</Button></Link>
	</Segment>
	</Grid.Column>
	</Grid.Row>
    </Grid>
    </Modal>
  )
}

export default LoginModal
