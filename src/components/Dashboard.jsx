import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Logo from '../assets/drawing.svg'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button
} from 'semantic-ui-react'

import {isAuth, removeCookie} from '../features/login/helpers'

import {
	getAuthenticatedUserID,
	selectUserID,
	selectFirstName,
	selectLastName,
	selectRole,
	selectLevel,
	selectExperience,
	selectUserExercises,
	selectIsFetchingData,
	selectUserDataFetched
} from '../features/dashboard/dashboardSlice'
import { useSelector, useDispatch } from 'react-redux';


function Dashboard() {

	const dispatch = useDispatch()
	const userID = useSelector(selectUserID)
	const firstName = useSelector(selectFirstName)
	const lastName = useSelector(selectLastName)
	const role = useSelector(selectRole)
	const level = useSelector(selectLevel)
	const experience = useSelector(selectExperience)
	const exercises = useSelector(selectUserExercises)
	const isFetchingUserData = useSelector(selectIsFetchingData)
	const userDataFetched = useSelector(selectUserDataFetched)
	const userData = {userID, firstName, lastName, role, level, experience, exercises}

	useEffect(() => {
		dispatch(getAuthenticatedUserID())
	}, [userDataFetched])


	return (
	  <div>
	    {!isAuth() ? <Redirect to="/" /> : null}
	    <Menu secondary size="huge">
	      <Container>
		<Menu.Item>
		  <Image size='mini' src={Logo} />
		</Menu.Item>
		<Menu.Item as='a' href="/">Home</Menu.Item>

		<Dropdown item simple text='Dropdown'>
		  <Dropdown.Menu>
		    <Dropdown.Item>List Item</Dropdown.Item>
		    <Dropdown.Item>List Item</Dropdown.Item>
		    <Dropdown.Divider />
		    <Dropdown.Header>Header Item</Dropdown.Header>
		    <Dropdown.Item>
		      <i className='dropdown icon' />
		      <span className='text'>Submenu</span>
		      <Dropdown.Menu>
			<Dropdown.Item>List Item</Dropdown.Item>
			<Dropdown.Item>List Item</Dropdown.Item>
		      </Dropdown.Menu>
		    </Dropdown.Item>
		    <Dropdown.Item>List Item</Dropdown.Item>
		  </Dropdown.Menu>
		</Dropdown>
		<Menu.Menu position="right">
			<Menu.Item as='a' href="/" 
			onClick={() => {
				//User logs out, delete all the cookies
				removeCookie("ATKN")
				removeCookie("RTKN")
			}}		
			>Log out</Menu.Item>
		</Menu.Menu>
	      </Container>
	    </Menu>

	    <Container text style={{ marginTop: '4em' }}>
	      <Header as='h1'>Semantic UI React Fixed Template</Header>
	      <p>This is a basic fixed menu template using fixed size containers.</p>
	      <p>User ID: {userID}</p>
	      <p>First Name: {firstName}</p>
	      <p>Last Name: {lastName}</p>
	      <p>Role: {role}</p>
	      <p>Level: {level}</p>
	      <p>Experience: {experience}</p>
	      <p>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur gravida congue mauris, sit amet tincidunt purus consectetur eget. Vivamus quam ante, varius eu nulla sed, rutrum scelerisque dui. Donec ligula lorem, tincidunt at ultricies a, posuere eget velit. In non est id justo consectetur egestas. Morbi ex elit, fringilla nec tristique non, rutrum in urna. Nam vel enim sed purus viverra consequat a nec odio. Duis vulputate mollis dolor, ac interdum elit molestie vitae. Aenean eget lacus vitae turpis pretium auctor ac ac nibh. Donec nec elementum orci. Nulla elementum tincidunt ligula ut dapibus. Morbi ultrices mattis erat, ultricies aliquet ipsum dapibus nec. Nam aliquet, magna quis consequat ultrices, nulla tortor congue augue, non placerat enim dui sed velit. Quisque porttitor nisi tempor dapibus rutrum.

	      </p>
	<p>
	Vivamus mollis quis dui non aliquet. Mauris gravida consequat facilisis. Pellentesque laoreet lorem diam, sit amet varius massa imperdiet a. Suspendisse eu elit malesuada, aliquet quam a, ultricies nisl. Curabitur maximus, elit nec vestibulum porttitor, enim leo rutrum augue, ut venenatis ipsum ex vitae orci. Proin fringilla malesuada erat, vel posuere ligula vulputate ac. Vivamus scelerisque facilisis sapien, in laoreet turpis faucibus iaculis. Etiam ullamcorper leo eget mi egestas suscipit. Phasellus eleifend vulputate lectus, quis imperdiet turpis semper a. Donec nisl libero, malesuada eu odio a, consectetur vehicula velit. Sed sed suscipit ex. In vel erat ullamcorper, suscipit nibh a, eleifend neque.
		</p>

		<p>
	Donec pretium maximus elementum. Donec sollicitudin mi eget porttitor faucibus. Duis ac porttitor mauris. Mauris et tempus enim. Suspendisse semper risus diam, eget faucibus neque interdum quis. Donec fringilla sed elit nec pellentesque. Sed aliquet commodo iaculis. Nam sodales ligula eget eros pharetra, et posuere neque elementum. Donec rutrum augue quis lectus feugiat placerat. Quisque ullamcorper ante aliquet, ultricies justo non, euismod metus. Nam a tortor quis sem ornare tincidunt in ut erat. Sed nec mi enim. Integer vitae varius enim, dictum lacinia mi. Phasellus lacus diam, fringilla eu finibus eget, finibus et magna. Donec turpis sem, scelerisque fringilla nibh dapibus, porttitor eleifend dui. In ut mattis massa.
		</p>
	<p>
	Nullam feugiat gravida eros non tincidunt. Etiam sed finibus risus. Quisque sed facilisis elit, id hendrerit eros. Cras eu maximus neque. Nunc egestas justo congue tempor consectetur. In interdum placerat leo, quis porttitor odio laoreet id. Sed condimentum ultricies libero, et rhoncus leo accumsan in. Pellentesque non metus cursus, sagittis magna ut, efficitur leo. Fusce eu nulla lorem.
	</p>
	<p>
	Mauris rutrum eros eget dui lacinia, at fringilla metus scelerisque. Cras arcu quam, ornare ut felis in, hendrerit maximus orci. Sed vestibulum elit vitae eros ullamcorper, sit amet imperdiet enim ultricies. Morbi luctus et nunc non dapibus. In molestie aliquet erat, at finibus ipsum auctor in. Phasellus a lobortis arcu. Nunc gravida, magna nec luctus rhoncus, odio lacus dignissim elit, sed dignissim tellus justo vel est. Aliquam erat volutpat.
	</p>
	    </Container>

	    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
	      <Container textAlign='center'>
		<Grid divided inverted stackable>
		  <Grid.Column width={3}>
		    <Header inverted as='h4' content='Group 1' />
		    <List link inverted>
		      <List.Item as='a'>Link One</List.Item>
		      <List.Item as='a'>Link Two</List.Item>
		      <List.Item as='a'>Link Three</List.Item>
		      <List.Item as='a'>Link Four</List.Item>
		    </List>
		  </Grid.Column>
		  <Grid.Column width={3}>
		    <Header inverted as='h4' content='Group 2' />
		    <List link inverted>
		      <List.Item as='a'>Link One</List.Item>
		      <List.Item as='a'>Link Two</List.Item>
		      <List.Item as='a'>Link Three</List.Item>
		      <List.Item as='a'>Link Four</List.Item>
		    </List>
		  </Grid.Column>
		  <Grid.Column width={3}>
		    <Header inverted as='h4' content='Group 3' />
		    <List link inverted>
		      <List.Item as='a'>Link One</List.Item>
		      <List.Item as='a'>Link Two</List.Item>
		      <List.Item as='a'>Link Three</List.Item>
		      <List.Item as='a'>Link Four</List.Item>
		    </List>
		  </Grid.Column>
		  <Grid.Column width={7}>
		    <Header inverted as='h4' content='Footer Header' />
		    <p>
		      Extra space for a call to action inside the footer that could help re-engage users.
		    </p>
		  </Grid.Column>
		</Grid>

		<Divider inverted section />
		<Image centered size='mini' src={Logo}/>
		<List horizontal inverted divided link size='small'>
		  <List.Item as='a' href='#'>
		    Site Map
		  </List.Item>
		  <List.Item as='a' href='#'>
		    Contact Us
		  </List.Item>
		  <List.Item as='a' href='#'>
		    Terms and Conditions
		  </List.Item>
		  <List.Item as='a' href='#'>
		    Privacy Policy
		  </List.Item>
		</List>
	      </Container>
	    </Segment>
	  </div>
	)
}

export default Dashboard

//export default Dashboard;
