require("dotenv").config();

const express = require("express");
const path = require("path");

const routes = require("./server/routes");
const logger = require("./server/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// Middleware
// ===============================

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  logger.logRequest(req);
  next();
});

// Статические файлы
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api", routes);

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Обработка 404
app.use((req, res) => {
  res.status(404).send("404 - Страница не найдена");
});

// Обработка ошибок
app.use((err, req, res, next) => {
  logger.logError(err);
  console.error(err);
  res.status(500).send("Внутренняя ошибка сервера");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
