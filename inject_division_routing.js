const fs = require('fs');

const pageFile = 'src/app/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Ensure imports exist
if (!pageContent.includes('DivisionPage')) {
    pageContent = pageContent.replace('import { HtmlBlock } from "@/components/ui/HtmlBlock";', 
        'import { HtmlBlock } from "@/components/ui/HtmlBlock";\nimport { DivisionPage } from "@/components/divisions/DivisionPage";\nimport { getProductsByDivision } from "@/lib/division-mapper";');
}

const interceptLogic = `
  // 4. Intercept division category pages
  if (urlPath.startsWith("/divisions/") && urlPath.replace("/divisions/", "").length > 0) {
    const divisionSlug = urlPath.replace("/divisions/", "");
    const divisionProducts = getProductsByDivision(divisionSlug);

    const templateHtml = getPageBodyHtml("product__acofan-tablet");
    const layout = parseWordPressDetailLayout(templateHtml);

    return (
      <WordPressPage
        bodyHtml={templateHtml}
        bodyClass={page?.bodyClass || ""}
        elementorConfig={page?.elementorConfig || "{}"}
      >
        <HtmlBlock html={layout.headStyles + layout.preloader + layout.cursor + layout.header} />
        <DivisionPage divisionSlug={divisionSlug} products={divisionProducts} />
        <HtmlBlock html={layout.footer} />
      </WordPressPage>
    );
  }

  // 5. Fallback standard WordPress page rendering`;

if (!pageContent.includes('// 4. Intercept division category pages')) {
    pageContent = pageContent.replace('// 3. Fallback standard WordPress page rendering', interceptLogic);
    fs.writeFileSync(pageFile, pageContent, 'utf8');
    console.log('Successfully injected division routing to page.tsx');
} else {
    console.log('Division routing already injected');
}
