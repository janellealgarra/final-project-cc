/*
BETA TEST - used p5.js editor for this

Worked on:
1. Graphics
2. Interactions

Still have to work on:
1. Fixing Graphics
2. Transitions (I want to try fading in and out through each scene)
3. More interactions and other scenes
4. Clean code D: 

REFERENCES:

snowflakes - https://p5js.org/examples/simulate-snowflakes.html

*/
//State change for switching scenes
let mode = 0;
let scene1 = false;
let something = false;

//animation
let snowflakes = [];
let fade = 0;
let fadeAmount = 1

//images
let start;
let mail;
let scenes = [];
let hildie;
let woman;
let suspects;
let instructions;

//text
let par1 = "Every fortnight when I make my mail flight up to Ambler Bay, I look forward to visiting old Hildie. All the folks up at Ambler are fine by me, but when I deliver Hildie's mail, I'm not just doing my job - I'm exercising a genuine pleasure.";

let par2 = "This trip, though, Hildie was so overwrought she forgot her manners and pounced on the mail packet without offering me a drink. She found the envelope from the photo lab in Anchorage and ripped it open, saying, 'Now those guys'll have to believe me.'";

let par3 = "Hildie is in her 70s and none too lissom. Rather than scrape through a gap in the chain-link fence to get to the body, she went home to radio for help. Unfortunately, she was out of methanol and her generator was dry, so the radio wouldn't work. I told her she should have filled the generator with moonshine, and she said she wished she had thought of that - the woman might still be alive. Instead, she locked up her dog, Betsy, and drove to the sheriff's office in Ambler, taking the photo on the way.";

let par4 = "By the time the sheriff and Hildie returned to the site, the body was gone and a fresh fall of snow left no traces as to how she might have disappeared. With no body, there was no mystery. As the sheriff said at the time, who knew but the woman hadn't simply got up and wandered away? Now I had seen Hildie's photographs, I knew this was impossible. Dressed in jeans and a sweatshirt, the woman would have died of hypothermia in half an hour.";

let par5 = "As she had predicted, the picture showed a body lying in the snow, beyond the chain-link fence that the oil company had erected around its drilling site. Hildie was right about something else, too. This was a genuine mystery.";

let par6 = "The woman was lying between two great pines in the middle of an expanse of fresh snow. There were no tracks leading to her body, save the pockmarks of a prowling dog and the holes made by snow fallen from the branches above. There was no snow on the woman, not even a dusting, so the only way she could have got there was if she had fallen from the sky.";

let par7 = "Yet this wasn't as far-fetched as it might sound. The arrival of the oil company had also brought eco-warriors up from Seattle. The activists were intent on scaling the trees around the drilling site and this woman was likely one of them, a protester who had fallen from her perch. If that cleared up half the mystery, it didn't explain the rest of Hildie's story.";


function preload(){
  start = loadImage('start.jpg');
  mail = loadImage('mail.png');
  hildie = loadImage('hildie.PNG');
  woman = loadImage('dead.png');
  suspects = loadImage('scene_12.png');
  instructions = loadImage('instructions.png');
    for (let i = 1; i < 11; i++){
    scenes[i] = loadImage('scene_' + i + '.png');
  }
}

function setup() {
  createCanvas(1000, 650);
  textSize(24);
  pixelDensity(1);

  mode = 0; // game not started

}

function draw() {
  clear(); // clear screen each time it shifts to a different mode
  noStroke();
  let t = frameCount / 60; //for snow

//-----------------fade transitions---------------------//
  if (fade<0) {
    fadeAmount=0.5;
  }
  if (fade>255) {
    fadeAmount=1;
  }

  fade += fadeAmount;

//---------------switching scenes-----------------------//

  if (mode == 0){
    menu();
      // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

  if (mode == 1){
    opening();
  }

  if (mode == 2){
    frame_1();
  }

  if (mode == 3){
    frame_2();
    for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
    image(hildie, 0, 0, 1000, 650);

    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(par2, 110, 495, 780, 100);
  }

  if(mode == 4){
    frame_2();


    for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }
  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

    image(hildie, 0, 0, 1000, 650);
    click_scene1();
    frame_2a();
    //click_scene1();
    if(scene1 == true) {
      frame_4();
      something = true;
      click_scene2();
    }
  }

  if(mode == 5){
    frame_5();
    textSize(16);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(par3, 110, 484, 780, 100);
  }

  if(mode == 6){
    frame_6();

      for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

    textSize(16);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(par4, 110, 484, 780, 100);
  }

  if (mode == 7){
    background(0);
    textSize(50);
    fill(255);
    text('END OF BETA', 500, 300);
  }
}




//---------------FUNCTIONS----------------------------//
function keyPressed(){
  if (keyCode === ENTER){
    mode += 1;
  }
}

function menu(){
  background(start);
  fill(171,186,209,fade);
  text('press enter to begin', random(120,121), random(500,501));
}

function opening(){
    background(instructions);
    textSize(50);
    fill(255);
    text('INSTRUCTIONS', random(310,312), random(100,102));
    textSize(18)
    text('press enter to continue', random(700,701), random(500,501));
    fill(random(180),200);
     ellipse(850, 343, 30, 30);
}

function frame_1(){
  background(mail);


  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  textSize(20);
  fill(0,0,0);
    text(par1, 110, 495, 780, 100);
}

function frame_2(){
  //insert timer
  //insert interaction (open photograph)
   image(scenes[5], 0, 0, 1000, 650);
    //ellipse(700, 500, 50, 50);
    //image(hildie, 0, 0, 1000, 650);
}
function frame_2a(){
  fill(random(50),100);
   ellipse(745, 550, 30, 30);
}

function frame_3(){
  //place interaction (touch photograph)
  image(scenes[2], 0, 0, 1000, 650);

}

function frame_4(){
  image(scenes[3], 0, 0, 1000, 650);
  fill(random(50),100);
  ellipse(300, 250, 30, 30);
  ellipse(400, 350, 30, 30);
  ellipse(580, 400, 30, 30);
}

function frame_5(){
  image(scenes[4], 0, 0, 1000, 650);
}

function frame_6(){
  image(scenes[5], 0, 0, 1000, 650);
}

//clicks
let mailOpen, mailOpenA,mailOpenB, mailOpenC;


function click_scene1(){
  mailOpen = mouseX >650 && mouseX < 850 && mouseY > 500 && mouseY < 580;

  if (mailOpen) {
    noStroke();
    fill(255,128,0);
    text('click to open',mouseX,mouseY)
    cursor(HAND)
  } else {
    cursor(ARROW)
  }
}

function click_scene2(){
  mailOpenA = mouseX > 340 && mouseX < 470 && mouseY > 317 && mouseY < 391;
  mailOpenB = mouseX > 239 && mouseX < 357 && mouseY > 188 && mouseY < 293;
  mailOpenC = mouseX > 513 && mouseX < 649 && mouseY > 367 && mouseY < 448;

  if (mailOpenA) {
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(21)
    text(par5, 110, 495, 780, 100);
    cursor(HAND)
  } else if (mailOpenB) {
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(18)
    text(par6, 110, 490, 780, 100);
    cursor(HAND)
  } else if (mailOpenC) {
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(18)
    text(par7, 110, 490, 780, 100);
    cursor(HAND)
  }
}

function mousePressed(){
  if (mode==4){
    if (mouseX > 650 && mouseX < 850 && mouseY > 500 && mouseY < 580){
      scene1 = true;
      print('clicked');
    }
    //print(mouseX, mouseY);
  }

  if (something == true){
    print(mouseX, mouseY);

    if (mouseX > 340 && mouseX < 470 && mouseY > 317 && mouseY < 391){
      print('LOL')
    }
    if (mouseX > 239 && mouseX < 384 && mouseY > 188 && mouseY < 312){
      print('HAHA');
    }
    if (mouseX > 513 && mouseX < 649 && mouseY > 367 && mouseY < 448){
      print('HII');
    }

  }

}


/*

*/

/* COME BACK TO LATER
//Ben Abott
function frame_7(){
  image(scenes[6], 0, 0, 1000, 650);
}


function frame_8(){
  image(scenes[7], 0, 0, 1000, 650);
}

function frame_9(){
  image(scenes[8], 0, 0, 1000, 650);
}


//Sheriff
function frame_10(){
  image(scenes[9], 0, 0, 1000, 650);
}

//dead woman closeup
function frame_11(){
  image(woman, 0, 0, 1000, 650);
}

//tanner
function frame_12(){
  image(scenes[10], 0, 0, 1000, 650);
}

//blurry image of girl -- tap to reveal
function frame_13(){
  image(scenes[11], 0, 0, 1000, 650);
}

//suspects
function frame_14(){
  image(suspects, 0, 0, 1000, 650);// scene_12 in array not working?
  textSize(25);
  fill(0,0,0);
  frameRate(10);
  text('Frank Tanner', random(75,78), random(100,105));
  text('Ben Abott', random(370,373), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  text('Hildie Johnson', random(770,773), random(140,145));
}*/


function snowflake() {
  fill(255,255,255);
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}