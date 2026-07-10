const fs = require('fs');

const pageFile = 'src/app/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Bypass the notFound() check for /divisions/ routes
pageContent = pageContent.replace('if (!page) notFound();', 'if (!page && !urlPath.startsWith("/divisions/")) notFound();');

// Also update generateStaticParams to include divisions
const divisionsToAdd = `
  const divisionParams = [
    "general-medicine",
    "cardio-diabetics",
    "critical-care",
    "pediatrics",
    "herbals",
    "generic",
    "upcoming"
  ].map(slug => ({ slug: ["divisions", slug] }));
  
  return [{ slug: [] as string[] }, ...params, ...divisionParams];
`;
pageContent = pageContent.replace('return [{ slug: [] as string[] }, ...params];', divisionsToAdd);

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Fixed 404 for division routes');
