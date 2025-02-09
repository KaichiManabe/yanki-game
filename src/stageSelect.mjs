export class StageSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "StageSelectScene" });
  }

  create() {
    let storedName = localStorage.getItem("playerName");
    this.add.text(200, 50, "ステージ選択", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.add.text(500, 50, `${storedName} さん`, {
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
    this.add.text(400, 100, "トップスコア", {
      fontSize: "24px",
      fill: "#fff",
    });
    for (let i = 1; i <= 5; i++) {
      let topScore = localStorage.getItem(`Stage${i}TopScore`) || 0; 

      this.add.text(400, 100 + i * 50, ` ${topScore}`, {
        fontSize: "24px",
        fill: "#fff",
      });
    }
  }
}
