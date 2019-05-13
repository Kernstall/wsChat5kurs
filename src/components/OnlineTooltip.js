import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  avatar: {
    borderRadius: '50%',
    width: '48px',
    height: '48px'
  }
});

function SimpleTooltips(props) {
  const { classes, name } = props;
  return (
      <div>
        <Tooltip title={ name ? name : ' ' }>
            { !props.imgSrc ?
                <IconButton aria-label={ name }><Icon className={classNames(classes.icon, 'fas fa-user-alt')} /> </IconButton> : <img className={ classes.avatar } src={ `/gallery/${ props.imgSrc }` } alt={ '404'}/> }
        </Tooltip>
      </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);