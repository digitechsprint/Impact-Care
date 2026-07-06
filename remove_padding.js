const fs = require('fs');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Replace padding for c223f2b (The parent section)
html = html.replace(
    /<div class="elementor-element elementor-element-c223f2b e-flex e-con-boxed e-con e-parent" data-id="c223f2b"\s*data-element_type="container" data-e-type="container">/,
    `<div class="elementor-element elementor-element-c223f2b e-flex e-con-boxed e-con e-parent" data-id="c223f2b"
		data-element_type="container" data-e-type="container" style="padding-top: 20px !important; padding-bottom: 20px !important; margin-top: 0 !important; margin-bottom: 0 !important;">`
);

// Replace padding for 18fe8ea (The child bg-section)
html = html.replace(
    /<div class="elementor-element elementor-element-18fe8ea bg-section e-flex e-con-boxed e-con e-child"\s*data-id="18fe8ea" data-element_type="container" data-e-type="container"\s*data-settings="\{&quot;background_background&quot;:&quot;classic&quot;\}">/,
    `<div class="elementor-element elementor-element-18fe8ea bg-section e-flex e-con-boxed e-con e-child"
				data-id="18fe8ea" data-element_type="container" data-e-type="container"
				data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="padding-top: 10px !important; padding-bottom: 20px !important; margin-top: 0 !important; margin-bottom: 0 !important;">`
);

fs.writeFileSync('src/content/bodies/index.html', html);
console.log("Successfully removed empty space from section wrappers!");
