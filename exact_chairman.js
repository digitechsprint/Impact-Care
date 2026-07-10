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
	<div class="chairman-message-section-exact">
		<div class="chairman-container">
			<div class="chairman-card-exact">
                <div class="chairman-quote-wrap">
                    <span class="quote-dot-left"></span>
                    <div class="quote-circle">
                        “
                    </div>
                    <span class="quote-dot-right"></span>
                </div>
				
                <h4 class="chairman-subtitle-exact">CHAIRMAN'S MESSAGE</h4>
				
                <div class="chairman-divider-exact">
                    <div class="divider-line"></div>
                    <div class="divider-cube"></div>
                    <div class="divider-line"></div>
                </div>

				<p class="chairman-text-exact">Our vision is to become a globally respected<br>pharmaceutical company recognized for<br><span class="chairman-highlight">quality, innovation</span> and <span class="chairman-highlight">ethical practices</span>.</p>
				
                <div class="chairman-small-dot"></div>

                <p class="chairman-text-exact">We will continue to invest in our people, technologies<br>and partnerships to create a <span class="chairman-highlight">healthier tomorrow</span><br>for generations to come.</p>
			</div>
		</div>
	</div>

	`;
    html = html.substring(0, startIndex) + newHtmlBlock + html.substring(endIndex);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated HTML to Exact Replica Design');
} else {
    console.log('Could not find HTML block');
}

// 2. Update CSS
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `

/* =========================================
   EXACT CHAIRMAN MESSAGE DESIGN (IMAGE REPLICA)
   ========================================= */
.chairman-message-section-exact {
    padding: 120px 20px;
    background-image: url('/assets/uploads/images/chairman-bg-new.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    background-color: #f0f8ff; /* Fallback */
}

.chairman-card-exact {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

/* Quote Circle */
.chairman-quote-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
    gap: 15px;
    position: relative;
}

.quote-circle {
    width: 80px;
    height: 80px;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color: #0044cc;
    font-family: Georgia, serif;
    font-weight: 900;
    line-height: 1;
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    position: relative;
    padding-top: 15px; /* adjust quote vertical alignment */
}
/* creating the semi-circle arcs with dots */
.quote-circle::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 1px solid rgba(0, 68, 204, 0.3);
    border-radius: 50%;
    clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%, 0 70%, 100% 70%, 100% 100%, 0 100%);
    pointer-events: none;
}

.quote-dot-left, .quote-dot-right {
    width: 6px;
    height: 6px;
    background-color: #0044cc;
    border-radius: 50%;
}

/* Subtitle */
.chairman-subtitle-exact {
    color: #0044cc;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
}

/* Divider with Cube */
.chairman-divider-exact {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 40px;
}

.divider-line {
    width: 50px;
    height: 1px;
    background-color: #0044cc;
    opacity: 0.5;
}

.divider-cube {
    width: 10px;
    height: 10px;
    background-color: #0044cc;
    transform: rotate(45deg);
    box-shadow: inset -3px -3px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3);
}

/* Text */
.chairman-text-exact {
    font-size: 24px;
    line-height: 1.7;
    color: #1e293b;
    font-family: Georgia, serif;
    font-style: italic;
    margin-bottom: 30px;
    font-weight: 500;
}

.chairman-highlight {
    color: #0044cc;
    font-weight: 700;
    font-style: italic;
}

.chairman-small-dot {
    width: 6px;
    height: 6px;
    background-color: #0044cc;
    border-radius: 50%;
    margin: 0 auto 30px auto;
}

@media (max-width: 768px) {
    .chairman-text-exact {
        font-size: 18px;
    }
    .chairman-text-exact br {
        display: none;
    }
}
`;

fs.appendFileSync(cssPath, newCss, 'utf8');
console.log('Successfully added Exact Replica CSS');
