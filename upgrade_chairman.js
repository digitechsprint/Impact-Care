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
			<div class="chairman-card-premium">
                <div class="premium-quote-bg">“</div>
				<h4 class="chairman-subtitle-premium">CHAIRMAN'S MESSAGE</h4>
				<p class="chairman-text-premium">Our vision is to become a globally respected pharmaceutical company recognized for quality, innovation and ethical practices.</p>
                <div class="premium-divider"></div>
				<p class="chairman-text-premium">We will continue to invest in our people, technologies and partnerships to create a healthier tomorrow for generations to come.</p>
			</div>
		</div>
	</div>

	`;
    html = html.substring(0, startIndex) + newHtmlBlock + html.substring(endIndex);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated HTML to Premium Design');
} else {
    console.log('Could not find HTML block');
}

// 2. Update CSS
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `

/* =========================================
   CREATIVE PREMIUM CHAIRMAN MESSAGE
   ========================================= */
.chairman-card-premium {
    position: relative;
    background: linear-gradient(135deg, #0d2657 0%, #1e3a8a 100%);
    border-radius: 24px;
    padding: 80px 60px;
    text-align: center;
    box-shadow: 0 20px 50px rgba(13, 38, 87, 0.2);
    max-width: 950px;
    margin: 0 auto;
    overflow: hidden;
    z-index: 1;
}

/* Decorative glowing orbs */
.chairman-card-premium::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -10%;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: -1;
    pointer-events: none;
}
.chairman-card-premium::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -10%;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: -1;
    pointer-events: none;
}

.premium-quote-bg {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 350px;
    font-family: Georgia, serif;
    color: rgba(255, 255, 255, 0.03);
    line-height: 1;
    z-index: -1;
    pointer-events: none;
}

.chairman-subtitle-premium {
    color: #93c5fd;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 35px;
    font-family: 'Inter', sans-serif;
    display: inline-block;
    padding: 8px 20px;
    background: rgba(147, 197, 253, 0.1);
    border-radius: 30px;
    border: 1px solid rgba(147, 197, 253, 0.2);
}

.chairman-text-premium {
    font-size: 26px;
    line-height: 1.7;
    color: #f8fafc;
    font-style: italic;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    margin-bottom: 0;
    position: relative;
    z-index: 2;
}

.premium-divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #34d399);
    margin: 35px auto;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

@media (max-width: 768px) {
    .chairman-card-premium {
        padding: 50px 30px;
        border-radius: 16px;
    }
    .chairman-text-premium {
        font-size: 18px;
    }
    .premium-quote-bg {
        font-size: 200px;
        top: 0;
    }
}
`;

fs.appendFileSync(cssPath, newCss, 'utf8');
console.log('Successfully added Premium CSS');
