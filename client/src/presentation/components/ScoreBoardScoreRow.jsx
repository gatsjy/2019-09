import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styleColors from '../../constants/styleColors';

const useStyle = makeStyles({
  scoreBoard: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: styleColors.BASE_BLACK_COLOR_TRANSLUCENT,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '4rem',
    textAlign: 'center',
    color: styleColors.PURE_WHITE_COLOR,
  },
  scoreRow: {
    display: 'flex',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  nickname: {
    width: 'auto',
    color: styleColors.PURE_WHITE_COLOR,
    textAlign: 'center',
    flex: '1',
    marginRight: '1rem',
    whiteSpace: 'nowrap',
  },
  score: {
    width: 'auto',
    color: styleColors.THEME_COLOR,
    textAlign: 'center',
    flex: '1',
    whiteSpace: 'nowrap',
  },
});

const ScoreBoardScoreRow = ({ nickname, score }) => {
  const classes = useStyle();
  return (
    <Box className={classes.scoreRow}>
      <Box className={classes.nickname}>{nickname}</Box>
      <Box className={classes.score}>{score}</Box>
    </Box>
  );
};

ScoreBoardScoreRow.propTypes = {
  nickname: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default ScoreBoardScoreRow;
