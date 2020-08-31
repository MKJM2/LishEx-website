import React from 'react';
import { Exercise } from './features/exercise/Exercise'
import { Logo } from './components/Logo'
import { NavBar } from './components/Navbar'
import styles from './styles.css'
import { Container } from 'semantic-ui-react'
import backgroundImage from './assets/graduation.svg'
import LandingPage  from './components/LandingPage'
import LoginModal from './components/LoginModal'
import SectionPage from './components/SectionPage'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Unit from './components/UnitPage'
import NotFound from './components/NotFound'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
///782144

function App() {
  return (

    <BrowserRouter>
	<Switch>
	  <Route path='/' exact>
			<NavBar>
			<LandingPage/>
			</NavBar>
	  </Route>
	  <Route path='/login' exact>
	  	<Redirect to='/'/>
	  </Route>

	  <Route path='/register' exact>
		<NavBar>
	  	<Register/>
	  	</NavBar>
	  </Route>

	  <Route path='/dashboard' exact>
	  	<Dashboard />
	  </Route>

	    <Route path='/section/:section' exact 
		 component={SectionPage}
	    />
	    
	    <Route path='/section/:section/category/:category/subcategory/:subcategory/unit/:unit'
		exact
		component={Unit}
	    />
	
	  //Any route not exactly matched returns the 404 page
	  <Route path='/'>
	  	<NotFound/>
	  </Route>

	</Switch>
    </BrowserRouter>
  );
}

export default App;
