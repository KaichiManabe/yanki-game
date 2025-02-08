export class StageSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "StageSelectScene" });
  }

  create() {
    this.add.text(200, 50, "ステージ選択", {
      fontSize: "32px",
      fill: "#fff",
    });

    for (let i = 1; i <= 5; i++) {
      let button = this.add
        .text(200, 100 + i * 50, `Stage ${i}`, {
          fontSize: "24px",
          fill: "#0f0",
        })
        .setInteractive()
        .on("pointerdown", () => this.scene.start(`GameScene${i}`))
        .on("pointerover", () => button.setStyle({ fill: "#ff0" }))
        .on("pointerout", () => button.setStyle({ fill: "#0f0" }));
    }
  }
}
