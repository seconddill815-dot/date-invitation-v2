const express = require('express');
const path = require('path');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.set('trust proxy', true);

const TELEGRAM_TOKEN = '8818740837:AAHbqtAxkiaNWBvp96EpRQh4EIWCrRyvIWA'; 
const USER_ID = '606514748';

function sendTelegramNotification(text) {
    const payload = JSON.stringify({ chat_id: USER_ID, text: text });
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TELEGRAM_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };
    const req = https.request(options);
    req.on('error', (err) => console.error('Ошибка TG:', err));
    req.write(payload);
    req.end();
}

function getGeoAndNotify(baseText, req) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    if (ip.includes(',')) { ip = ip.split(',')[0].trim(); }
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('10.')) {
        sendTelegramNotification(`${baseText}\n🌐 IP: Локальный/Тестовый`);
        return;
    }
    https.get(`https://ipapi.co{ip}/json/`, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const geo = JSON.parse(data);
                const locationInfo = geo.city && geo.country_name 
                    ? `📍 Локация: ${geo.city}, ${geo.country_name}` 
                    : `🌐 IP: ${ip} (Определить город не удалось)`;
                sendTelegramNotification(`${baseText}\n${locationInfo}`);
            } catch (e) { sendTelegramNotification(`${baseText}\n🌐 IP: ${ip}`); }
        });
    }).on('error', () => { sendTelegramNotification(`${baseText}\n🌐 IP: ${ip}`); });
}

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.post('/api/visit', (req, res) => { getGeoAndNotify(`🔔 Внимание! ${req.body.name} открыл(а) ссылку-приглашение!`, req); res.sendStatus(200); });
app.post('/api/answer', (req, res) => { getGeoAndNotify(`💌 ${req.body.name} ответил(а) на приглашение:\n${req.body.answer}`, req); res.sendStatus(200); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Сервер готов'));
