import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    'border-radius': 0,
  },
});

function Message(props) {
  const { classes, event } = props;

  return (
    <div>
      { event.type === 'message' ? <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" align="left">
          {event.name}
        </Typography>
        <Typography component="p" align="left">
          {event.message}
        </Typography>
      </Paper> : event.message}
    </div>
  );
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

export default withStyles(styles)(Message);