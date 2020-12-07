/*
BETA TEST



REFERENCES:

snowflakes - https://p5js.org/examples/simulate-snowflakes.html
shiver - https://editor.p5js.org/creativecoding/sketches/rWcunRzJW

*/
//

let timer;
let story = [];
let s = 0;

//State change for switching scenes
let mode = 0;
let scene1 = false;
let scene3 = false;
let scene4 = false;
let scene5 = false;
let scene6 = false;
let scene7 = false;
let scene8 = false;
let scene9 = false;
let scene10 = false;
let scene11 = false;
let scene12 = false;
let scene13 = false;

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
let winter;
let ben;
let flossie;
let ben_flossie;
let hildie_tanner;
let narrator; 
let win; 

//sound
let intro;

//character suspicions
let hildie_sus = 0;
let ben_sus = 0;
let tanner_sus = 0;

function preload(){
  story = loadStrings('story.txt', doText);
  
  //f = loadFont('Montserrat-Regular.otf');
  f_2 = loadFont('vibes.otf');
  
  //intro = loadSound('sounds/intro1.mp3');
  interact = loadSound('sounds/interest.mp3');
  
  start = loadImage('images/start.png');
  winter = loadImage('images/winter.png');
  mail = loadImage('images/mail.png');
  woman = loadImage('images/dead.png');
  suspects = loadImage('images/scene_10.png');
  instructions = loadImage('images/instructions.png');
  hildie = loadImage('images/hildie.png');
  ben = loadImage('images/ben.png');
  flossie = loadImage('images/flossie.png');
  ben_flossie = loadImage('images/ben_flossie.png');
  hildie_tanner = loadImage('images/hildie_tanner.png');
  narrator = loadImage('images/narrator.png');
  win = loadImage('images/win2.jpg');
  
    for (let i = 1; i < 11; i++){
    scenes[i] = loadImage('images/scene_' + i + '.png');
  }
}

function doText(data) {
  lines = data;
} 

function storyText(){
  console.log("SCRIPT");
  for (let s = 0; s < story.length; s++) {
    console.log(story[s]);
  }
}

function setup() {
  createCanvas(1000, 650);
  textSize(24);
  pixelDensity(1);
  
  mode = 0; // game not started
  storyText();
  //textFont('');
  //textFont(f);
  //intro.play();
  //intro.setVolume(0.5);
  timer = new Timer();
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
    intro.stop();
    
    if (timer.count(7000)){
      frame_2();
      fill(255,255,255, 220);
      rect(80, 460, 840, 140, 20);
      textSize(18);
      fill(0,0,0);
      text(story[1], 110, 483, 780, 100);
      fill(255);
      textSize(18);
      text('*do not press enter*',700,630);
    }
    
    if (timer.count(14000)){
      frame_2();
    

      fill(random(50),100);
      ellipse(727, 547, 30, 30);
    
      click_scene1();

      if(scene1 == true) {
        frame_3();
        hover_scene1();
      } 
    }
  }
  
  if (mode==3){
      frame_3();
      hover_scene1();
      timer.start = false;
  }
  
  if (mode == 4){
    frame_5();
    fill(255);
      textSize(18);
      text('*do not press enter*',700,630);
    textSize(15);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[5], 110, 484, 780, 100);
    
    if (timer.count(10000)){
      frame_6();
    
    textSize(16);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[6], 110, 484, 780, 100);
    }
    
    if(timer.count(20000)) { 
      frame_2();
    click_scene4();
    
    fill(random(50),100);
    ellipse(710, 300, 30, 30);

    if(scene8 == true) {
      frame_2();
      textSize(22);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text(story[7], 115, 530);
      fill(255);
      textSize(18);
      text('*press enter to continue*',700,630);
    }   
    }
    
  }
  

  if (mode == 5){
          frame_2();
    decision_1();
    click_scene2();
    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Hildie',230,40);
    if(scene4 == true) {
      frame_2();
      textSize(18);
      fill(255);
      text('You chose to lie. Hildie will remember that.',330,40);
       fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
      
      
    }else if(scene5 == true){
      frame_2();
      textSize(18);
      fill(255);
      text('You chose to tell the truth. Hildie will remember that.',280,40);
      textSize(17);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text(story[8],  110, 486, 780, 100);
       fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    
    //TO FIX: buttons diappear but areas are still clickable
  }
  
  if(mode == 6){
    if(scene4 == true) {
      frame_2();
      textSize(18);
      fill(255);
      text('You chose to lie. Hildie will remember that.',330,40);
       fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
      
      
    }else if(scene5 == true){
      frame_2();
      textSize(18);
      fill(255);
      text('You chose to tell the truth. Hildie will remember that.',280,40);
      textSize(17);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text(story[8],  110, 486, 780, 100);
       fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    timer.start = false;
  }
  
  if (mode == 7){
    frame_5();
    textSize(13);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[9], 110, 485, 780, 100);
      fill(255);
      textSize(19);
      text('*do not press enter*',700,630);
    
    if(timer.count(15000)){
      frame_7();
    }
    
    if(timer.count(22000)){
      frame_8();
    }
    
    if(timer.count(29000)){
      frame_9();
    }
    
    if(timer.count(40000)){
      image(scenes[5], 0, 0, 1000, 650);
    decision_2();
    click_scene2();
    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Ben',250,40);
    if(scene6 == true) {
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      text('You chose to not withold information. Ben will remember that.',260,40);
      textSize(20);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text(story[13],  110, 502, 780, 100);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
       
    }else if(scene7 == true){
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      text('You chose to withhold information. Ben will remember that.',275,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    }
    
  }
  
  if(mode==8){
    image(scenes[5], 0, 0, 1000, 650);
    decision_2();
    click_scene2();
    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Ben',250,40);
    if(scene6 == true) {
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      text('You chose to not withold information. Ben will remember that.',260,40);
      textSize(20);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text(story[13],  110, 502, 780, 100);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
       
    }else if(scene7 == true){
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      text('You chose to withhold information. Ben will remember that.',275,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    timer.start = false;
    }
  
  if (mode == 9){
    frame_10();
      fill(255);
      textSize(18);
      text('*do not press enter*',700,630);
    
    if(timer.count(7000)){
      frame_11();
    }
    
    if(timer.count(14000)){
      frame_12();
      hover_scene2();
      fill(random(50),100);
      ellipse(400, 350, 40, 40);
      
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
  }

  if (mode == 10){
  timer.start = false;
    frame_12();
      hover_scene2();
      fill(random(50),100);
      ellipse(400, 350, 40, 40);
      
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
  }
  
  if (mode == 11){
    frame_13();
    
    if (timer.count(10000)){
      frame_13a();
    }
    
    if (timer.count(17000)){
      image(scenes[8], 0, 0, 1000, 650);
    fill(random(50),100);
    ellipse(693, 300, 30, 30);
    click_scene3();
    
    if (scene9 == true){
      image(scenes[8], 0, 0, 1000, 650);
      textSize(22);
      fill(204,229,255, 220);
      rect(80, 460, 840, 140, 20);
      fill(0,0,0);
      text('Sheriff: "What do you think?"', 115, 530);
      
      fill(255);
      textSize(18);
      text('*press enter to continue*',700,630);
    }
    }
  }
  
  if (mode == 12){
    image(scenes[8], 0, 0, 1000, 650);
    click_scene2();
    decision_3();
    
    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Tanner',240,40);
    if(scene10 == true) {
      image(scenes[8], 0, 0, 1000, 650);
      text('You chose to go against Tanner. Tanner will remember that.',260,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
       
    }else if(scene11 == true){
      image(scenes[8], 0, 0, 1000, 650);
      text('You chose to give Tanner the benefit of the doubt. Tanner will remember that.',205,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    
  }
  
  if (mode == 13){
    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Tanner',240,40);
    if(scene10 == true) {
      image(scenes[8], 0, 0, 1000, 650);
      text('You chose to go against Tanner. Tanner will remember that.',260,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
       
    }else if(scene11 == true){
      image(scenes[8], 0, 0, 1000, 650);
      text('You chose to give Tanner the benefit of the doubt. Tanner will remember that.',205,40);
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    
    timer.start = false;
  }
  
  if (mode == 14){
    frame_6();
    textSize(20);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[19], 115, 507, 780, 100);
      fill(255);
      textSize(18);
      text('*do not press enter*',700,630);
    
    if (timer.count(7000)){
      frame_14();
    }
    
    if (timer.count(13000)){
      if (hildie_sus == 1 && ben_sus == 1 && tanner_sus == 1 || hildie_sus == 1 && ben_sus == 1 || tanner_sus == 1 && ben_sus == 1){
      frame_lost();
    } else {
        frame_14a();
        hover_scene3();
        fill(255);
        textSize(18);
        text('*press enter 2x to continue*',700,630);
    }
    }
  }
  
  
  if (mode == 15){
    frame_14a();
    hover_scene3();
    timer.start = false;
  }
  
  if (mode == 16){
    frame_15();
      fill(255);
      textSize(18);
      text('*do not press enter*',700,630);
    
    if (timer.count(7000)){
      frame_16();
    }
    
    if (timer.count(14000)){
      frame_17();
    }
    
    if (timer.count(21000)){
      frame_18();
    }
    
    if (timer.count(28000)){
      frame_19();
    }
    
    if (timer.count(35000)){
      frame_20();
    }
    
    if (timer.count(42000)){
      frame_21();
    }
    
    if (timer.count(49000)){
      frame_22();
    }
    
    if (timer.count(56000)){
      frame_23();
    }
    
    if (timer.count(63000)){
      frame_24();
    }
    
    if (timer.count(70000)){
      frame_25();
    }
    
    if (timer.count(77000)){
      frame_26();
    }
    
    if (timer.count(84000)){
      frame_27();
    }
    
    if (timer.count(91000)){
      frame_28();
    }
    
    if (timer.count(98000)){
      frame_29();
    }
    
    if (timer.count(105000)){
      frame_30();
    }
    
    if (timer.count(112000)){
      frame_31();
    }
    
    if (timer.count(119000)){
      frame_32();
    }
    
    if (timer.count(126000)){
      frame_33();
      fill(255);
      textSize(18);
      text('*press enter 2x to continue*',700,630);
    }
    
  }
  
  if (mode == 17){
    frame_33();
    fill(255);
    textSize(18);
    text('*press enter 2x to continue*',700,630);
  }
  
  if (mode == 18){
    frame_34();
    decision_4();
    
    if (scene12 == true){
      frame_win();    
    }else if (scene13 == true){
      frame_lost();
    }
  }
}


//---------------FUNCTIONS----------------------------//
function keyPressed(){
  if (keyCode === ENTER){
    mode += 1;
  }
  
  if (mode == 44){
    if (key == 'a' || 'A'){
       //idk
    }
    
    if (key == 'b' || 'B'){
      ellipse(width/2, height/2, 30,30);
    }
    
    if (key == "c" || "C"){
      ellipse(width/2, height/2, 30,30);
    }
    
    if (key == "d" || "D"){
      ellipse(width/2, height/2, 30,30);
    }
  }
}

function menu(){
  let txt = "The Last Snowfall";
  image(start, 0, 0, 1000, 650);
  fill(171,186,209,fade);
  textSize(18)
  text('an original short story by Nicholas Blincoe', 324, 375);
  textSize(14);
  text('Creative Coding final project by Janelle Algarra', 20, 630);
  textSize(22);
  text('press enter to begin', random(400,401), random(500,501));
  
  textSize(60);
  let txtH = 48;
  let txtW = textWidth(txt);
  let spacing = txtW / txt.length;
    
  for(let i = 0; i < txt.length; i++){
    let c = txt.charAt(i);
    
    let offsetX = random(-spacing / 10.0, spacing / 10.0);
    let offsetY = random(-spacing / 10.0, spacing / 10.0);
        
    let startX = (width - txtW) / 2 + spacing / 2;
    let y = height / 2; //  + textHeight / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
}

function opening(){
    background(instructions);
    textSize(50);
    fill(255);
    text('INSTRUCTIONS', random(310,312), random(100,102));
    textSize(18)
    text('press enter to continue', random(700,701), random(500,501));
    fill(random(180),200);
     ellipse(355, 335, 30, 30);
}

function frame_1(){
  image(mail, 0, 0, 1000, 650);
  fill(255);
  textSize(18);
  text('*do not press enter*',700,630);
  
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  textSize(21);
  fill(0,0,0);
    text(story[0], 112, 490, 780, 100);
}


function frame_2(){
   image(scenes[1], 0, 0, 1000, 650);

}


function frame_3(){
  //place interaction (touch photograph)
  image(scenes[2], 0, 0, 1000, 650);
  fill(random(50),100);
  ellipse(300, 250, 30, 30);
  ellipse(400, 350, 30, 30);
  ellipse(580, 400, 30, 30);
  
  fill(255);
  text('press enter 2x to continue',700,630)

}

function frame_5(){
  image(scenes[3], 0, 0, 1000, 650);
}

function frame_6(){
  image(winter, 0, 0, 1000, 650);
}

function frame_7(){
  cursor(ARROW);
  image(scenes[4], 0, 0, 1000, 650);
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[10], 110, 502, 780, 100);
}

function frame_8(){
  image(scenes[5], 0, 0, 1000, 650);
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[11], 100, 512, 780, 100);
}

function frame_9(){
  image(scenes[5], 0, 0, 1000, 650);
  textSize(19);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[12], 100, 495, 780, 100);
}

function frame_10(){
  image(scenes[6], 0, 0, 1000, 650);
  textSize(19);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[14], 113, 485, 780, 100);
}

function frame_11(){
  image(scenes[7], 0, 0, 1000, 650);
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[15], 100, 493, 780, 100);
}

function frame_12(){
  image(woman, 0, 0, 1000, 650);
}

function frame_13(){
  image(scenes[8], 0, 0, 1000, 650);
  textSize(16);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[17], 113, 483, 780, 100);
}

function frame_13a(){
  image(scenes[8], 0, 0, 1000, 650);
  textSize(19);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[18], 113, 485, 780, 100);
}

function frame_14(){
  image(scenes[9], 0, 0, 1000, 650);
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[20], 113, 505, 780, 100);
}

function frame_14a(){
  image(scenes[9], 0, 0, 1000, 650);
  fill(random(50),100);
  ellipse(322, 250, 30, 30);
  fill(random(50),100);
  ellipse(670, 470, 30, 30);
}

function frame_15(){
  image(suspects, 0, 0, 1000, 650);
  textSize(25);
  fill(0,0,0);
  frameRate(10);
  text('Frank Tanner', random(60,63), random(100,105));
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[23], 113, 505, 780, 100);
  
}

function frame_16(){
  image(suspects, 0, 0, 1000, 650);
  
  textSize(25);
  fill(0,0,0);
  frameRate(10);
  text('Frank Tanner', random(60,63), random(100,105));
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(18);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[24], 115, 490, 780, 100);
}

function frame_17(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(20);
  fill(165,205,142, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[25], 115, 490, 780, 100);
}

function frame_18(){
  image(ben_flossie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[26], 115, 490, 780, 100);
}

function frame_19(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(20);
  fill(165,205,142, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[27], 115, 490, 780, 100);
}

function frame_20(){
  image(hildie_tanner, 0, 0, 1000, 650);
  textSize(25);
  
  text('Frank Tanner', random(60,63), random(100,105));
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(20);
  fill(192,192,192, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[28], 115, 490, 780, 100);
}

function frame_21(){
  image(ben, 0, 0, 1000, 650);
  textSize(25);
  
  text('Ben Abott', random(360,363), random(130,135));
  
  textSize(20);
  fill(255,178,102, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[29], 115, 490, 780, 100);
}

function frame_22(){
  image(ben, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[30], 115, 490, 780, 100);
}

function frame_23(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(20);
  fill(165,205,142, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[31], 115, 490, 780, 100);
}

function frame_24(){
  image(flossie, 0, 0, 1000, 650);
  textSize(25);
  text('Flossie Jones', random(515,518), random(160,165));
  
  textSize(20);
  fill(226,204,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[32], 115, 490, 780, 100);
  
}

function frame_25(){
  image(flossie, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[33], 115, 485, 780, 100);
}

function frame_26(){
  image(flossie, 0, 0, 1000, 650);
  textSize(25);
  text('Flossie Jones', random(515,518), random(160,165));
  
  textSize(20);
  fill(226,204,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[34], 115, 490, 780, 100);
}

function frame_27(){
  image(flossie, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[35], 115, 480, 780, 100);
}

function frame_28(){
  image(ben_flossie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[36], 115, 490, 780, 100);
}

function frame_29(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  
  text('Hildie Johnson', random(780,783), random(140,145));
  
  textSize(18);
  fill(165,205,142, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[37], 115, 490, 780, 100);
}

function frame_30(){
  image(suspects, 0, 0, 1000, 650);
  
  textSize(16);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[38], 115, 490, 780, 100);
}

function frame_31(){
  image(narrator, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[39], 115, 490, 780, 100);
}

function frame_32(){
  image(narrator, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[40], 115, 490, 780, 100);
}

function frame_33(){
  image(narrator, 0, 0, 1000, 650);
  
  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[41], 115, 490, 780, 100);
}

function frame_34(){
  image(narrator, 0, 0, 1000, 650);
  textSize(25);
  fill(0,0,0);
  frameRate(10);
  text('Frank Tanner', random(60,63), random(100,105));
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  text('Hildie Johnson', random(780,783), random(140,145));
  
  
  fill(0,0,0);
  textSize(70);
  let txt = "Who is the killer?";
  
  let txtH = 48;
  let txtW = textWidth(txt);
  let spacing = txtW / txt.length;
    
  for(let i = 0; i < txt.length; i++){
    let c = txt.charAt(i);
    
    let offsetX = random(-spacing / 10.0, spacing / 10.0);
    let offsetY = random(-spacing / 10.0, spacing / 10.0);
        
    let startX = (width - txtW) / 2 + spacing / 2;
    let y = height / 2; //  + textHeight / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
  
}


function frame_lost(){
  //ADD CLICK TO RESTART GAME
  background(0);
  textSize(30);
  fill(255);
  
  let txt = "Because of your choices, you were framed for the murder";
  
  textSize(30);
  let txtH = 48;
  let txtW = textWidth(txt);
  let spacing = txtW / txt.length;
    
  for(let i = 0; i < txt.length; i++){
    let c = txt.charAt(i);
    
    let offsetX = random(-spacing / 10.0, spacing / 10.0);
    let offsetY = random(-spacing / 10.0, spacing / 10.0);
        
    let startX = (width - txtW) / 2 + spacing / 2;
    let y = height / 2; //  + textHeight / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
}

function frame_win(){
  image(win,0,0,1000,650);
  textSize(43);
  textFont(f_2);
  text(story[42], 20, 20, 960, 630);
}




//-----------CODES FOR INTERACTIONS-----
function decision_1(){
  textSize(30);
  fill(0,188,255);
  rect(random(150,152),random(450,452),250,80,25);
  fill(0,154,210);
  rect(random(590,592),random(450,452),250,80,25);
  fill(255);
  text('YES',245,500);
  text('NO',694,500);
  
}

function decision_2(){
  textSize(25);
  fill(0,188,255);
  rect(random(150,152),random(450,452),250,80,25);
  fill(0,154,210);
  rect(random(590,592),random(450,452),250,80,25);
  fill(255);
  text('WARN BEN',205,500);
  text('LET HIM BE',648,500);
  
}

function decision_3(){
  textSize(25);
  fill(0,188,255);
  rect(random(150,152),random(450,452),250,80,25);
  fill(0,154,210);
  rect(random(590,592),random(450,452),250,80,25);
  fill(255);
  text('SUSPECT TANNER',163,500);
  text("DON'T ANSWER",620,500);
  
}

function decision_4(){
  print(mouseX,mouseY);
  fill(128);
  rect(130,500,150,50,20);
  
  fill(255, 128,0);
  rect(330,500,150,50,20);
  
  fill(178,102,255);
  rect(530,500,150,50,20);
  
  fill(51,102,0);
  rect(730,500,150,50,20)
  
  fill(255);
  textSize(20);
  text('Tanner',170,530);
  text('Ben',385,530);
  text('Flossie',573,530);
  text('Hildie',777,530);
}




//clicks
let mailOpen, mailOpenA,mailOpenB, mailOpenC, yes,no, talk, body,sheriff, hildie_q, forensic1, forensic2;

let w = 1000;
let h = 650; // wait dont know how?

//CLICK SCENES
function click_scene1(){
  mailOpen = mouseX > 639 && mouseX < 813 && mouseY > 500 && mouseY < 600;
  
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
  yes = mouseX > 151 && mouseX < 402 && mouseY > 452 && mouseY < 531;
  no = mouseX > 580 && mouseX < 840 && mouseY > 452 && mouseY < 531;
  if (yes || no) {
    cursor(HAND)
  } else {
    cursor(ARROW)
  }
}

function click_scene3(){
  sheriff = mouseX > 619 && mouseX < 767 && mouseY > 76 && mouseY < 648;
  
  if (sheriff) {
    noStroke();
    fill(255,128,0);
    text('click to talk',mouseX,mouseY)
    cursor(HAND)
  } else {
    cursor(ARROW)
  }
  
}

function click_scene4(){
  hildie_q = mouseX > 630 && mouseX < 786 && mouseY > 69 && mouseY < 648;
  
  if (hildie_q) {
    noStroke();
    fill(255,128,0);
    text('click to talk',mouseX,mouseY)
    cursor(HAND)
  } else {
    cursor(ARROW)
  }
  
}



function hover_scene1(){
  mailOpenA = mouseX > 340 && mouseX < 470 && mouseY > 317 && mouseY < 391;
  mailOpenB = mouseX > 239 && mouseX < 357 && mouseY > 188 && mouseY < 293; 
  mailOpenC = mouseX > 513 && mouseX < 649 && mouseY > 367 && mouseY < 448;
  
  if (mailOpenA) {
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(19)
    text(story[2], 110, 495, 780, 100);
    fill(0,255,255);
    textSize(20)
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  } else if (mailOpenB) {    
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(18)
    text(story[3], 110, 490, 780, 100);
    fill(0,255,255);
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  } else if (mailOpenC) {    
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    textSize(19)
    text(story[4], 110, 490, 780, 100);
    fill(0,255,255);
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  } 
}

function hover_scene2(){
  body = mouseX > 124 && mouseX < 850 && mouseY > 200 && mouseY < 450;
  
  if (body) {
    textSize(18);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[16], 113, 495, 780, 100);
    fill(0,255,255);
    text('hover to reveal',mouseX,mouseY)
  }
  
}

function hover_scene3(){
  forensic1 = mouseX > 280 && mouseX < 364 && mouseY > 216 && mouseY < 286;
  forensic2 = mouseX > 627 && mouseX < 712 && mouseY > 431 && mouseY < 500;
  
  if (forensic1) {
    textSize(20);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[21], 113, 495, 780, 100);
    fill(0,255,255);
    text('hover to reveal',mouseX,mouseY)
  } else if (forensic2){
    textSize(20);
    fill(255,255,255, 220);
    rect(80, 460, 840, 140, 20);
    fill(0,0,0);
    text(story[22], 113, 485, 780, 100);
    fill(0,255,255);
    text('hover to reveal',mouseX,mouseY)
  }
  
}


function mousePressed(){
  if (mode==2){
    if (mouseX > 639 && mouseX < 813 && mouseY > 500 && mouseY < 600){
      scene1 = true;
      //print('clicked');
    }  
    //print(mouseX, mouseY);
  }
  
  if (mode == 4){
    if (mouseX > 630 && mouseX < 786 && mouseY > 69 && mouseY < 648){
      scene8 = true;
    }
  }
  
  if (mode==5){
    
    if (mouseX > 151 && mouseX < 402 && mouseY > 452 && mouseY < 531){
      scene4 = true;
      //hildie is suspicious
      hildie_sus +=1;
      print(hildie_sus);
    }else if(mouseX > 551 && mouseX < 800 && mouseY > 452 && mouseY < 531){
      scene5=true;
    }
  }
  
  if (mode == 7){
    if (mouseX > 151 && mouseX < 402 && mouseY > 452 && mouseY < 531){
      scene6 = true;
    }else if(mouseX > 551 && mouseX < 800 && mouseY > 452 && mouseY < 531){
      scene7=true;
      //Ben is suspicious
      ben_sus +=1;
      print(ben_sus);
    }
  }

  if (mode == 11){
    if (mouseX > 619 && mouseX < 767 && mouseY > 76 && mouseY < 648){
      scene9 = true;
    }
  }

if (mode == 12){
    if (mouseX > 151 && mouseX < 402 && mouseY > 452 && mouseY < 531){
      scene10 = true;
      //Tanner is suspicious
      tanner_sus +=1;
      print(tanner_sus);
    }else if(mouseX > 551 && mouseX < 800 && mouseY > 452 && mouseY < 531){
      scene11=true;
    }
  }
  
  if (mode == 18){
    if (mouseX > 731 && mouseX < 880 && mouseY > 502 && mouseY < 551){
        scene12 = true;
      }else if ((mouseX > 135 && mouseX < 278 && mouseY > 502 && mouseY < 551) || (mouseX > 337 && mouseX < 474 && mouseY > 502 && mouseY < 551) || (mouseX > 536 && mouseX < 676 && mouseY > 502 && mouseY < 551)){
        scene13 = true;
      }
}
}


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


class Timer {
    constructor() {
        this.start = false;
        this.time = 0;
        
    }
    count(ms) {
        if(this.start == false) {
            this.time = millis()
            this.start = true;
        }
        else {
            if(millis() - this.time > ms) {
                return true;
            }
            else {
                return false;
            }
        }  
    }
}