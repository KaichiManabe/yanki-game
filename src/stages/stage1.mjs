import { GameSceneBase } from "./gameSceneBase.mjs";

const enemyInfo = [
  { x: 300, y: 150, velocity: { x: 150, y: 150 }, rotate: true, circle: false },
  { x: 400, y: 100, velocity: { x: 150, y: 150 }, rotate: false, circle: true },
  {
    x: 500,
    y: 250,
    velocity: { x: 150, y: 150 },
    rotate: false,
    circle: false,
  },
];

const obstacleInfo = [
  { x: 300, y: 500, w: 50, h: 300 },
  { x: 200, y: 150, w: 50, h: 500 },
];

export class GameScene1 extends GameSceneBase {
  constructor() {
    super(1, enemyInfo, obstacleInfo);
  }
}
