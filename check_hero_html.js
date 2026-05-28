const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);

const hero = $('.elementor-10180 > .elementor-element').first();
console.log($.html(hero).substring(0, 1500));
