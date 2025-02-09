import { GameScene1 } from "./stage1.mjs";
import { StageSelectScene } from "./stageSelect.mjs";
import { PauseScene } from "./pause.mjs";
import { ResultScene } from "./result.mjs";
import { ProfileSetup } from "./profileSetup.mjs";
import { GameOver } from "./gameOver.mjs";
import { RankScene } from "./rank.mjs";
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
  scene: [
    ProfileSetup,
    StageSelectScene,
    GameScene1,
    PauseScene,
    GameOver,
    ResultScene,
    RankScene,
  ],
};

var game = new Phaser.Game(config);
