const fs = require('fs');
const cheerio = require('cheerio');

function removeTestimonials(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, null, false);
    
    let found = false;
    $('*').each(function() {
        if ($(this).children().length === 0 && $(this).text().includes('Testimonials') && !found) {
            let topContainer = $(this).parents('div[data-element_type="container"]').last();
            if (topContainer.length) {
                topContainer.remove();
                found = true;
            } else {
                let topSection = $(this).parents('section[data-element_type="section"]').last();
                if (topSection.length) {
                    topSection.remove();
                    found = true;
                }
            }
        }
    });

    if (found) {
        let finalHtml = $.html();
        fs.writeFileSync(filePath, finalHtml);
        console.log('Removed from:', filePath);
    } else {
        console.log('Not found in:', filePath);
    }
}

removeTestimonials('src/content/bodies/index.html');
removeTestimonials('d:/New-Impact-Care/src/content/bodies/index.html');
