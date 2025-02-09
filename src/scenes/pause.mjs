export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  init(data) {
    this.stage = data.stage || 1; // デフォルトでステージ1
  }

  create() {
    this.add.text(250, 150, "一時停止", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    const backButton = this.add
      .text(250, 250, "ステージ選択へ戻る", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(10)
      .on("pointerover", () => backButton.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => backButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        this.scene.stop(`GameScene${this.stage}`); // 一時停止しているゲームを停止
        this.scene.start("StageSelectScene"); // ステージ選択画面へ戻る
      });

    const retryButton = this.add
      .text(250, 320, "やり直す", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(10)
      .on("pointerover", () => retryButton.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => retryButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        this.scene.stop(); // PauseScene を閉じる
        this.scene.get(`GameScene${this.stage}`).scene.restart(); // 該当の GameScene を再スタート
      });

    // キャンセルボタン
    const cancelButton = this.add
      .text(250, 420, "キャンセル", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(10)
      .on("pointerover", () => cancelButton.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => cancelButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        this.scene.stop(); // 一時停止シーンを終了
        this.scene.resume(`GameScene${this.stage}`); // 該当の GameScene を再開
      });
  }
}
