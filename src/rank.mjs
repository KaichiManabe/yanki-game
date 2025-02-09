import { getStageRanking } from "./api/scoreApi.mjs";

export class RankScene extends Phaser.Scene {
  constructor() {
    super({ key: "RankScene" });
  }

  async create() {
    this.add.text(200, 50, "ランキング", {
      fontSize: "32px",
      fill: "#fff",
    });

    // スクロール用のコンテナ作成
    this.rankContainer = this.add.container(0, 0);

    let yOffset = 100; // 縦方向の開始位置

    for (let stage = 1; stage <= 5; stage++) {
      const stageText = this.add.text(100, yOffset, `ステージ${stage}`, {
        fontSize: "24px",
        fill: "#fff",
      });
      this.rankContainer.add(stageText);
      yOffset += 40;

      // 各ステージのランキングを取得
      const rankings = await getStageRanking(stage);

      rankings.forEach((entry, index) => {
        const rankText = this.add.text(
          100,
          yOffset + index * 40,
          `${entry.playerName}: ${entry.score}`,
          { fontSize: "20px", fill: "#fff" }
        );
        this.rankContainer.add(rankText);
      });

      yOffset += rankings.length * 40 + 40; // 次のステージとの間隔を確保
    }

    // カメラの設定（スクロール範囲を制限）
    this.cameras.main.setBounds(
      0,
      0,
      this.scale.width,
      Math.max(this.scale.height, yOffset)
    );
    this.cameras.main.setScroll(0, 0);

    // スクロール操作を追加
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      this.cameras.main.scrollY += deltaY * 0.5; // スクロール速度を調整
    });
  }
}
