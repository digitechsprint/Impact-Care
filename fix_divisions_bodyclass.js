const fs = require('fs');

const pageFile = 'src/app/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// The default body class for full width elementor pages
const defaultBodyClass = 'page-template-default page page-id-10083 wp-custom-logo wp-theme-dispnsary tt-magic-cursor elementor-default elementor-template-full-width elementor-kit-8 elementor-page';
const defaultElementorConfig = '{}';

pageContent = pageContent.replace('bodyClass={page?.bodyClass || ""}', `bodyClass={page?.bodyClass || "${defaultBodyClass}"}`);
pageContent = pageContent.replace('elementorConfig={page?.elementorConfig || "{}"}', `elementorConfig={page?.elementorConfig || "${defaultElementorConfig}"}`);

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Fixed bodyClass for division routes');
