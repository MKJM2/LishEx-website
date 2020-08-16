import _ from "lodash";
import React, { Component } from "react";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Grid
} from "semantic-ui-react";
import icon from '../assets/drawing.svg'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      visible={visible}
      icon="labeled"
      vertical
      width="thin"
    >
    {leftItems.map(item => <Menu.Item {...item} />)}
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu secondary size="huge" fixed="top">
        <Menu.Item>
          <Image size="mini" src={icon} href="/"/>
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
	  <LoginModal/>
          {_.map(rightItems, item => <Menu.Item {...item} />)}
	  {/*Register Modal over here*/}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
<Grid>
  <Grid.Column computer={3} tablet={1} mobile={0}/>
	
  <Grid.Column computer={10} tablet={14} mobile={16}>
	  <Menu size="huge" secondary>
	    <Menu.Item header>
	      <Image size="mini" verticalAlign="middle" src={icon} href="/"/>
	    </Menu.Item>
	    {_.map(leftItems, item => <Menu.Item {...item} />)}
	    <Menu.Menu position="right">
	      <LoginModal/>
	      {_.map(rightItems, item => <Menu.Item {...item} />)}
	    </Menu.Menu>
	  </Menu>
  </Grid.Column>

  <Grid.Column computer={3} tablet={1} mobile={0}/>

</Grid>
);

export const NavBarChildren = ({ children }) => (
  <Container fluid style={{ marginTop: "3em" }}>{children}</Container>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    const leftItems = [
	  { as: "a", content: "Home", key: "home", href:"/"},
	  { as: "a", content: "Dashboard", key: "dashboard", href:"/dashboard"}
	];
    const rightItems = [
	  { as: "a", content: "Register", key: "register", href: "/register"}
	];

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}



export { NavBar }

