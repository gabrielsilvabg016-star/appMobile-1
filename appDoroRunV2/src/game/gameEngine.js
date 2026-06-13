//codigo prototipo feito pelo gpt, depois fazer o codigo correto

export default class GameEngine {
  constructor() {
    this.player = { x: 50, y: 300, velocityY: 0 };
    this.obstacles = [];
    this.score = 0;
  }

  update() {
    this.applyGravity();
    this.moveObstacles();
    this.score++;
  }

  jump() {
    this.player.velocityY = -15;
  }

  applyGravity() {
    this.player.velocityY += 0.8;
    this.player.y += this.player.velocityY;
  }

  getState() {
    return {
      player: this.player,
      obstacles: this.obstacles,
      score: this.score,
    };
  }
}