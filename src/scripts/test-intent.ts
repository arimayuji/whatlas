import natural from "natural";
import path from "path";
import readline from "readline";

import { ConversationIntent } from "../domain/enums/conversation.enums";

const __dirname = path.resolve();

// Caminho do modelo salvo
const MODEL_PATH = path.resolve(
  __dirname,
  "./src/models/intent-classifier.json"
);

// Interface CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Carrega o classificador e inicia o loop de teste
natural.BayesClassifier.load(MODEL_PATH, null, (err, classifier) => {
  if (err) {
    console.error("Erro ao carregar classificador:", err);
    process.exit(1);
  }

  console.log(
    "🤖 Classificador carregado. Digite frases para testar (ou 'sair' para encerrar)\n"
  );

  rl.setPrompt("👉 ");
  rl.prompt();

  rl.on("line", (input) => {
    const text = input.trim().toLowerCase();

    if (text === "sair") {
      rl.close();
      return;
    }

    const predictedIntent = classifier.classify(text) as ConversationIntent;

    const top = classifier.getClassifications(text).slice(0, 3);

    console.log(`\n🧠 Intent detectada: ${predictedIntent}`);
    console.log(`📊 Confiança:`);
    top.forEach((r) =>
      console.log(`- ${r.label}: ${(r.value * 100).toFixed(2)}%`)
    );

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("👋 Finalizado.");
    process.exit(0);
  });
});
