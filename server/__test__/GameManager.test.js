const GameManager = require('../service/game/models/GameManager');
const Player = require('../service/game/models/Player');
const { VIEWER, STREAMER } = require('../constants/player');
const GAME_STATUS = require('../constants/gameStatus');

const roomId = 1;
const gameManager = new GameManager(roomId);
let streamer;

test('GameManager는 매개변수로 받은 roomId를 저장합니다.', () => {
  expect(gameManager.roomId).toBe(roomId);
});

const player = new Player({
  socketId: 1,
  nickname: 'player1',
  nicknameColor: 'color',
});

const players = [];

const insertPlayers = list => {
  for (let i = 2; i < 5; i++) {
    list.push(
      new Player({
        socketId: i,
        nickname: `player${i}`,
        nicknameColor: 'color',
      }),
    );
  }
};

insertPlayers(players);

test('GameManager에 플레이어를 넣습니다.', () => {
  gameManager.addPlayer(player);
  expect(gameManager.players[0]).toBe(player);
  expect(gameManager.players[0]).toEqual(player);
});

test('GameManager에 여러 플레이어를 넣습니다.', () => {
  players.forEach(eachPlayer => gameManager.addPlayer(eachPlayer));
  players.forEach((eachPlayer, i) => {
    expect(gameManager.players[i + 1]).toStrictEqual(eachPlayer);
  });
});

test('GameManager에서 현재 플레이어를 기반으로 최대 라운드 개수만큼 다음 스트리머 후보 리스트를 생성합니다.', () => {
  gameManager.setStreamerCandidates();

  gameManager.streamerCandidates.forEach(streamerCandidate => {
    expect(streamerCandidate).toStrictEqual(gameManager.players);
  });
});

test('GameManager에서 getNextStreamer 함수 실행', () => {
  streamer = gameManager.getNextStreamer();
  expect(streamer).toStrictEqual(player);
  expect(gameManager.streamerCandidates[0]).toStrictEqual(
    gameManager.players.splice(1, gameManager.players.length),
  );
  gameManager.streamerCandidates[0].unshift(streamer);
});

test('GameManager에서 selectStreamer 실행 및 플레이어의 타입 업데이트', () => {
  gameManager.selectStreamer();
  expect(gameManager.streamer).toStrictEqual(streamer);
  expect(streamer.type).toEqual(STREAMER);

  gameManager.players.forEach(eachPlayer => {
    if (eachPlayer.socketId !== streamer.socketId) {
      expect(eachPlayer.type).toEqual(VIEWER);
    }
  });
});

gameManager.setStatus(GAME_STATUS.PLAYING);

test('GameManager에서 leaveRoom 스트리머 테스트', () => {
  gameManager.leaveRoom(streamer.socketId);
  expect(gameManager.streamer).toBeNull();
  expect(gameManager.players).not.toContain(streamer);

  gameManager.streamer = streamer;
  gameManager.players.unshift(streamer);
});

test('gameManager에서 leaveRoom viewer 테스트', () => {
  const target = players[0];

  gameManager.leaveRoom(target.socketId);
  expect(gameManager.players).not.toContain(target);
  expect(gameManager.streamerCandidates[0]).not.toContain(target);

  gameManager.players.unshift(target);
  gameManager.streamerCandidates[0].unshift(target);
});

test('isStreamer 테스트', () => {
  const viewer = players[0];
  const streamerTrue = gameManager.isStreamer(streamer.socketId);
  const streamerFalse = gameManager.isStreamer(viewer.socketId);

  expect(streamerTrue).toBe(true);
  expect(streamerFalse).toBe(false);
});

test('getOtherPlayers 함수 테스트', () => {
  const managerPlayers = gameManager.getPlayers();

  managerPlayers.forEach(targetPlayer => {
    const targetPlayerSocketId = targetPlayer.socketId;

    const otherPlayersByCustom = managerPlayers.filter(
      managerPlayer => managerPlayer.socketId !== targetPlayerSocketId,
    );

    const otherPlayers = gameManager.getOtherPlayers(targetPlayerSocketId);

    expect(otherPlayers).toStrictEqual(otherPlayersByCustom);
  });
});
