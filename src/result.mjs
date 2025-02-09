import { createScore } from "./api/scoreApi.mjs";
export class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: "ResultScene" });
  }

  create() {
    const pauseText = this.add.text(250, 130, "ステージクリア！", {
      fontSize: "40px",
      fill: "#ffffff",
    });
    let Stage1NewScore = parseInt(localStorage.getItem("Stage1NewScore"));
    let Stage1TopScore = parseInt(localStorage.getItem("Stage1TopScore"));

    if (Stage1TopScore < Stage1NewScore) {
      Stage1TopScore = Stage1NewScore;
      localStorage.setItem("Stage1TopScore", Stage1TopScore);
      const playerName = localStorage.getItem("playerName");
      createScore(playerName, 1, Stage1TopScore);
      this.add.text(250, 200, `新記録！`, {
        fontSize: "16px",
        fill: "red",
      });
    }
    this.add.text(250, 230, `今回のスコア: ${Stage1NewScore}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });
    this.add.text(250, 300, `最高スコア: ${Stage1TopScore}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    const backButton = this.add
      .text(250, 350, "ステージ選択へ戻る", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true }) // カーソルを指アイコンに変更
      .setDepth(10) // 画面最前面に配置
      .on("pointerover", () => backButton.setStyle({ fill: "#ff0" })) // マウスオーバー
      .on("pointerout", () => backButton.setStyle({ fill: "#ffffff" })) // マウスが離れた時
      .on("pointerdown", () => {
        this.scene.stop("GameScene1"); // ゲームを停止
        this.scene.start("StageSelectScene"); // ステージ選択画面に戻る
      });

    const cancelButton = this.add
      .text(250, 420, "やり直す", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true }) // カーソルを指アイコンに変更
      .setDepth(10) // 画面最前面に配置
      .on("pointerover", () => cancelButton.setStyle({ fill: "#ff0" })) // マウスオーバー
      .on("pointerout", () => cancelButton.setStyle({ fill: "#ffffff" })) // マウスが離れた時
      .on("pointerdown", () => {
        this.scene.stop(); // 一時停止シーンを終了
        this.scene.get("GameScene1").scene.restart();
      });
  }
}
