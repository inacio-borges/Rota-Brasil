export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    this.load.image("background", "assets/fundo.jpg");
    this.load.image("mapa", "assets/inicial.png");
    this.load.image("novo_jogo", "assets/novo_jogo.jpg");
    this.load.image("opcoes", "assets/opcoes.jpg");
    this.load.image("sair", "assets/sair.jpg");
  }

  create() {
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(3.5);
    this.add.image(400, 180, "mapa").setOrigin(0.5, 0.5).setScale(0.5);
    this.add
      .text(400, 110, "Rota Brasil", {
        fontSize: "36px",
        fill: "#FFD600",
        fontFamily: "KenPixel",
        align: "center",
        stroke: "#000",
        strokeThickness: 7,
      })
      .setOrigin(0.5, 0.5);

    const btnNovo = this.add
      .image(400, 430, "novo_jogo")
      .setScale(0.4)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("QuizScene");
      });

    const btnOpcoes = this.add
      .image(400, 490, "opcoes")
      .setScale(0.4)
      .setInteractive()
      .on("pointerdown", () => {
        alert("vou fazer ainda");
      });

    const btnSair = this.add
      .image(400, 550, "sair")
      .setScale(0.4)
      .setInteractive()
      .on("pointerdown", () => {
        alert("Sair! fecha o jogo");
      });
  }

  update() {
    // Atualizações do menu principal, se necessário
  }
}
