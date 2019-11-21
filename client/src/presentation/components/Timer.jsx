import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const Timer = ({ currentSeconds }) => {
  const useStyles = makeStyles(() => ({
    timer: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.timer}>
      <span>Timer </span>
      <span>{currentSeconds}</span>
    </div>
  );
};

Timer.propTypes = {
  currentSeconds: PropTypes.string.isRequired,
};

export default Timer;
