export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  create() {
    // メニューのテキスト
    const pauseText = this.add.text(250, 150, "ゲーム一時停止", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    // ステージ選択へ戻るボタン
    const backButton = this.add
      .text(250, 250, "ステージ選択へ戻る", {
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

    // キャンセルボタン
    const cancelButton = this.add
      .text(250, 320, "キャンセル", {
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
        this.scene.resume("GameScene1"); // ゲームを再開
      });
  }
}
