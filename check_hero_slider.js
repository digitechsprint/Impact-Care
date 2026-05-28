const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);

// Find the very first section in the elementor body
const hero = $('.elementor-10180 > .elementor-element').first();
console.log("Hero section classes:", hero.attr('class'));

// Inside the hero, see what kind of widgets there are
hero.find('.elementor-widget').each((i, el) => {
    console.log(`Widget ${i}:`, $(el).attr('data-widget_type'));
});
