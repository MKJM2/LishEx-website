import React from 'react'
import { useEffect } from 'react';
import { Logo } from './Logo'
import { NavBar } from './Navbar'
import { Exercise } from '../features/exercise/Exercise.js'
import styles from '../styles.css'
import { Grid, Image, Segment } from 'semantic-ui-react'
import backgroundImage from '../assets/graduation.svg'
import Prism from 'prismjs'
import "../prism.css"
///782144

function LandingPage() {

  return (
<div>
  <Grid  columns={4} stackable stretched >
    <Grid.Row >

	    <Grid.Column floated='left' width={2}/>

	    <Grid.Column key={"background"} width={7}>
		    <Image fluid verticalAlign='middle' centered='true' src={backgroundImage}/>
	    </Grid.Column>

	    <Grid.Column width={5}>


	  	    <Segment basic>
	  	    </Segment>

		    <Exercise/>

	  	    <Segment basic>
	  	    </Segment>
	  	
	    </Grid.Column>

	    <Grid.Column floated='right' width={2}/>

    </Grid.Row>
  </Grid>
</div>
  );
}

export default LandingPage;
