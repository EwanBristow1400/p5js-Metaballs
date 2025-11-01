let bubbleswindow;
let scaleFactor = 8;
let bubbleswindowNeedsUpdate = false;

let bubbles = [];
let CM = 0;

function preload(){
    //font = loadFont("../img/CompoundMono.ttf");
}
function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noSmooth();
    bubbleswindow = createGraphics(
        300, 100
    );
    bubbleswindow.pixelDensity(1);
    bubbleswindow.drawingContext.filter = 'blur(4px)';

    for (var i = 0; i < 30; i += 1){
        let b = new bubble(random(0, 300), random(0,100) );
        bubbles.push(b);
    }

    //textFont(font)



}

function draw() {

    if (frameCount % 2 === 0) {
        bubbleswindowNeedsUpdate = true;
    }

    if (bubbleswindowNeedsUpdate) {

        bubbleswindow.background(255);
        bubbleswindow.noStroke();
        for (let b of bubbles) b.show(bubbleswindow);
        bubbleswindow.background(0);

        bubbleswindow.fill(255)
        for (let i = bubbles.length - 1; i >= 0; i--) {
            bubbles[i].show();
            if (bubbles[i].dead) {
                bubbles.splice(i, 1);
            }
        }

        bubbleswindow.loadPixels();
        for (let i = 0; i < bubbleswindow.pixels.length; i += 4) {
            const v = bubbleswindow.pixels[i];
            const bw = v < (50) ? 0:255;
            bubbleswindow.pixels[i] = bw;
            bubbleswindow.pixels[i + 1] = bw;
            bubbleswindow.pixels[i + 2] = bw;
        }
        bubbleswindow.updatePixels();

        image(bubbleswindow, 0, 0, windowWidth, windowHeight*0.4);

        bubbleswindowNeedsUpdate = false;


        blendMode(DIFFERENCE)
        textAlign(CENTER);
        textSize((windowHeight + windowWidth) *0.05);
        text("MetaBalls", windowWidth/2, windowHeight*0.25)
        blendMode(BLEND);



    }

    console.log(bubbles.length)
}
class bubble{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.xvel = random(-0.4, 0.4);
        this.yvel = random(-0.4, 0.4);
        this.r = random(5, 15);
    }
    show(){

        if (this.x > width + this.r) this.x = -this.r;
        else if (this.x < -this.r) this.x = width + this.r;

        if (this.y > height + this.r) this.y = -this.r;
        else if (this.y < -this.r) this.y = height + this.r;

        fill(255)
        this.x += this.xvel;
        this.y += this.yvel;
        bubbleswindow.circle(this.x, this.y, this.r);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function mouseDragged(){
    if(bubbles.length < 1000){
        let b = new bubble(150, 50);
        bubbles.push(b);
    }

}

