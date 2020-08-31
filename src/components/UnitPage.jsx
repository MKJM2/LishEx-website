import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import {isAuth, removeCookie} from '../features/login/helpers'

import Footer from '../components/Footer'
import { DashboardMenu } from '../components/Dashboard'


import {
    selectUnit,
    selectCategory,
    selectSection,
    selectSubcategory,
    selectExercises,
    getExercisesByUnit,
    setEssayForUser,
    selectUnitDataFetched,
    selectIsFetchingData
} from '../features/unit/unitSlice'

import { 
    getAuthenticatedUserID,
    selectUserID,
    selectUserEssay
} from '../features/dashboard/dashboardSlice'

import { 
    Container,
    Breadcrumb,
    Header,
    Input,
    Form,
    TextArea
} from 'semantic-ui-react'
import TextareaAutosize from "react-textarea-autosize";

const unitBreadcrumbs = (section, category, subcategory, unit) => {
  
  let sections = [{key:section, content:section, href: `/section/${section}`},
    {key:category, content:category, href: `/section/${section}/category/${category}`},
    {key:subcategory, content:subcategory, href: `/section/${section}/category/${category}/subcategory/${subcategory}`},
    {key:unit, content:unit, href: `/section/${section}/category/${category}/subcategory/${subcategory}/unit/${unit}`, active: true}
  ]

  return (
    <Breadcrumb icon='right angle'>
	<Breadcrumb.Section link href={`/section/${section}`}>{section}</Breadcrumb.Section>
	<Breadcrumb.Divider />
	<Breadcrumb.Section link href={`/section/${section}/category/${category}`}>{category}</Breadcrumb.Section>
	<Breadcrumb.Divider />
	<Breadcrumb.Section link href={`/section/${section}/category/${category}/subcategory/${subcategory}`}>{subcategory}</Breadcrumb.Section>
	<Breadcrumb.Divider />
	<Breadcrumb.Section active>{unit}</Breadcrumb.Section>
    </Breadcrumb>
  )  
}

function Unit(props) {

	const dispatch = useDispatch()
	const unit = useSelector(selectUnit)
	const section = useSelector(selectSection)
	const category = useSelector(selectCategory)
	const subcategory = useSelector(selectSubcategory)
	const exercises = useSelector(selectExercises)


	const userID = useSelector(selectUserID)
	const essayFetched = useSelector(selectUserEssay)

	const dataFetched = useSelector(selectUnitDataFetched)
	const fetchingData = useSelector(selectIsFetchingData)

	useEffect(() => {
		dispatch(getExercisesByUnit(props.match.params.unit))
	}, [dataFetched])

	useEffect(() => {
		dispatch(getAuthenticatedUserID())
		setEssay(essayFetched)
	}, [userID, essayFetched])

	const [essay, setEssay] = useState(essayFetched)
	const handleChange = e => setEssay(e.target.value)
	const handleSubmit = () => {
	    dispatch(setEssayForUser(essay, userID))
	}

	return (
	    <>
		{DashboardMenu()}
		<Container text style={{ marginTop: '4em' }}>
		    {!isAuth() ? <Redirect to="/" /> : null}
		    {unitBreadcrumbs(section,category,subcategory, unit)}
		    <Header>Essay:</Header>
		    <Form onSubmit={handleSubmit}>
			<TextareaAutosize rows={4} placeholder={"Your essay goes here"} onChange={handleChange} value={essay}/>
			<Form.Button>Submit</Form.Button>
		    </Form>
		</Container>
		<Footer/>
	    </>
	)
}

export default Unit

//export default Dashboard;
