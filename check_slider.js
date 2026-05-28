const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/home-slider.html', 'utf8');
const $ = cheerio.load(html);
const slider = $('.swiper-container, .swiper, .elementor-widget-elementskit-slider, [data-widget_type="elementskit-slider.default"]');
console.log('Sliders found:', slider.length);
if (slider.length > 0) {
  console.log('Slider outerHTML snippet:', $.html(slider.eq(0)).substring(0, 1000));
} else {
  console.log('Hero banner html:', $.html($('.top-hero-banner')).substring(0, 1000));
}
