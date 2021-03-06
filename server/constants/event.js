const EVENT = {
  SEND_ROOMID: 'sendRoomId',
  SEND_CURRENT_SECONDS: 'sendCurrentSeconds',
  ASSIGN_STREAMER: 'assignStreamer',
  ASSIGN_VIEWER: 'assignViewer',
  END_SET: 'endSet',
  CLEAR_WINDOW: 'clearWindow',
  START_SET: 'startSet',
  PREPARE_SET: 'prepareSet',
  SEND_READY: 'sendReady',
  START_GAME: 'startGame',
  END_GAME: 'endGame',
  RESET_GAME: 'resetGame',
  SEND_SOCKET_ID: 'sendSocketId',
  ASK_SOCKET_ID: 'askSocketId',
  MATCH: 'match',
  CONNECT_PEER: 'connectPeer',
  SELECT_QUIZ: 'selectQuiz',
  SEND_CHATTING_MESSAGE: 'sendChattingMessage',
  DISCONNECTING: 'disconnecting',
  START_CHATTING: 'startChatting',
  SEND_PLAYERS: 'sendPlayers',
  SEND_NEW_PLAYER: 'sendNewPlayer',
  SEND_LEFT_PLAYER: 'sendLeftPlayer',
  CORRECT_ANSWER: 'correctAnswer',
  UPDATE_PROFILE: 'updateProfile',
  SEND_DESCRIPTION: 'sendDescription',
  SEND_ICE_CANDIDATE: 'sendIceCandidate',
  CONNECTION: 'connection',
  ROOM_UNAVAILABLE: 'roomUnavailable',
};

module.exports = EVENT;
