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
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";

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
  },
  textField: {
    width: 200,
  },
  imgInput: {
    display: 'none',
  },
  uploadButton: {
    minHeight: '64px',
  },
};

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      name: '',
      image: null,
      ws: null,
      loggedIn: false,
      population: []
    }
  }

  componentWillMount() {
    const socket = new WebSocket(`ws://${ window.location.host }/online`);

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if(data.type === 'pop') {
        console.log(data.message);
        this.setState({ population: data.message });
        this.props.onUpdateState({ population: data.message });
      } else {
      }
    });
    this.setState({ ws: socket })
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value });
  };

  handleSubmit = () => {
    this.state.ws.send(JSON.stringify({type: 'greetings', name: this.state.name, image: this.state.image }));
    this.props.onUpdateState({ name: this.state.name });
    this.setState({loggedIn: true, open: false });
  };

  componentWillUnmount() {
    this.state.ws.close();
  }

  render () {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                {/*{<MenuIcon />*/}
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <span className={ classes.pointer } onClick={ () => window.location.replace('/#/') } >wsChat</span>
              </Typography>
              {
                !this.state.loggedIn &&
                <Button onClick={() => this.setState({open: true})} color="inherit">Checkout</Button>
              }
            </Toolbar>
          </AppBar>
          <Dialog
              open={this.state.open}
              aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">Choose your nick</DialogTitle>
            <DialogContent>
              <TextField
                  id="standard-name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  margin="normal"
              />
              <input
                  accept="image/*"
                  className={classes.imgInput}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={ (event) => {
                    if(event.target.files.length)
                    {
                      const FR = new FileReader();
                      FR.readAsDataURL(event.target.files[0]);
                      FR.onload = () => {
                        this.setState({image: FR.result});
                        //this.state.ws.send(JSON.stringify({type: 'image', name: this.state.name, message: FR.result }));
                      }
                    }
                  }}
              />
              <label htmlFor="contained-button-file">
                <Button color="primary" component="span" className={classes.uploadButton}>
                  Выберите аватар
                </Button>
              </label>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleSubmit()} color="primary"
                                   disabled={this.state.name === '' || !this.state.image}>
                Checkout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
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