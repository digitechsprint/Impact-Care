const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);

const mainContent = $('.elementor.elementor-947');

mainContent.children().each((i, el) => {
  const hasGrid = $(el).find('.elementor-element-7e00e1b').length > 0;
  console.log(`Child ${i} (${$(el).attr('class').split(' ')[1]}): has grid? ${hasGrid}`);
});
