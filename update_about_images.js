const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'src/content/bodies/about-us.html';
const content = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(content, { decodeEntities: false });

// 1. Delete the stethoscope sticky image
const stethoscopeWrapper = $('.elementor-element-5391c8d');
if (stethoscopeWrapper.length) {
    stethoscopeWrapper.remove();
    console.log("Stethoscope wrapper removed.");
}

// 2. Update Mission, Vision, Value images
// The 3 tabs are e-n-tab-content-225111981 (Vision), 225111982 (Mission), 225111983 (Value)

// Vision
const visionImg = $('#e-n-tab-content-225111981 img');
if (visionImg.length) {
    visionImg.attr('src', '/assets/uploads/images/rd_satisfaction.png');
    visionImg.removeAttr('srcset');
    visionImg.removeAttr('sizes');
}

// Mission
const missionImg = $('#e-n-tab-content-225111982 img');
if (missionImg.length) {
    visionImg.removeAttr('srcset');
    visionImg.removeAttr('sizes');
    missionImg.attr('src', '/assets/uploads/images/mission_new.png');
    missionImg.removeAttr('srcset');
    missionImg.removeAttr('sizes');
}

// Value
const valueImg = $('#e-n-tab-content-225111983 img');
if (valueImg.length) {
    valueImg.attr('src', '/assets/uploads/images/quality_assurance.png');
    valueImg.removeAttr('srcset');
    valueImg.removeAttr('sizes');
}

fs.writeFileSync(htmlPath, $.html(), 'utf8');
console.log("about-us.html updated.");
