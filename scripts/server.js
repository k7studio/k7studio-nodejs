import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Setup para o __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, "../build")));

// Rota fallback para servir index.html em qualquer rota (para single page apps)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

