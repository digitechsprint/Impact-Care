const Tesseract = require('tesseract.js');
const fs = require('fs');

async function recognizeImages() {
    for (let i = 1; i <= 5; i++) {
        const file = `public/gallery/real_logo_${i}.jpg`;
        console.log(`Recognizing ${file}...`);
        try {
            const { data: { text } } = await Tesseract.recognize(
                file,
                'eng',
                { logger: m => {} }
            );
            console.log(`real_logo_${i}.jpg contains text: \n${text.trim()}\n---`);
        } catch (e) {
            console.error(`Error with ${file}:`, e);
        }
    }
}

recognizeImages();
