import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
//import MenuIcon from '@material-ui/icons/Menu';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  headerLinkContainer: {
    width: 100
  },
  pointer: {
    cursor: 'pointer'
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            {/*{<MenuIcon />*/}
          </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <span className={ classes.pointer } onClick={ () => window.location.replace('/#/') } >wsChat</span>
            </Typography>{/*
          <Button color="inherit">Login</Button>*/}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/*class Header extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const {classes} = this.props;
    return (
        <div>
          <Navbar color="light" light expand="sm">
            <NavbarBrand href="/">WsChat</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/Kernstall/g-eHub">GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Баны
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Режим игрок
                    </DropdownItem>
                    <DropdownItem>
                      Режим админ
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
  }
}*/

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);