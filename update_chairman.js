const fs = require('fs');

// 1. Update HTML
const htmlPath = 'src/content/bodies/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldHtmlStart = '<!-- Chairman Message Section -->';
const oldHtmlEnd = '<!-- Our Divisions Section -->';

const startIndex = html.indexOf(oldHtmlStart);
const endIndex = html.indexOf(oldHtmlEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const newHtmlBlock = `<!-- Chairman Message Section -->
	<div class="chairman-message-section">
		<div class="chairman-container">
			<div class="chairman-card-new">
				<h4 class="chairman-subtitle">CHAIRMAN'S MESSAGE</h4>
				<div class="chairman-quote-icon">“</div>
				<p class="chairman-text">Our vision is to become a globally respected pharmaceutical company recognized for quality, innovation and ethical practices.</p>
				<p class="chairman-text">We will continue to invest in our people, technologies and partnerships to create a healthier tomorrow for generations to come.</p>
			</div>
		</div>
	</div>

	`;
    html = html.substring(0, startIndex) + newHtmlBlock + html.substring(endIndex);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated HTML');
} else {
    console.log('Could not find HTML block');
}

// 2. Update CSS
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `

/* New Centered Chairman Message Design */
.chairman-card-new {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    border-top: 5px solid #2b3a8c;
    position: relative;
    max-width: 900px;
    margin: 0 auto;
}
.chairman-card-new .chairman-subtitle {
    color: #2b3a8c;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-family: 'Inter', sans-serif;
}
.chairman-card-new .chairman-quote-icon {
    color: #2b3a8c;
    font-size: 90px;
    font-family: Georgia, serif;
    font-weight: 900;
    line-height: 0.8;
    margin: 0px auto 15px auto;
    opacity: 0.15;
}
.chairman-card-new .chairman-text {
    font-size: 20px;
    line-height: 1.8;
    color: #334155;
    font-style: italic;
    margin-bottom: 20px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
}
.chairman-card-new .chairman-text:last-child {
    margin-bottom: 0;
}
@media (max-width: 768px) {
    .chairman-card-new {
        padding: 40px 20px;
    }
    .chairman-card-new .chairman-text {
        font-size: 16px;
    }
}
`;

if (!css.includes('chairman-card-new')) {
    fs.appendFileSync(cssPath, newCss, 'utf8');
    console.log('Successfully added CSS');
} else {
    console.log('CSS already exists');
}
