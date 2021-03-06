import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    width: '100%',
    height: '3.2rem',
  },
});

const ReadyButton = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} variant="contained" className={classes.button}>
      {children}
    </Button>
  );
};

ReadyButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ReadyButton;
