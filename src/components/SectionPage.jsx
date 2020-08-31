import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { Header } from 'semantic-ui-react'

import {isAuth } from '../features/login/helpers'


function SectionPage(props) {

	return (
	  <div>
	    {!isAuth() ? <Redirect to="/" /> : null}
	    <Header>{props.match.params.section} - section page</Header>
	  </div>
	)
}

export default SectionPage

//export default Dashboard;
