export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  init(data) {
    this.stage = data.stage || 1; // デフォルトでステージ1
  }

  create() {
    this.add.text(250, 130, "ゲームオーバー", {
      fontSize: "40px",
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
        this.scene.stop(`GameScene${this.stage}`); // ゲームを停止
        this.scene.start("StageSelectScene"); // ステージ選択画面に戻る
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
        this.scene.stop(); // GameOverシーンを閉じる
        this.scene.get(`GameScene${this.stage}`).scene.restart(); // ゲーム再起動
      });
  }
}
