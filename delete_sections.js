const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

function deleteSectionByText(text) {
    let found = false;
    $('*').each(function() {
        if ($(this).children().length === 0 && $(this).text().includes(text) && !found) {
            console.log('Found:', text);
            let topContainer = $(this).parents('div[data-element_type="container"]').last();
            if (topContainer.length) {
                console.log('Deleting top container class:', topContainer.attr('class'), 'id:', topContainer.attr('data-id'));
                topContainer.remove();
                found = true;
            }
        }
    });
    return found;
}

deleteSectionByText('How We Work');
deleteSectionByText('Testimonials');

let finalHtml = $('#dummy-root').html();
fs.writeFileSync('src/content/bodies/products.html', finalHtml);
console.log('Finished deleting sections.');
