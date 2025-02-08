import { GameScene1 } from "./stage1.mjs";
import { StageSelectScene } from "./stageSelect.mjs";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StageSelectScene, GameScene1],
};

var game = new Phaser.Game(config);
