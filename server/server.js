import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { cors } from "@elysiajs/cors";

const prisma = new PrismaClient();
const app = new Elysia();
// CORSを有効にする
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// スコアを登録する
app.get("/", () => "Hello Elysia");
app.post("/scores", async ({ body }) => {
  const { playerName, stage, score } = body;
  if (!playerName || stage == null || score == null) {
    return { error: "Invalid request data" };
  }

  const newScore = await prisma.score.create({
    data: { playerName, stage, score },
  });

  return newScore;
});

// スコアを取得する (全スコア)
app.get("/scores", async () => {
  return await prisma.score.findMany();
});

// 特定のプレイヤーのスコアを取得する
app.get("/scores/:playerName", async ({ params }) => {
  return await prisma.score.findMany({
    where: { playerName: params.playerName },
    orderBy: { score: "desc" },
  });
});

// スコアを更新する
app.put("/scores/:id", async ({ params, body }) => {
  const { id } = params;
  const { playerName, stage, score } = body;

  const updatedScore = await prisma.score.update({
    where: { id },
    data: { playerName, stage, score },
  });

  return updatedScore;
});

// スコアを削除する
app.delete("/scores/:id", async ({ params }) => {
  const { id } = params;

  await prisma.score.delete({
    where: { id },
  });

  return { message: "Score deleted successfully" };
});
// 各ステージの上位5人のスコアを取得
app.get("/rankings/:stage", async ({ params }) => {
  const { stage } = params;

  const topScores = await prisma.score.findMany({
    where: { stage: Number(stage) },
    orderBy: { score: "desc" },
    take: 5,
  });

  return topScores;
});

// サーバー起動
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
