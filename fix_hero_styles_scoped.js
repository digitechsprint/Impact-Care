const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const bodiesDir = path.resolve(__dirname, 'src/content/bodies');
const skipFiles = new Set([
    'index.html',
    'home-image.html', 
    'home-slider.html',
    'home-video.html'
]);

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && !skipFiles.has(f));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });

    let changed = false;

    // Add unique class to the FIRST .bg-section.e-child
    const topBanner = $('.bg-section.e-child').first();
    
    if (topBanner.length > 0) {
        if (!topBanner.hasClass('top-hero-banner')) {
            topBanner.addClass('top-hero-banner');
            changed = true;
        }

        // We also need to add a style block for the overlay to the head if not exists
        const styleBlock = `
    <style id="top-hero-banner-styles">
        /* Scoped styles only for the very top hero banner */
        .top-hero-banner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
                135deg,
                rgba(0, 8, 25, 0.70) 0%,
                rgba(0, 25, 55, 0.55) 50%,
                rgba(0, 80, 90, 0.40) 100%
            );
            z-index: 0;
            pointer-events: none;
            border-radius: inherit;
        }
        .top-hero-banner > *,
        .top-hero-banner .e-con-inner,
        .top-hero-banner h1,
        .top-hero-banner h2,
        .top-hero-banner h3,
        .top-hero-banner p,
        .top-hero-banner .elementor-widget-container,
        .top-hero-banner .ekit-breadcrumb {
            position: relative !important;
            z-index: 1 !important;
            color: #ffffff !important;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        .top-hero-banner .ekit-breadcrumb li,
        .top-hero-banner .ekit-breadcrumb a,
        .top-hero-banner .ekit-breadcrumb span {
            color: rgba(255, 255, 255, 0.90) !important;
        }
    </style>
    `;

        if ($('#top-hero-banner-styles').length === 0) {
            $('head').append(styleBlock);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        updatedCount++;
    }
});

console.log(`\n✔ Done! Updated styles for ${updatedCount} files.`);
