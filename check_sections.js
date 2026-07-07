const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

let howWeWorkCount = 0;
let testimonialCount = 0;

$('*').each(function() {
    if ($(this).children().length === 0) {
        if ($(this).text().includes('How We Work')) {
            console.log('How We Work element:', $(this).prop('tagName'));
            howWeWorkCount++;
            // Find the section parent
            let parent = $(this).closest('.e-con-full');
            console.log('Parent classes:', parent.attr('class'));
        }
        if ($(this).text().includes('Testimonials')) {
            console.log('Testimonials element:', $(this).prop('tagName'));
            testimonialCount++;
             let parent = $(this).closest('.e-con-full');
             console.log('Parent classes:', parent.attr('class'));
        }
    }
});
console.log('Done');
