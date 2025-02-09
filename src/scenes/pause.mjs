export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  create() {
    const pauseText = this.add.text(250, 150, "一時停止", {
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
        this.scene.stop("GameScene1");
        this.scene.start("StageSelectScene");
      });
    const retryButton = this.add
      .text(250, 320, "やり直す", {
        fontSize: "24px",
        fill: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true }) // カーソルを指アイコンに変更
      .setDepth(10) // 画面最前面に配置
      .on("pointerover", () => retryButton.setStyle({ fill: "#ff0" })) // マウスオーバー
      .on("pointerout", () => retryButton.setStyle({ fill: "#ffffff" })) // マウスが離れた時
      .on("pointerdown", () => {
        this.scene.stop();
        this.scene.get("GameScene1").scene.restart();
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
      .on("pointerover", () => cancelButton.setStyle({ fill: "#ff0" })) // マウスオーバー
      .on("pointerout", () => cancelButton.setStyle({ fill: "#ffffff" })) // マウスが離れた時
      .on("pointerdown", () => {
        this.scene.stop(); // 一時停止シーンを終了
        this.scene.resume("GameScene1"); // ゲームを再開
      });
  }
}
