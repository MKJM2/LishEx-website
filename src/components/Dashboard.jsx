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
  Progress,
  Button,
  Card,
  Icon,
	Breadcrumb,
	Label
} from 'semantic-ui-react'

import {isAuth, removeCookie} from '../features/login/helpers'
import Footer from '../components/Footer'

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


const ExerciseListCard = (title, breadcrumbs, percentage, tag, color) => (
  <Card fluid style={{marginRight: '0'}} href={`/section/${breadcrumbs.section}/category/${breadcrumbs.category}/subcategory/${breadcrumbs.subcategory}/unit/${title}`}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>
		  {unitBreadcrumbs(breadcrumbs.section,breadcrumbs.category,breadcrumbs.subcategory)}
      </Card.Meta>
      <Card.Description>
	  {percentage}% Finished
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
			<Label basic as='a' color={color}>
				{tag}
			</Label>
    </Card.Content>
  </Card>
)

const unitBreadcrumbs = (section, category, subcategory) => {
  
  let sections = [{key:section, content:section, href: `/section/${section}`},
    {key:category, content:category, href: `/section/${section}/category/${category}`},
    {key:subcategory, content:subcategory, href: `/section/${section}/category/${category}/subcategory/${subcategory}`}
  ]
  return (
    <Breadcrumb icon='right angle' sections={sections}/>
  )  
}

export const DashboardMenu = () => (
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
)

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
	    {DashboardMenu()}

	    <Container text style={{ marginTop: '4em' }}>
	      <Header as='h1'><Image src={`https://avatars.dicebear.com/api/bottts/${firstName}${lastName}.svg`} avatar />{firstName} {lastName}</Header>
		  <Header.Subheader style={{color: 'grey'}}>ID: {userID}</Header.Subheader>
	      <p style={{color: 'grey'}}>Role: {role}</p>
	      <p>Level: {level}  <br/>
	      Experience: {experience}</p>
	      <Progress indicating percent={parseInt(experience+9000)/100} progress color='teal'/>
		  <Header as='h3'>Your exercises:</Header>

		  <Grid columns={2} stackable container>

		  <Grid.Row>
		  	<Grid.Column style={{ paddingLeft: '0'}}>
				    {ExerciseListCard("Present Simple",{section:"Grammar",category:"Tenses", subcategory:"Present"},"100","Easy","green")}
				</Grid.Column>

		  	<Grid.Column style={{ paddingRight: '0'}}>
				    {ExerciseListCard("Present Continuous",{section:"Grammar",category:"Tenses", subcategory:"Present"},"100","Easy","green")}
				</Grid.Column>
		  </Grid.Row>

		  <Grid.Row>
		  	<Grid.Column style={{ paddingLeft: '0'}}>
				    {ExerciseListCard("Present Perfect",{section:"Grammar",category:"Tenses", subcategory:"Present"},"80","Intermediate","orange")}
			</Grid.Column>
		  	<Grid.Column style={{ paddingRight: '0'}}>
				    {ExerciseListCard("Past Perfect",{section:"Grammar",category:"Tenses", subcategory:"Past"},"10","Advanced","red")}
			</Grid.Column>
		  </Grid.Row>

		  </Grid>

			<Divider/>
	    </Container>
	    <Footer/>	
	  </div>
	)
}

export default Dashboard

//export default Dashboard;
