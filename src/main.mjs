import { GameScene1 } from "./stages/stage1.mjs";
import { StageSelectScene } from "./scenes/stageSelect.mjs";
import { PauseScene } from "./scenes/pause.mjs";
import { ResultScene } from "./scenes/result.mjs";
import { ProfileSetup } from "./scenes/profileSetup.mjs";
import { GameOver } from "./scenes/gameOver.mjs";
import { RankScene } from "./scenes/rank.mjs";
import { GameScene2 } from "./stages/stage2.mjs";
import { GameScene3 } from "./stages/stage3.mjs";
import { GameScene4 } from "./stages/stage4.mjs";
import { GameScene5 } from "./stages/stage5.mjs";
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
    GameScene2,
    GameScene3,
    GameScene4,
    GameScene5,
    PauseScene,
    GameOver,
    ResultScene,
    RankScene,
  ],
};

var game = new Phaser.Game(config);
