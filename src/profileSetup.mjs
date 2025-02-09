export class ProfileSetup extends Phaser.Scene {
  constructor() {
    super({ key: "ProfileSetup" });
  }

  create() {
    this.add.text(200, 50, "名前を設定してください。", {
      fontSize: "32px",
      fill: "#fff",
    });

    // HTMLの入力フィールドを作成
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "名前を入力";
    nameInput.style.position = "absolute";
    nameInput.style.left = "25%";
    nameInput.style.top = "20%";
    nameInput.style.transform = "translate(-50%, -50%)";
    nameInput.style.fontSize = "24px";
    nameInput.style.padding = "5px";
    document.body.appendChild(nameInput);

    // フォーカスを当てる
    nameInput.focus();

    // 決定ボタン
    let submitButton = document.createElement("button");
    submitButton.innerText = "決定";
    submitButton.style.position = "absolute";
    submitButton.style.left = "40%";
    submitButton.style.top = "20%";
    submitButton.style.transform = "translate(-50%, -50%)";
    submitButton.style.fontSize = "24px";
    submitButton.style.padding = "5px 10px";
    document.body.appendChild(submitButton);

    // 名前を保存する処理
    const saveName = () => {
      let playerName = nameInput.value.trim();
      if (playerName) {
        localStorage.setItem("playerName", playerName);
        alert(`名前を「${playerName}」に設定しました！`);
        nameInput.remove();
        submitButton.remove();
        this.scene.start("StageSelectScene");
      } else {
        alert("名前を入力してください！");
      }
    };

    // 決定ボタンのクリックイベント
    submitButton.addEventListener("click", saveName);

    // Enterキーで決定
    nameInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        saveName();
      }
    });
    let storedName = localStorage.getItem("playerName");
    if (storedName) {
      nameInput.remove();
      submitButton.remove();
      this.scene.start("StageSelectScene");
    }
  }
}
