import { GameScene1 } from "./stage1.mjs";
import { StageSelectScene } from "./stageSelect.mjs";
import { PauseScene } from "./pause.mjs";
import { ResultScene } from "./result.mjs";
import { ProfileSetup } from "./profileSetup.mjs";
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
  scene: [ProfileSetup, StageSelectScene, GameScene1, PauseScene, ResultScene],
};

var game = new Phaser.Game(config);
