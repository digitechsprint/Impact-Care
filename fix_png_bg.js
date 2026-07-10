const fs = require('fs');

const { execSync } = require('child_process');

try {
    require.resolve('pngjs');
} catch (e) {
    execSync('npm install pngjs --no-save');
}

const PNG = require('pngjs').PNG;

fs.createReadStream('public/assets/uploads/images/Logo.png')
    .pipe(new PNG())
    .on('parsed', function() {
        let whiteCount = 0;
        let transparentCount = 0;
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let r = this.data[idx];
                let g = this.data[idx+1];
                let b = this.data[idx+2];
                let a = this.data[idx+3];
                
                if (a === 0) transparentCount++;
                else if (r > 250 && g > 250 && b > 250 && a > 250) whiteCount++;
            }
        }
        
        console.log("Total pixels: " + (this.width * this.height));
        console.log("Transparent pixels: " + transparentCount);
        console.log("White pixels: " + whiteCount);
        
        if (transparentCount === 0 && whiteCount > 0) {
            console.log("The image has a baked-in white background!");
            
            console.log("Removing white background...");
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let idx = (this.width * y + x) << 2;
                    let r = this.data[idx];
                    let g = this.data[idx+1];
                    let b = this.data[idx+2];
                    
                    if (r >= 230 && g >= 230 && b >= 230) {
                        this.data[idx+3] = 0; 
                    }
                }
            }
            this.pack().pipe(fs.createWriteStream('public/assets/uploads/images/Logo_transparent.png'));
            console.log("Saved transparent logo to Logo_transparent.png");
        } else {
            console.log("Image already has transparent pixels or no white background.");
        }
    });
