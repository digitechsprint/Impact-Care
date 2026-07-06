const fs = require('fs');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Replace padding for 187708a (Why Choose Us parent section)
html = html.replace(
    /<div class="elementor-element elementor-element-187708a e-flex e-con-boxed e-con e-parent" data-id="187708a"\s*data-element_type="container" data-e-type="container">/,
    `<div class="elementor-element elementor-element-187708a e-flex e-con-boxed e-con e-parent" data-id="187708a"
		data-element_type="container" data-e-type="container" style="padding-top: 20px !important; margin-top: 0 !important;">`
);

fs.writeFileSync('src/content/bodies/index.html', html);
console.log("Successfully removed empty space from Why Choose Us section wrapper!");
