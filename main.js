import { QuizScene } from "./QuizScene.js";
import { quizData } from "./quizData.js";
import { MainMenuScene } from "./MainMenuScene.js";

const mainScene = {
  preload,
  create,
  update,
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scene: [mainScene, MainMenuScene, QuizScene],
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  this.scene.start("MainMenuScene");
}

function update() {}
