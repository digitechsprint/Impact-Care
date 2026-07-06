const fs = require('fs');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// Find the first instance of <style>\n.cert-section-wrapper
const styleStart = html.indexOf('<style>\n.cert-section-wrapper');
// Find the end marker
const endMarker = '<div class="elementor-element elementor-element-b93f3c2';
const endIndex = html.indexOf(endMarker);

if (styleStart === -1 || endIndex === -1) {
    console.error("Could not find section bounds.");
    // Fallback: maybe just find the first 215b6f0
    const start2 = html.indexOf('<div class="elementor-element elementor-element-215b6f0');
    if (start2 !== -1 && endIndex !== -1) {
        html = html.substring(0, start2) + "\n<!-- INSERT HERE -->\n" + html.substring(endIndex);
    } else {
        process.exit(1);
    }
} else {
    html = html.substring(0, styleStart) + "\n<!-- INSERT HERE -->\n" + html.substring(endIndex);
}

const newSection = `
<style>
.cert-section-wrapper {
    padding: 0 0 100px 0;
    width: 100%;
}
.cert-circles-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1300px;
    margin: 40px auto 0;
}
.cert-circle {
    flex: 0 0 240px;
    height: 240px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    margin: -10px;
    position: relative;
    z-index: 1;
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
}
.cert-circle:nth-child(1) { animation-delay: 0.1s; }
.cert-circle:nth-child(2) { animation-delay: 0.2s; }
.cert-circle:nth-child(3) { animation-delay: 0.3s; }
.cert-circle:nth-child(4) { animation-delay: 0.4s; }
.cert-circle:nth-child(5) { animation-delay: 0.5s; }

.cert-circle:hover {
    transform: translateY(-15px) scale(1.05);
    z-index: 10;
    box-shadow: 0 20px 40px rgba(67, 97, 238, 0.3);
}

.cert-solid {
    background-color: #4361ee;
    color: #ffffff;
    z-index: 2;
}
.cert-outline {
    background-color: #ffffff;
    color: #0b1030;
    border: 2px solid #4361ee;
    z-index: 1;
}

.cert-icon {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
}
.cert-icon img {
    max-height: 60px;
    object-fit: contain;
}
.cert-solid .cert-icon img { filter: brightness(0) invert(1); } /* Make white for blue background */

.cert-title {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 5px;
    font-family: 'Inter', sans-serif;
}
.cert-solid .cert-title { color: #ffffff; }
.cert-outline .cert-title { color: #0b1030; }

.cert-desc {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
}
.cert-solid .cert-desc { color: rgba(255, 255, 255, 0.9); }
.cert-outline .cert-desc { color: #4361ee; }

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
    .cert-circle {
        flex: 0 0 190px;
        height: 190px;
        margin: -5px;
    }
    .cert-title { font-size: 20px; }
    .cert-icon img { max-height: 40px; }
}
@media (max-width: 768px) {
    .cert-circles-container { gap: 20px; margin: 20px 0; }
    .cert-circle { flex: 0 0 220px; height: 220px; margin: 0; }
}
</style>

<div class="elementor-element elementor-element-215b6f0 e-flex e-con-boxed e-con e-parent" data-id="215b6f0" data-element_type="container" data-e-type="container">
    <div class="e-con-inner cert-section-wrapper">
        <div class="elementor-element elementor-element-3792349 e-con-full e-flex e-con e-child" data-id="3792349" data-element_type="container" data-e-type="container" style="justify-content: center;">
            <div class="elementor-element elementor-element-6ac8ec4 at-heading-animation at-animation-heading-style-3 elementor-widget elementor-widget-heading" data-id="6ac8ec4" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="heading.default" style="width: 100%; text-align: center;">
                <div class="elementor-widget-container">
                    <h2 class="elementor-heading-title elementor-size-default" style="color: #4361ee; text-align: center; margin-bottom: 20px;">CERTIFICATIONS & ACCREDITATIONS</h2>
                </div>
            </div>
        </div>
        
        <div class="cert-circles-container">
            <div class="cert-circle cert-solid">
                <div class="cert-icon">
                    <img src="/gallery/logo_1.png" alt="WHO Logo">
                </div>
                <div class="cert-title">WHO GMP</div>
                <div class="cert-desc">CERTIFIED</div>
            </div>
            <div class="cert-circle cert-outline">
                <div class="cert-icon">
                    <img src="/gallery/logo_2.png" alt="ISO 9001 Logo">
                </div>
                <div class="cert-title">ISO<br>9001:2015</div>
                <div class="cert-desc">CERTIFIED</div>
            </div>
            <div class="cert-circle cert-solid">
                <div class="cert-icon">
                    <img src="/gallery/logo_3.png" alt="ISO 14001 Logo">
                </div>
                <div class="cert-title">ISO<br>14001:2015</div>
                <div class="cert-desc">CERTIFIED</div>
            </div>
            <div class="cert-circle cert-outline">
                <div class="cert-icon">
                    <img src="/gallery/logo_4.png" alt="ISO 45001 Logo">
                </div>
                <div class="cert-title">ISO<br>45001:2018</div>
                <div class="cert-desc">CERTIFIED</div>
            </div>
            <div class="cert-circle cert-solid">
                <div class="cert-icon">
                    <img src="/gallery/logo_5.png" alt="GLP Logo">
                </div>
                <div class="cert-title">GLP</div>
                <div class="cert-desc">CERTIFIED</div>
            </div>
        </div>
    </div>
</div>
`;

html = html.replace('\n<!-- INSERT HERE -->\n', newSection);
fs.writeFileSync('src/content/bodies/index.html', html);
console.log('Successfully applied clean logos.');
