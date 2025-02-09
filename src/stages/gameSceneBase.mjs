export class GameSceneBase extends Phaser.Scene {
  constructor(stageNumber, enemyInfo, obstacleInfo, starInfo) {
    super({ key: `GameScene${stageNumber}` });
    this.stage = stageNumber;
    this.enemyInfo = enemyInfo;
    this.obstacleInfo = obstacleInfo;
    this.starInfo = starInfo;
    this.score = 0;
    this.timeLeft = 120;
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("wall", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("setting", "assets/setting.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    if (this.playerHitbox) {
      this.playerHitbox.destroy();
    }
    // 背景
    this.add.image(400, 300, "sky");

    // プラットフォーム
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 32, "wall").setScale(2).refreshBody();
    this.platforms.create(400, 568, "wall").setScale(2).refreshBody();

    // 設定ボタン
    this.add
      .image(750, 40, "setting")
      .setScale(0.4)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.pause();
        this.scene.launch("PauseScene");
      });

    // スコアとタイマー
    this.scoreText = this.add.text(30, 30, `スコア: ${this.score}`, {
      fontSize: "20px",
      fill: "#fff",
    });
    this.timerText = this.add.text(30, 60, `時間: ${this.timeLeft}`, {
      fontSize: "20px",
      fill: "#fff",
    });

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(),
      loop: true,
    });

    // プレイヤー
    this.player = this.physics.add
      .sprite(100, 450, "dude")
      .setCollideWorldBounds(true);
    this.createPlayerAnimations();

    // **プレイヤーの当たり判定を可視化**
    this.playerHitbox = this.add.graphics();
    this.playerHitbox.fillStyle(0x00ff00, 0.3); // 緑色の透明な矩形

    // 障害物の作成（各ステージごとに異なる）
    this.createObstacles();

    // 敵の作成（各ステージごとに異なる）
    this.createEnemies();

    // ゴール
    this.createGoal();

    // スター
    this.createStar();

    // 衝突設定
    this.physics.add.collider(this.player, this.platforms);
  }

  updateTimer() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      this.timerText.setText(`時間: ${this.timeLeft}`);
    } else {
      this.resetGame();
      this.scene.launch("GameOverScene");
    }
  }

  resetGame() {
    this.player.setPosition(100, 450);
    this.player.setScale(1);
    this.score = 0;
    this.scoreText.setText(`スコア: ${this.score}`);
    this.timeLeft = 120;
    this.timerText.setText(`時間: ${this.timeLeft}`);

    if (this.playerHitbox) {
      this.playerHitbox.destroy();
      this.playerHitbox = null;
    }

    if (this.stars) {
      this.stars.children.iterate((star) => {
        star.enableBody(true, star.x, star.y, true, true);
      });
    }
  }

  createPlayerAnimations() {
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
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
  }

  createObstacles() {
    this.obstacles = this.physics.add.staticGroup();

    this.obstacleInfo.forEach((obs) => {
      const block = this.add.rectangle(obs.x, obs.y, obs.w, obs.h, 0xaa0000);
      this.physics.add.existing(block, true);
      this.obstacles.add(block);
    });

    this.physics.add.collider(this.player, this.obstacles);
  }

  createEnemies() {
    this.enemies = this.physics.add.group({ collideWorldBounds: true });

    this.enemyInfo.forEach((ene) => {
      const enemy = this.physics.add.sprite(ene.x, ene.y, "dude");
      this.enemies.add(enemy);
      enemy.setVelocityY(ene.velocity.y);
      enemy.setBounce(1, 1);
      enemy.setCollideWorldBounds(true);
      enemy.body.allowGravity = false;
      enemy.rotate = ene.rotate;

      //敵が壁に衝突
      this.physics.add.collider(this.enemies, this.obstacles, (enemy) => {
        if (enemy.rotate) {
          // ランダムに 90度回転

          // 方向を変更
          const currentVelocityX = enemy.body.velocity.x;
          const currentVelocityY = enemy.body.velocity.y;

          // ランダムに X/Y を切り替え
          enemy.setVelocityX(currentVelocityY);
          enemy.setVelocityY(-currentVelocityX);
        }
      });
      this.physics.add.collider(this.enemies, this.platforms, (enemy) => {
        if (enemy.rotate) {
          // 方向を変更
          const currentVelocityX = enemy.body.velocity.x;
          const currentVelocityY = enemy.body.velocity.y;

          // ランダムに X/Y を切り替え
          enemy.setVelocityX(currentVelocityY);
          enemy.setVelocityY(-currentVelocityX);
        }
      });

      //ぐるぐる回る敵
      if (ene.circle) {
        enemy.setVelocityX(ene.velocity.x);
        enemy.distanceTraveled = 0;

        this.physics.world.on("worldstep", () => {
          const velocityX = enemy.body.velocity.x;
          const velocityY = enemy.body.velocity.y;
          const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);
          enemy.distanceTraveled += (speed * this.game.loop.delta) / 1000;

          if (enemy.distanceTraveled >= 150) {
            enemy.distanceTraveled = 0;
            enemy.setVelocityX(-velocityY);
            enemy.setVelocityY(velocityX);
          }
        });
      }

      //敵の当たり判定
      const hitboxWidth = enemy.width * ene.hitSize.width;
      const hitboxHeight = enemy.height * ene.hitSize.height;
      enemy.setSize(hitboxWidth, hitboxHeight);
      enemy.setOffset(
        (enemy.width - hitboxWidth) / 2,
        (enemy.height - hitboxHeight) / 2
      );

      const hitboxGraphics = this.add.graphics();
      hitboxGraphics.fillStyle(0xff0000, 0.3);
      hitboxGraphics.fillRect(
        enemy.x - hitboxWidth / 2,
        enemy.y - hitboxHeight / 2,
        hitboxWidth,
        hitboxHeight
      );

      this.physics.world.on("worldstep", () => {
        hitboxGraphics.clear();
        hitboxGraphics.fillStyle(0xff0000, 0.3);
        hitboxGraphics.fillRect(
          enemy.x - hitboxWidth / 2,
          enemy.y - hitboxHeight / 2,
          hitboxWidth,
          hitboxHeight
        );
      });
    });

    this.physics.add.overlap(this.player, this.enemies, () => {
      this.scene.pause();
      this.scene.launch("GameOver");
      this.resetGame();
    });
  }

  createGoal() {
    const goal = this.add.rectangle(750, 70, 100, 10, 0x00ff00);
    this.physics.add.existing(goal);
    goal.body.setImmovable(true);
    goal.body.allowGravity = false;

    this.physics.add.overlap(this.player, goal, () => {
      this.score += 1000 + this.timeLeft * 10;
      localStorage.setItem(`Stage${this.stage}NewScore`, this.score);
      this.scene.pause();
      this.scene.launch("ResultScene", {
        stage: this.stage,
        newScore: this.score,
      });
      this.resetGame();
    });
  }

  createStar() {
    this.stars = this.physics.add.group();
    this.starInfo.forEach((starData) => {
      const star = this.physics.add
        .sprite(starData.x, starData.y, "star")
        .setDepth(10);
      this.stars.add(star);
    });

    this.physics.add.overlap(this.player, this.stars, (player, star) => {
      star.disableBody(true, true);
      this.score += 1000;
      this.player.setScale(1.4);
      this.scoreText.setText(`スコア: ${this.score}`);
    });
  }
  updatePlayerHitbox() {
    if (!this.playerHitbox) return;
    this.playerHitbox.clear(); // 以前の描画をクリア
    this.playerHitbox.fillStyle(0x00ff00, 0.3); // 緑色
    this.playerHitbox.fillRect(
      this.player.body.position.x, // X位置
      this.player.body.position.y, // Y位置
      this.player.body.width, // 幅
      this.player.body.height // 高さ
    );
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityY(0);
    }
    this.updatePlayerHitbox();
  }
}
