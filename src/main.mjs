import { GameScene1 } from "./stage1.mjs";
import { StageSelectScene } from "./stageSelect.mjs";
import { PauseScene } from "./pause.mjs";
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
  scene: [StageSelectScene, GameScene1, PauseScene],
};

var game = new Phaser.Game(config);
