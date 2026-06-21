const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const mirrorPath = path.resolve('mirror', 'html', 'about-us.html');
const mirrorContent = fs.readFileSync(mirrorPath, 'utf8');
const $mirror = cheerio.load(mirrorContent, { decodeEntities: false });

const stethoscopeWrapper = $mirror('.elementor-element-5391c8d');
const htmlToAppend = $mirror.html(stethoscopeWrapper);

const currentPath = path.resolve('src', 'content', 'bodies', 'about-us.html');
const currentContent = fs.readFileSync(currentPath, 'utf8');
const $current = cheerio.load(currentContent, { decodeEntities: false });

if ($current('.elementor-element-5391c8d').length === 0) {
    const parentContainer = $current('.elementor-element-3683a39 > .e-con-inner');
    if (parentContainer.length && htmlToAppend) {
        parentContainer.append(htmlToAppend);
        fs.writeFileSync(currentPath, $current.html(), 'utf8');
        console.log("Appended outerHTML and saved.");
    } else {
        console.log("Missing parent or wrapper");
    }
} else {
    console.log("Already exists.");
}
