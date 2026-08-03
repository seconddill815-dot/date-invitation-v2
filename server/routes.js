const express = require("express");
const router = express.Router();

const { sendTelegramMessage } = require("./telegram");

function clean(value) {
  if (!value) return "нет";

  return String(value)
    .replace(/[<>]/g, "")
    .trim()
    .substring(0, 300);
}

router.post("/date-response", async (req, res) => {
  try {
    const data = {
      date: clean(req.body.date),
      time: clean(req.body.time),
      food: clean(req.body.food),
      flowers: clean(req.body.flowers),
      gift: clean(req.body.gift),
      wishes: clean(req.body.wishes),
      device: clean(req.body.platform),
      browser: clean(req.body.browser),
      language: clean(req.body.language),
      screen: clean(req.body.screen),
      opened: clean(req.body.opened)
    };

    const message = `
❤️ Новое приглашение

📅 Дата: ${data.date}
⏰ Время: ${data.time}

🍝 Еда: ${data.food}
🌹 Цветы: ${data.flowers}
🎁 Подарок: ${data.gift}

💬 Пожелания:
${data.wishes}

📱 Устройство: ${data.device}
🌐 Браузер: ${data.browser}
🗣 Язык: ${data.language}
🖥 Экран: ${data.screen}
🕒 Открыт: ${data.opened}
`;

    await sendTelegramMessage(message);

    res.json({
      success: true,
      message: "Ответ успешно отправлен."
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Ошибка сервера."
    });
  }
});

module.exports = router;
