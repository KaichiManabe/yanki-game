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

    for (let stage = 1; stage <= 5; stage++) {
      this.add.text(100, 50 + stage * 200, `ステージ${stage}`, {
        fontSize: "24px",
        fill: "#fff",
      });

      // 各ステージのランキングを取得
      const rankings = await getStageRanking(stage);

      rankings.forEach((entry, index) => {
        this.add.text(
          100 + stage * 200,
          100 + index * 40,
          `${entry.playerName}: ${entry.score}`,
          {
            fontSize: "20px",
            fill: "#fff",
          }
        );
      });
    }
  }
}
