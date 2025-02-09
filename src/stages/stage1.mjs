import { GameSceneBase } from "./gameSceneBase.mjs";

const enemyInfo = [
  {
    name: 2,
    x: 300,
    y: 150,
    w: 40,
    h: 30,
    rotate: true,
    circle: false,
    hitSize: {
      height: 3,
      width: 1,
    },
    velocity: {
      x: 150,
      y: 150,
    },
  },
  {
    name: 3,
    x: 400,
    y: 100,
    w: 30,
    h: 30,
    rotate: false,
    circle: true,
    hitSize: {
      height: 1.5,
      width: 1,
    },
    velocity: {
      x: 150,
      y: 150,
    },
  },
  {
    name: 4,
    x: 500,
    y: 250,
    w: 30,
    h: 30,
    rotate: false,
    circle: false,
    hitSize: {
      height: 1.5,
      width: 4,
    },
    velocity: {
      x: 150,
      y: 150,
    },
  },
];

const obstacleInfo = [
  { x: 300, y: 500, w: 50, h: 300 },
  { x: 200, y: 150, w: 50, h: 500 },
];

const starInfo = [{ x: 100, y: 300 }];
export class GameScene1 extends GameSceneBase {
  constructor() {
    super(1, enemyInfo, obstacleInfo, starInfo);
  }
}
