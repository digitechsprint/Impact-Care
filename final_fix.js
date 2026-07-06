const fs = require('fs');
const cheerio = require('cheerio');

require('child_process').execSync('git checkout 67d4161 -- src/content/bodies/about-us.html');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const $ = cheerio.load(html, { decodeEntities: false }, false);
const $index = cheerio.load(fs.readFileSync('src/content/bodies/index.html', 'utf8'), { decodeEntities: false }, false);

const toDelete = ['132718b', '077127f', 'bee7fb8', '004af36'];
toDelete.forEach(id => {
    $(`[data-id="${id}"]`).remove();
});

// Replace the footer completely using Cheerio's html generation
const newFooterOuter = $index.html($index('[data-id="0151cb0"]'));
$('[data-id="0151cb0"]').replaceWith(newFooterOuter);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);

const openCount = (finalHtml.match(/<div/gi) || []).length;
const closeCount = (finalHtml.match(/<\/div>/gi) || []).length;
console.log(`Final Balance -> Open: ${openCount}, Close: ${closeCount}`);
