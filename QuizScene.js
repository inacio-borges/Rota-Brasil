import { quizData } from "./quizData.js";

export class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: "QuizScene" });
  }

  create() {
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(3.5);
    this.perguntaAtual = 0;
    this.containerPergunta = null;
    this.mostrarPergunta();
  }

  mostrarPergunta() {
    if (this.containerPergunta) {
      this.containerPergunta.destroy(true);
    }
    const q = quizData[this.perguntaAtual];

    // Medir textos para ajustar tamanho do container
    const larguraMax = 500;
    const paddingH = 40;
    const paddingV = 30;

    // Medir largura e altura da pergunta
    const tempPergunta = this.add.text(0, 0, q.pergunta, {
      fontSize: "32px",
      fontFamily: "Arial",
      wordWrap: { width: larguraMax - paddingH },
    });
    tempPergunta.setWordWrapWidth(larguraMax - paddingH, true);
    const larguraPergunta = tempPergunta.width;
    const alturaPergunta = tempPergunta.height;

    // Medir largura e altura das opções
    let larguraOpcoes = 0;
    let alturaOpcoes = 0;
    const tempOpcoes = [];
    q.opcoes.forEach((opcao, i) => {
      const t = this.add.text(0, 0, `${i + 1}. ${opcao}`, {
        fontSize: "24px",
        fontFamily: "Arial",
        wordWrap: { width: larguraMax - paddingH },
      });
      t.setWordWrapWidth(larguraMax - paddingH, true);
      larguraOpcoes = Math.max(larguraOpcoes, t.width);
      alturaOpcoes += t.height + 10;
      tempOpcoes.push(t);
    });

    const larguraFundo = Math.max(larguraPergunta, larguraOpcoes) + paddingH;
    const alturaFundo = alturaPergunta + alturaOpcoes + paddingV * 2;

    // Limpar textos temporários
    tempPergunta.destroy();
    tempOpcoes.forEach((t) => t.destroy());

    this.containerPergunta = this.add.container(400, 400);
    const fundo = this.add.rectangle(
      0,
      0,
      larguraFundo,
      alturaFundo,
      0x000000,
      0.5
    );
    fundo.setOrigin(0.5, 0.5);
    this.containerPergunta.add(fundo);

    // Adicionar pergunta
    const perguntaText = this.add.text(
      0,
      -alturaFundo / 2 + paddingV,
      q.pergunta,
      {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Arial",
        wordWrap: { width: larguraFundo - paddingH },
        align: "center",
      }
    );
    perguntaText.setOrigin(0.5, 0);
    this.containerPergunta.add(perguntaText);

    // Adicionar opções
    let y = -alturaFundo / 2 + paddingV + alturaPergunta + 20;
    q.opcoes.forEach((opcao, i) => {
      const opcaoText = this.add.text(
        -larguraFundo / 2 + paddingH / 2,
        y,
        `${i + 1}. ${opcao}`,
        {
          fontSize: "24px",
          fill: "#fff",
          wordWrap: { width: larguraFundo - paddingH },
          align: "left",
        }
      );
      opcaoText.setOrigin(0, 0);

      opcaoText.setInteractive();
      opcaoText.on("pointerdown", () => {
        if (i === q.resposta) {
          alert("Correto!");
        } else {
          alert("Errado!");
        }
        this.perguntaAtual++;
        if (this.perguntaAtual < quizData.length) {
          this.mostrarPergunta();
        } else {
          this.containerPergunta.destroy(true);
          const fimText = this.add.text(400, 300, "Fim do Quiz!", {
            fontSize: "40px",
            fill: "#fff",
          });
          fimText.setOrigin(0.5);
          fimText.setInteractive();
          fimText.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
          });
        }
      });
      this.containerPergunta.add(opcaoText);
      y += opcaoText.height + 10;
    });
  }
}
