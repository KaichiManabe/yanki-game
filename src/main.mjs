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
    this.physics.add.existing(block, true);
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
  const enemies = this.physics.add.group({
    defaultKey: "dude",
    collideWorldBounds: true,
  });

  const enemyInfo = [
    { name: 2, x: 300, y: 150, w: 40, h: 30, rotate: true },
    { name: 3, x: 400, y: 100, w: 30, h: 30, rotate: true },
    { name: 4, x: 500, y: 250, w: 30, h: 30 },
  ];

  enemyInfo.forEach((ene) => {
    const enemy = this.physics.add.sprite(ene.x, ene.y, "dude");
    enemies.add(enemy);
    enemy.setVelocityY(150);
    enemy.setBounce(1, 1);
    enemy.setCollideWorldBounds(true);
    enemy.rotate = ene.rotate;
    enemy.body.allowGravity = false;
  });

  //ぐるぐる回転する敵
  // 敵キャラのスプライト
  const circleEnemy = this.physics.add.sprite(400, 100, "dude");

  // 当たり判定を 1.5 倍に設定
  const hitboxWidth = circleEnemy.width * 1;
  const hitboxHeight = circleEnemy.height * 4;
  circleEnemy.setSize(hitboxWidth, hitboxHeight);

  // 物理ボディのオフセットを中央に調整
  circleEnemy.setOffset(
    (circleEnemy.width - hitboxWidth) / 2,
    (circleEnemy.height - hitboxHeight) / 2
  );

  // 当たり判定の範囲を描画するための Graphics
  const hitboxGraphics = this.add.graphics();
  hitboxGraphics.fillStyle(0xff0000, 0.3); // 赤色 (0xff0000)、透明度 0.3
  hitboxGraphics.fillRect(
    circleEnemy.x - hitboxWidth / 2,
    circleEnemy.y - hitboxHeight / 2,
    hitboxWidth,
    hitboxHeight
  );

  // 更新処理 (スプライトの位置に合わせて描画を移動)
  this.physics.world.on("worldstep", () => {
    hitboxGraphics.clear(); // クリア
    hitboxGraphics.fillStyle(0xff0000, 0.3); // 赤色 (透明度 0.3)
    hitboxGraphics.fillRect(
      circleEnemy.x - hitboxWidth / 2,
      circleEnemy.y - hitboxHeight / 2,
      hitboxWidth,
      hitboxHeight
    );
  });

  circleEnemy.setVelocityX(150); // 初期の移動方向をX軸に設定
  circleEnemy.angle = 0; // 初期角度
  circleEnemy.distanceTraveled = 0; // 移動距離を追跡

  // フレームごとに処理
  this.physics.world.on("worldstep", () => {
    // 移動距離を計算
    const velocityX = circleEnemy.body.velocity.x;
    const velocityY = circleEnemy.body.velocity.y;
    const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2); // 速度の大きさ
    circleEnemy.distanceTraveled += (speed * this.game.loop.delta) / 1000;

    // 150px 移動ごとに方向変更
    if (circleEnemy.distanceTraveled >= 150) {
      circleEnemy.distanceTraveled = 0; // リセット

      // 90度回転
      circleEnemy.angle += 90;

      // 新しい方向へ進む
      const newVelocityX = -velocityY; // X方向とY方向を入れ替え
      const newVelocityY = velocityX;
      circleEnemy.setVelocityX(newVelocityX);
      circleEnemy.setVelocityY(newVelocityY);
    }
  });

  this.physics.add.overlap(player, enemies, () => {
    player.setPosition(100, 450);
    alert("ゲームオーバー");
  });

  this.physics.add.overlap(player, circleEnemy, () => {
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

  this.physics.add.collider(enemies, blocks, (enemy) => {
    if (enemy.rotate) {
      // ランダムに 90度回転
      enemy.angle += 90;

      // 方向を変更
      const currentVelocityX = enemy.body.velocity.x;
      const currentVelocityY = enemy.body.velocity.y;

      // ランダムに X/Y を切り替え
      enemy.setVelocityX(currentVelocityY);
      enemy.setVelocityY(-currentVelocityX);
    }
  });
  this.physics.add.collider(enemies, platforms, (enemy) => {
    if (enemy.rotate) {
      // ランダムに 90度回転
      enemy.angle += 90;

      // 方向を変更
      const currentVelocityX = enemy.body.velocity.x;
      const currentVelocityY = enemy.body.velocity.y;

      // ランダムに X/Y を切り替え
      enemy.setVelocityX(currentVelocityY);
      enemy.setVelocityY(-currentVelocityX);
    }
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
