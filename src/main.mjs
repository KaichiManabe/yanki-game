const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("wall", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  // 背景画像
  this.add.image(400, 300, "sky");

  // 静的プラットフォームを作成
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 32, "wall").setScale(2).refreshBody();
  platforms.create(400, 568, "wall").setScale(2).refreshBody();

  // プレイヤーの作成
  player = this.physics.add.sprite(100, 450, "dude");
  player.setCollideWorldBounds(true);

  // プレイヤーのアニメーション
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "up",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "down",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  // 衝突判定
  this.physics.add.collider(player, platforms);

  const blocks = this.physics.add.group();

  // 配置するブロックの座標リスト
  const positions = [
    { x: 250, y: 50 },
    { x: 300, y: 150 },
    { x: 400, y: 100 },
    { x: 500, y: 250 },
    { x: 600, y: 50 },
  ];

  // 各座標に対してブロックを作成し、グループに追加
  positions.forEach((pos) => {
    // 長方形を作成
    const block = this.add.rectangle(pos.x, pos.y, 30, 30, 0xff0000);

    // 物理エンジンに追加
    this.physics.add.existing(block);

    // ブロックを物理グループに追加
    blocks.add(block);

    // Tweenで上下に動かす
    this.tweens.add({
      targets: block,
      y: pos.y + 500, // 500px 上下移動
      duration: 2000, // 2秒かけて移動
      yoyo: true, // 戻る
      repeat: -1, // 無限ループ
      ease: "Sine.easeInOut",
    });
  });

  // プレイヤーがブロックに触れたら初期位置に戻す
  this.physics.add.overlap(player, blocks, () => {
    player.setPosition(100, 450);
    alert("ゲームオーバー");
  });

  const goal = this.add.rectangle(800, 100, 50, 100, 0x00ff00);
  this.physics.add.existing(goal);
  this.physics.add.overlap(player, goal, () => {
    alert("ゴール！");
    player.setPosition(100, 450);
  });
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("down", true);
  } else {
    player.setVelocityY(0);
  }

  if (
    !cursors.left.isDown &&
    !cursors.right.isDown &&
    !cursors.up.isDown &&
    !cursors.down.isDown
  ) {
    player.anims.play("turn");
  }
}
