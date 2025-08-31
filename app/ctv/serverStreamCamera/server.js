const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'frames/' });

const HLS_DIR = path.join(__dirname, 'hls');
if (!fs.existsSync(HLS_DIR)) fs.mkdirSync(HLS_DIR);

// Xóa dữ liệu HLS cũ
fs.readdirSync(HLS_DIR).forEach(file => fs.unlinkSync(path.join(HLS_DIR, file)));

// Khởi động FFmpeg đọc từ pipe
const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-tune', 'zerolatency',
    '-pix_fmt', 'yuv420p',
    '-g', '25',
    '-sc_threshold', '0',
    '-f', 'hls',
    '-hls_time', '2',
    '-hls_list_size', '5',
    '-hls_flags', 'delete_segments',
    path.join(HLS_DIR, 'stream.m3u8')
]);

ffmpeg.stderr.on('data', data => console.log('FFmpeg:', data.toString()));
ffmpeg.on('close', code => console.log(`FFmpeg exited with code ${code}`));

// API nhận frame từ ESP32
app.post('/frame', upload.single('frame'), (req, res) => {
    const imgPath = path.join(__dirname, req.file.path);
    const imgData = fs.readFileSync(imgPath);
    fs.unlinkSync(imgPath);

    // Gửi frame vào stdin của FFmpeg
    ffmpeg.stdin.write(imgData);

    res.json({ status: 'ok' });
});

app.listen(3102, () => {
    console.log('Server listening on port 3102');
});