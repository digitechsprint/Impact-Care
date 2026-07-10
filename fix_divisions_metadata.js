const fs = require('fs');

const pageFile = 'src/app/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Bypass the notFound() check for /divisions/ routes in generateMetadata
const metadataFix = `
  if (!page) {
    if (urlPath.startsWith("/divisions/")) {
      const divisionSlug = urlPath.replace("/divisions/", "");
      return { title: divisionSlug.toUpperCase().replace("-", " ") + " - Impact Healthcare" };
    }
    return { title: "Not Found" };
  }
`;
pageContent = pageContent.replace('if (!page) return { title: "Not Found" };', metadataFix);

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Fixed metadata for division routes');
