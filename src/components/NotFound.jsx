import React from 'react'

import { Image, Container, Header } from 'semantic-ui-react'
import NotFoundImage from '../assets/404_page_not_found__two_color.svg'

function NotFound() {
	return (
	<Container>
		<Image src={NotFoundImage}/>
		<Header size="huge" textAlign="center">
		<a href="/" style={{color: "#782111"}}>
			Return to the landing page
		</a>
		</Header>
	</Container>
	)
}

export default NotFound
