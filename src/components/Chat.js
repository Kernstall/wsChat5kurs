import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Message from "./Message";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Upload from 'material-ui-upload/Upload';

const styles = {
  textField: {
    width: 200,
  },
  messageField: {
    width: 'fill-available'
  },
  container: {
    width: 700,
    margin: 'auto',
    'border-radius': 0,
    'height': '665px',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: 700,
    border: '1px solid #AAAAAA',
    display: 'flex',

  },
  map: {
    '&$last-child': {
      'background-color': 'red',
    },
  },
  paper: {
    borderRadius: 0
  }
};

class Chat extends React.Component {

  propTypes = {
    params: PropTypes
  };

  constructor(props) {
    super();
    this.state = {
      name: 'anonymous',
      open: true,
      ws: null,
      messageList: [],
      message: ''
    };
  }

  componentWillMount() {
    //const socket = new WebSocket(`ws://localhost:${ this.props.match.params.port }`);
    const socket = new WebSocket(`wss://${ window.location.host }/websocket/${ this.props.match.params.port }`);
    this.setState({ ws: socket }) 
  }

  componentWillUnmount() {/*
    alert('test');
    console.log('test');*/
    //this.state.ws.send(JSON.stringify({type: 'disconnect', name: this.state.name}));
    this.state.ws.close();
  }

  addMessage = (message) => {
    this.setState({ messageList: [...this.state.messageList, message] });
  };

  handleSubmit() {
    this.state.ws.addEventListener('message', (event) => {
      this.addMessage(JSON.parse(event.data));
    });
    this.state.ws.send(JSON.stringify({type: 'greetings', name: this.state.name}));
    this.setState({ open: false });
  }

  handleMessage = () => {
    this.state.ws.send(JSON.stringify({type: 'message', name: this.state.name, message: this.state.message }));
    this.setState({ message: ''});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value });
  };

  handleMessageChange = (event) => {
    this.setState({message: event.target.value });
  };

  onFileLoad = (e, file) => console.log(e.target.result, file.name);

  render() {
    const { classes } = this.props;
    return (
      <Paper className={ classes.container }>
        <div className={ classes.map }>
        {this.state.messageList.map((message, index) => <Message key={index} event={ message }/> )}
        </div>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleSubmit()} color="primary" disabled={ this.state.name === '' }>
              Ок
            </Button>
          </DialogActions>
        </Dialog>
        <div className={ classes.bottom }>
          <TextField
            id="input"
            className={classes.messageField}
            value={this.state.message}
            onChange={this.handleMessageChange}
            margin="normal"
          />
          {/*<Upload label="Add" onFileLoad={this.onFileLoad}/>*/}
          <Button onClick={() => this.handleMessage()} color="primary" disabled={ this.state.message === '' }>
            Отправить
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Chat);
