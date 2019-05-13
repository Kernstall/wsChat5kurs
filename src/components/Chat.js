import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Message from "./Message";
import TextField from '@material-ui/core/TextField';
import OnlineTooltip from './OnlineTooltip'

import style from './chat.module.css';

const styles = {
  textField: {
    width: 200,
  },
  messageField: {
    width: 'fill-available'
  },
  paper: {
    borderRadius: 0
  },
  imgInput: {
    display: 'none',
  },
  uploadButton: {
    minHeight: '64px',
  },
};


class Chat extends React.Component {

  propTypes = {
    params: PropTypes
  };

  constructor(props) {
    super();
    this.state = {
      name: props.name,
      open: true,
      ws: null,
      messageList: [],
      message: '',
      population: [],
    };
  }

  componentWillMount() {
    const socket = new WebSocket(`ws://${ window.location.host }/websocket/${ this.props.match.params.port }`);
    //const socket = new WebSocket(`ws://localhost:3001/websocket/${ this.props.match.params.port }`);

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if(data.type === 'pop') {
        console.log(data.message);
        this.setState({ population: data.message });
      } else {
        this.addMessage(JSON.parse(event.data));
      }
    });
    this.setState({ ws: socket }, () => setTimeout(this.handleSubmit, 500))

  }

  componentWillUnmount() {/*
    alert('test');
    console.log('test');*/
    //this.state.ws.send(JSON.stringify({type: 'disconnect', name: this.state.name}));
    //this.state.ws.close();
  }

  addMessage = (message) => {
    this.setState({ messageList: [...this.state.messageList, message] });
  };

  handleSubmit = () => {
    this.state.ws.send(JSON.stringify({type: 'greetings', name: this.state.name}));
    this.setState({ open: false });
  };

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
      <div className={ style.container }>
        <div className={ style.onlineWrap }>
          <span>Online:</span>
          {
            this.state.population.map(elem =>
                <OnlineTooltip id={elem.id} name={elem.name}/> )
          }

        </div>
        <div className={ classes.map }>
        {this.state.messageList.map((message, index) => <Message key={index} event={ message }/> )}
        </div>
        {/*<Dialog
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
        </Dialog>*/}
        <div className={ style.bottom }>
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
                    //console.log(<img src={FR.result} />);
                    this.state.ws.send(JSON.stringify({type: 'image', name: this.state.name, message: FR.result }));
                  }
                }
              }}
          />
          <label htmlFor="contained-button-file">
            <Button color="primary" component="span" className={classes.uploadButton}>
              Upload
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
