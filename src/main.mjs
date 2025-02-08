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

  //// 障害物
  const blocks = this.physics.add.staticGroup();
  const blockInfo = [
    { x: 300, y: 500, w: 50, h: 300 },
    { x: 200, y: 150, w: 50, h: 500 },
  ];
  blockInfo.forEach((blo) => {
    const block = this.add.rectangle(blo.x, blo.y, blo.w, blo.h, 0xaa0000);
    blocks.add(block);
  });

  //// プレイヤー
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

  //// 敵キャラ
  const enemys = this.physics.add.group();

  const enemyPositions = [
    { x: 250, y: 50 },
    { x: 300, y: 150 },
    { x: 400, y: 100 },
    { x: 500, y: 250 },
    { x: 600, y: 50 },
  ];

  enemyPositions.forEach((pos) => {
    const enemy = this.add.rectangle(pos.x, pos.y, 30, 30, 0xff0000);
    this.physics.add.existing(enemy);
    enemy.body.setSize(30, 30);
    enemy.body.setImmovable(true);
    enemy.body.allowGravity = false;

    enemys.add(enemy);

    // Tweenで上下に動かす
    this.tweens.add({
      targets: enemy,
      y: pos.y + 500, // 500px 上下移動
      duration: 2000, // 2秒かけて移動
      yoyo: true, // 戻る
      repeat: -1, // 無限ループ
      ease: "Sine.easeInOut",
    });
  });

  this.physics.add.overlap(player, enemys, () => {
    player.setPosition(100, 450);
    alert("ゲームオーバー");
  });

  //// ゴール
  const goal = this.add.rectangle(750, 50, 100, 50, 0x00ff00);
  this.physics.add.existing(goal);
  goal.body.setSize(100, 50);
  goal.body.setImmovable(true);
  goal.body.allowGravity = false;

  this.physics.add.overlap(player, goal, () => {
    alert("ゴール！");
    player.setPosition(100, 450);
  });

  ////衝突
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, blocks);
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
