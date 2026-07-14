const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

let found = false;
$('*').each(function() {
    if ($(this).children().length === 0 && $(this).text().includes('Testimonials') && !found) {
        console.log('Found:', $(this).text().trim());
        let topContainer = $(this).parents('div[data-element_type="container"]').last();
        if (topContainer.length) {
            console.log('Deleting top container class:', topContainer.attr('class'), 'id:', topContainer.attr('data-id'));
            topContainer.remove();
            found = true;
        } else {
             // Maybe it's a section, let's try 'section'
            let topSection = $(this).parents('section[data-element_type="section"]').last();
            if (topSection.length) {
                console.log('Deleting top section class:', topSection.attr('class'), 'id:', topSection.attr('data-id'));
                topSection.remove();
                found = true;
            }
        }
    }
});

if (found) {
    let finalHtml = $('#dummy-root').html();
    fs.writeFileSync('src/content/bodies/index.html', finalHtml);
    console.log('Finished deleting Testimonials section in index.html.');
} else {
    console.log('Testimonials section not found.');
}
