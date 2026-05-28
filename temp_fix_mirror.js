const fs = require('fs');
const files = [
  'mirror/html/home-image.html',
  'mirror/html/home-slider.html',
  'mirror/html/home-video.html',
  'mirror/html/index.html',
  'home_slider_rendered.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace headings
  content = content.replace(/Our Services/g, 'Our Products');
  content = content.replace(/Comprehensive services for your health/g, 'Comprehensive products for your health');
  
  // Replace links
  content = content.replace(/\/services\/urology\//g, '/products/');
  content = content.replace(/\/services\/neurology\//g, '/products/');
  content = content.replace(/\/services\/eye-care\//g, '/products/');
  content = content.replace(/"\/services\/"/g, '"/products/"');
  
  // Replace names
  content = content.replace(/>\s*Urology\s*<\/h3>/g, '>\n                    Acofan Tablet                </h3>');
  content = content.replace(/>\s*Neurology\s*<\/h3>/g, '>\n                    Acumol Tablet                </h3>');
  content = content.replace(/>\s*Eye Care\s*<\/h3>/g, '>\n                    AFSC Kit                </h3>');
  
  // Replace description and button text
  content = content.replace(/our wide range of services is designed/g, 'our wide range of products is designed');
  content = content.replace(/View All Services/g, 'View All Products');
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
