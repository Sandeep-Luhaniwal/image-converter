const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const upload = multer();

app.use(express.static(path.join(__dirname, '../public')));

app.post('/convert', upload.single('image'), (req, res) => {
    const format = req.body.format;
    sharp(req.file.buffer)
        .toFormat(format)
        .toBuffer()
        .then(data => {
            res.type(`image/${format}`);
            res.send(data);
        })
        .catch(err => {
            console.error('Conversion error:', err);
            res.status(500).send('Conversion failed.');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
