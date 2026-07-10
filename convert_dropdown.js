const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

const oldCss = `.custom-dropdown-container {
    position: relative;
}
.custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
    min-width: 200px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 1000;
}
.custom-dropdown-container:hover .custom-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.custom-dropdown-item {
    display: block;
    padding: 10px 20px;
    color: #4b5563;
    text-decoration: none;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
}
.custom-dropdown-item:hover {
    background: #f8f9fa;
    color: #0d2657;
}`;

const newCss = `.custom-dropdown-container {
    position: relative;
}
.custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    background: #ffffff;
    min-width: 480px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    border-radius: 12px;
    padding: 24px;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(15px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    border: 1px solid #f1f5f9;
}
.custom-dropdown-menu::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
    border-left: 1px solid #f1f5f9;
}
.custom-dropdown-container:hover .custom-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}
.custom-dropdown-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: #334155;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    background: transparent;
}
.custom-dropdown-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background: #3b82f6;
    transform: translateY(-50%) scaleY(0);
    transition: transform 0.2s ease;
    border-radius: 4px;
}
.custom-dropdown-item:hover {
    background: #f8fafc;
    color: #0d2657;
    padding-left: 24px;
}
.custom-dropdown-item:hover::before {
    transform: translateY(-50%) scaleY(1);
}`;

let updatedCount = 0;

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldCss)) {
        content = content.replace(oldCss, newCss);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

walkDir(bodiesDir);
console.log('Successfully updated ' + updatedCount + ' files with horizontal dropdown mega-menu style.');
