const API_BASE_URL = "http://localhost:3000";

// スコアを登録する
export async function createScore(playerName, stage, score) {
  const res = await fetch(`${API_BASE_URL}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerName, stage, score }),
  });
  return await res.json();
}

// スコアを取得する
export async function getScores() {
  const res = await fetch(`${API_BASE_URL}/scores`);
  return await res.json();
}

// 特定のプレイヤーのスコアを取得する
export async function getPlayerScores(playerName) {
  const res = await fetch(`${API_BASE_URL}/scores/${playerName}`);
  return await res.json();
}

// スコアを更新する
export async function updateScore(id, playerName, stage, score) {
  const res = await fetch(`${API_BASE_URL}/scores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerName, stage, score }),
  });
  return await res.json();
}

// スコアを削除する
export async function deleteScore(id) {
  const res = await fetch(`${API_BASE_URL}/scores/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function getStageRanking(stage) {
  try {
    const response = await fetch(`http://localhost:3000/rankings/${stage}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ランキングデータの取得に失敗:", error);
    return [];
  }
}
