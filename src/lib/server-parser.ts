import * as cheerio from "cheerio";

export function parseWordPressLayout(html: string) {
  const $ = cheerio.load(html);

  // 1. Extract Head Styles
  const headStyles = $("head style").parent().html() || "";

  // 2. Extract Preloader & Header
  const preloader = $(".preloader").parent().html() || "";
  const cursor = $("#magic-cursor").parent().html() || "";
  const header = $(".ekit-template-content-header").parent().html() || "";

  // 3. Extract Main content parts
  const mainContent = $('.elementor.elementor-947');
  
  let heroBanner = "";
  let lowerContent = "";
  
  mainContent.children().each((i, el) => {
    // Child 0 is the hero banner
    if (i === 0) {
      heroBanner = $.html(el);
    } else if (i > 1) {
      // Child 2, 3 etc are the content below the products grid
      lowerContent += $.html(el);
    }
  });

  // 4. Extract Footer
  const footer = $(".ekit-template-content-footer").parent().html() || "";

  return {
    headStyles,
    preloader,
    cursor,
    header,
    heroBanner,
    lowerContent,
    footer
  };
}
