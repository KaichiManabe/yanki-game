import { createScore } from "../api/scoreApi.mjs";

export class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: "ResultScene" });
  }

  init(data) {
    // ステージ情報を受け取る
    this.stage = data.stage || 1;
    this.newScore = data.newScore || 0;
  }

  create() {
    this.add.text(250, 130, `ステージ${this.stage} クリア！`, {
      fontSize: "40px",
      fill: "#ffffff",
    });

    // ローカルストレージのスコアキーを動的に設定
    let newScoreKey = `Stage${this.stage}NewScore`;
    let topScoreKey = `Stage${this.stage}TopScore`;

    let newScore = parseInt(localStorage.getItem(newScoreKey)) || this.newScore;
    let topScore = parseInt(localStorage.getItem(topScoreKey)) || 0;

    if (topScore < newScore) {
      topScore = newScore;
      localStorage.setItem(topScoreKey, topScore);
      const playerName = localStorage.getItem("playerName");

      // スコアをデータベースに保存
      createScore(playerName, this.stage, topScore);

      this.add.text(250, 200, `新記録！`, {
        fontSize: "16px",
        fill: "red",
      });
    }

    this.add.text(250, 230, `今回のスコア: ${newScore}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    this.add.text(250, 300, `最高スコア: ${topScore}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    const backButton = this.add
      .text(250, 350, "ステージ選択へ戻る", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(10)
      .on("pointerover", () => backButton.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => backButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        this.scene.stop(`GameScene${this.stage}`);
        this.scene.start("StageSelectScene");
      });

    const retryButton = this.add
      .text(250, 420, "やり直す", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(10)
      .on("pointerover", () => retryButton.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => retryButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        this.scene.stop(); // 結果画面を停止
        this.scene.get(`GameScene${this.stage}`).scene.restart();
      });
  }
}
