const fs = require('fs');
const path = require('path');

const bodiesDir = path.join('src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const productsColumn = `<div class="elementor-element elementor-element-c512355 e-con-full e-flex e-con e-child" data-id="c512355" data-element_type="container" data-e-type="container">
	<div class="elementor-element elementor-element-9960de5 at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" data-id="9960de5" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="heading.default">
		<div class="elementor-widget-container">
			<h2 class="elementor-heading-title elementor-size-default">Products</h2>
		</div>
	</div>
	<div class="elementor-element elementor-element-a81493e footer-links elementor-widget elementor-widget-ekit-vertical-menu" data-id="a81493e" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="ekit-vertical-menu.default">
		<div class="elementor-widget-container">
			<div class="ekit-wid-con">
				<div class="ekit-vertical-main-menu-wraper   badge-position-left">
					<div class="ekit-vertical-menu-container">
						<ul id="menu-footer-healthcare-menu" class="ekit-vertical-navbar-nav submenu-click-on-icon">
							<li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content"><a href="/product/cipotax-tablet/" class="ekit-menu-nav-link">Cipotax Tablet</a></li>
							<li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content"><a href="/product/cefzone-s-1-5gm/" class="ekit-menu-nav-link">Cefzone S 1.5gm</a></li>
							<li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content"><a href="/product/cefaxone-1gm/" class="ekit-menu-nav-link">Cefaxone 1gm</a></li>
							<li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content"><a href="/product/atroclass-20/" class="ekit-menu-nav-link">Atroclass 20</a></li>
							<li class="menu-item menu-item-type-custom menu-item-object-custom nav-item elementskit-mobile-builder-content"><a href="/product/amloclass-10/" class="ekit-menu-nav-link">Amloclass 10</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Insert Products block before Quick Links block (if not already there)
    const quickLinksDiv = '<div class="elementor-element elementor-element-b5d0d70';
    if (content.includes(quickLinksDiv) && !content.includes('menu-footer-healthcare-menu')) {
        content = content.replace(quickLinksDiv, productsColumn + '\n\t\t\t\t\t\t\t\t' + quickLinksDiv);
        modified = true;
    }

    // 2. Remove "Our Team" link from Quick Links
    const ourTeamRegex = /<li[^>]+><a href="\/our-team\/"[^>]*>Our Team<\/a><\/li>/g;
    const ourTeamRegex2 = /<li[^>]+menu-item-4644[^>]*>[\s\S]*?<\/li>/g;
    if (ourTeamRegex2.test(content)) {
        content = content.replace(ourTeamRegex2, '');
        modified = true;
    }

    // 3. Update Address
    const oldAddress1 = '2464 Royal Ln. Mesa, New Jersey';
    const oldAddress2 = 'Impact Healthcare Private Limited, 302, Maharaja Aggarsain Shopping Complex, LSC - 7, Sector - 9, Rohini, New Delhi - 110085';
    const oldAddress3 = '210-302, Maharaja Agrasen Shopping Complex, L.S.C.7, Sector 9, Rohini, Delhi - 110085. INDIA';
    
    if (content.includes(oldAddress1)) {
        content = content.split(oldAddress1).join(oldAddress2);
        modified = true;
    }
    if (content.includes(oldAddress3)) {
        content = content.split(oldAddress3).join(oldAddress2);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`Successfully updated ${updatedCount} HTML files.`);
