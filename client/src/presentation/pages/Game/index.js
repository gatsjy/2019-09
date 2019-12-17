import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientManager from '../../../service/ClientManager';
import { GlobalContext, DispatchContext } from '../../../contexts';
import actions from '../../../actions';
import { useToast } from '../../../hooks';
import {
  MOBILE_VIEW_BREAKPOINT,
  WAITING_STATUS,
  MOBILE_VIEW,
  DESKTOP_VIEW,
  ALLOW_CAMERA_MESSAGE,
} from '../../../config';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';
import { TOAST_TPYES } from '../../../constants/toast';

let clientManager;

const Game = ({ location, match }) => {
  const {
    gameStatus,
    viewPlayerList,
    currentSeconds,
    quiz,
    quizLength,
    toast,
  } = useContext(GlobalContext);
  const dispatch = useContext(DispatchContext);
  const { openToast, closeToast } = useToast({
    open: toast.open,
    dispatch,
    actions,
  });

  const history = useHistory();
  const shiftingToWhichView = useShiftingToWhichView(MOBILE_VIEW_BREAKPOINT);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const initialIsMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;
  const [
    mobileChattingPanelVisibility,
    setMobileChattingPanelVisibility,
  ] = useState(initialIsMobile);
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(
    !initialIsMobile,
  );
  const [gamePageRootHeight, setGamePageRootHeight] = useState(
    window.innerHeight,
  );

  const { isPrivateRoomCreation } = location;
  const roomIdFromUrl = match.params.roomId;

  const getMediaPermissionHandler = () => {
    clientManager.init();
  };

  const getMediaPermissionErrorHandler = () => {
    history.push('/');
    clientManager = null;
    openToast(TOAST_TPYES.INFORMATION, ALLOW_CAMERA_MESSAGE);
  };

  if (!clientManager) {
    clientManager = new ClientManager({
      history,
      roomIdFromUrl,
      isPrivateRoomCreation,
    });
    clientManager
      .getMediaPermission()
      .then(getMediaPermissionHandler)
      .catch(getMediaPermissionErrorHandler);
  }

  const exitButtonHandler = () => {
    clientManager.exitRoom();
    clientManager = null;
  };

  const showPlayersButtonHandler = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const readyButtonHandler = () => {
    clientManager.toggleReady();
  };

  useEffect(() => {
    window.onpopstate = () => {
      exitButtonHandler();
    };
  }, []);

  useEffect(() => {
    setMobileChattingPanelVisibility(currentIsMobile);
    setGamePageRootHeight(window.innerHeight);
  }, [currentIsMobile]);

  useEffect(() => {
    if (shiftingToWhichView === MOBILE_VIEW) {
      setIsPlayerListVisible(false);
      return;
    }
    if (shiftingToWhichView === DESKTOP_VIEW) {
      setIsPlayerListVisible(true);
    }
  }, [shiftingToWhichView]);

  const isGameStatusWaiting = gameStatus === WAITING_STATUS;

  const classes = useStyles({
    gamePageRootHeight,
    isPlayerListVisible,
    isGameStatusWaiting,
  });

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const gameProps = {
    quiz,
    quizLength,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility,
    toast,
    closeToast,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default Game;
