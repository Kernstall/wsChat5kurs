import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '800px',
    height: '700',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class RoomList extends React.Component {

  constructor(props) {
    super();
    this.state = {
      open: false,
      data: []
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  componentWillMount(){
    /*const a = (obj) => {
      fetch('/', {method: 'GET', mode: 'cors'})//https://127.0.0.1:8081
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          obj.setState({data});
        })
    };*/
    fetch("/app", { method: 'GET' }).then(function (response) {
      console.log(response);
    });
    /*fetch("/app", { method: 'GET' }).then(function (response) {
      console.log(response);
    });*/
    //a(this);
  }

  render() {
    const { classes } = this.props;
    const {data} = this.state;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={1} cellHeight={200}>
          { data && data.map(tile => (
            <GridListTile key={tile.name}>
              <img src={tile.imgSrc} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton onClick = { () => window.location.replace(`/chat/${ tile.wsConnect }`) }>
                    <MessageIcon className={classes.icon} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        {/*<img src={ 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg' } />
        <img src={ 'https://www.w3schools.com/w3images/fjords.jpg' } />
        <img src={ 'https://www.w3schools.com/w3images/fjords.jpg' } />*/}
      </div>
    );
  }
}

export default withStyles(styles)(RoomList);
