/*
Final Project - Interactive Narrative
by Janelle Algarra

p5.js link ---> https://editor.p5js.org/janellealgarra/sketches/oPOenycoZ

------------------------
Controls:
1. Enter - for some scenes
2. mouse - to click or hover over certain areas

------------------------
Goal:
1. An interactive narrative that allows the user to make decisions as well as uncover scenes through their interactions
2. Focus on the story and the images
3. Inspired by games like Until Dawn, Detroit: become human, and other telltale games

------------------------
Main challenges:
1.) There's a lot of complexity when it comes to making interactive narratives especially when it comes to those that have decision making.
My first task was to really get down all the scenes and complete the story. It was difficult because I really had to take time to plan it
out in order to take note of the directions, interactions, and plot so that it would make sense by the end.

2.) Timing the sequences - when I first started, I had the users click to switch scenes. But that didn't make the game efficient and
sticking with that would potentially cause people to skip over scenes due to the repetitiveness. I started with 44 clicks and ended
up with just 3 scene switch clicks (only during important decision making moments). With the help of a friend, I was able to have a
timer class that would allow me to start and stop (but more like store) the millis so it can move through both animated and
interactive scenes. And to solve my problem from my last code where I needed users to double click, I decided to make certain
interaction scenes timed and have the variable mode add 1 when the timer reaches a certain millis.

3.) Mapping the place of interaction - it took a lot of tedious work to map out each area where there was an interaction. At first, I hardcoded
the numbers but thanks to the feedback I got from Professor, I changed it so that the areas of interaction were compared to the canvas width and
height so that it would be consistent throughout different platforms.

4.) Font and styling - This was a bit difficult to figure out because I originally had all my text in one place but the
feedback I got showed me that it would be best to have the text also move around and used as a device to tell the story
alongside the visuals.

-----------------------------
Improvements:
1. Aesthetics - I would've wanted to play with the font further but because of the graphics I already drew, it was difficult to
adjust it in any major way. Text manipulation where the text appear one by one would've been nice too. I was able to get the code
my classmates used but I did not really understand how to use it so I decided to leave that part and just shorten the text by adding
more scenes where the characters talk to each other.

2. Sound - I really wanted to put sound as a way to tell the story as well but I was more focused on getting all the other parts to work.

3. Scene transitions - I used the variable mode to identify the switches between scenes because that was the most effective way for me
to understand how to switch between scenes. However, I would've liked to make it more organized by using more classes possibly.

4. More interactions/decision making - If I were to revise this project, I would like to add more interactive elements that would atually
change the scenes rather than just reveal the clues in textual form. I also only had one kind of real decision making so maybe if I spent
more time on the story, I could have it go more directions (at the moment, there is only a winning and losing path).

------------------------------
REFERENCES:
story - https://www.theguardian.com/books/2006/dec/27/fiction.originalwriting
snowflakes - https://p5js.org/examples/simulate-snowflakes.html
shiver - https://editor.p5js.org/creativecoding/sketches/rWcunRzJW

*/

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


//character suspicions
let hildie_sus = 0;
let ben_sus = 0;
let tanner_sus = 0;

function preload(){
  story = loadStrings('story.txt', doText);

  f = loadFont('Montserrat-Regular.otf');
  f_2 = loadFont('vibes.otf');

  start = loadImage('images/start.png');
  winter = loadImage('images/winter.png');
  mail = loadImage('images/mail.png');
  woman = loadImage('images/dead.png');
  suspects = loadImage('images/scene_10.png');
  instructions = loadImage('images/instructions.jpg');
  hildie = loadImage('images/hildie.png');
  q_hildie = loadImage('images/question-hildie.png');
  a_hildie = loadImage('images/a-main.png');
  a_sheriff = loadImage('images/a-sheriff.png');
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
  textFont(f);
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
    opening();
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

  // variable mode used to determine which scenes to play (for organization purposes and to lead user on based off the timer)
  if (mode == 1){
    rules();
  }

  if (mode == 2){

    frame_1();

    if (timer.count(7000)){
      frame_2();
      fill(0,0,0,220);
      rect(80, 400, 360, 230, 20);
      textSize(19);
      fill(255);
      text(story[1], 115, 430, 310, 300);
      textFont(f);
      fill(255);
      textSize(22);
      text('"Now those',random(470,472),130);
      textSize(25);
      text("guys will",840,random(190,192));
      textSize(28);
      text("have to",random(470,472),250);
      textSize(32);
      text('believe me."',800,random(330,332));
    }

    if (timer.count(17000)){
      mode = mode + 1; // to move frames and then new timer without having to click twice (like in the last version)
      timer.start = false; // start a new timer
    }
  }

  if (mode == 3){
      frame_2();


      fill(random(50),100);
      ellipse(727, 547, 30, 30);

      click_scene1();

      if(scene1 == true) {
        frame_3();
        hover_scene1();

        if (timer.count(40000)){
          textFont('Georgia');
          fill(255);
          textSize(18);
          text('You have 5 seconds remaining',380,20);
        }
        if (timer.count(45000)){
          mode += 1;
          timer.start = false;
        }
      }
  }



  if (mode == 4){
    frame_5();
    textFont('Georgia');
    fill(0,0,0,220);
    rect(80, 200, 390, 280, 20);
    textSize(20);
    fill(255);
    text(story[5], 116, 240, 340, 300);

    if (timer.count(15000)){
      frame_6();
      textFont('Georgia');
      textSize(25);
      fill(255);
      text(story[6], 330, 100, 600, 500);
    }

    if(timer.count(35000)) {
      frame_2();
    click_scene4();

    fill(random(50),100);
    ellipse(710, 300, 30, 30);

    if(scene8 == true) {
      image(q_hildie,0,0, 1000,650);
      textSize(30);
      textFont(f);
      fill(255);
      text(story[7], random(80,82), 300);
    }

    if(timer.count(42000)) {
      image(q_hildie,0,0, 1000,650);
      textSize(30);
      textFont(f);
      fill(255);
      text(story[7], random(80,82), 300);
    }

    if(timer.count(46000)) {
      mode+=1;
      timer.start = false;
    }
  }
}

  if (mode == 5){
    image(q_hildie,0,0, 1000,650);
    decision_1();
    click_scene2();
    textSize(18);
    fill(255);
    textFont('Georgia');
    text('*Your decision will have an impact in your relationship with Hildie',230,40);
    if(scene4 == true) {
      frame_2();
      textSize(18);
      fill(255);
       textFont('Georgia');
      text('You chose to lie. Hildie will remember that.',330,40);
      frame_instruct(); // instruction to press enter. One of the only 3 times the user has to click to move forward
												//just because it's a scene where they have to make an important decision

    }else if(scene5 == true){
      image(a_hildie,0,0, 1000,650);
      textSize(18);
      fill(255);
       textFont('Georgia');
      text('You chose to tell the truth. Hildie will remember that.',280,40);
      textSize(30);
      fill(255);
       textFont(f);
      text(story[8], random(550,552), 300);
      frame_instruct();
    }
  }

  if(mode == 6){
    if(scene4 == true) {
      frame_2();
      textSize(18);
      fill(255);
       textFont('Georgia');
      text('You chose to lie. Hildie will remember that.',330,40);

    }else if(scene5 == true){
      image(a_hildie,0,0, 1000,650);
      textSize(18);
      fill(255);
       textFont('Georgia');
      text('You chose to tell the truth. Hildie will remember that.',280,40);
      textSize(30);
      fill(255);
      text(story[8], random(550,552), 300);
    }

    if(timer.count(3000)){
      mode+=1;
      timer.start = false;
    }
  }

  if(mode == 7){
    frame_5a();

    if(timer.count(30000)){
      frame_7();
    }

    if(timer.count(36000)){
      frame_8();
    }

    if(timer.count(42000)){
      frame_9();
    }

    if(timer.count(55000)){
      image(scenes[5], 0, 0, 1000, 650);
    decision_2();
    click_scene2();
    textSize(18);
    fill(255);
    textFont('Georgia');
    text('*Your decision will have an impact in your relationship with Ben',250,40);
    if(scene6 == true) {
      image(scenes[5], 0, 0, 1000, 650);
      textFont('Georgia');
      textSize(18);
      fill(255);
      text('You chose to not withold information. Ben will remember that.',260,40);
      textSize(23);
      textFont('Georgia');
      fill(0,0,0, 220);
      rect(500, 250, 300, 250, 20);
      fill(255);
      text(story[13],  530, 280, 260, 250);
      frame_instruct();

    }else if(scene7 == true){
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      textFont('Georgia');
      text('You chose to withhold information. Ben will remember that.',275,40);
    frame_instruct();
    }
    }
  }

  if (mode == 8){
        if(scene6 == true) {
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
      textFont('Georgia');
      text('You chose to not withold information. Ben will remember that.',260,40);
      textSize(23);
      textFont('Georgia');
      fill(0,0,0, 220);
      rect(500, 250, 300, 250, 20);
      fill(255);
      text(story[13],  530, 280, 260, 250);

    }else if(scene7 == true){
      image(scenes[5], 0, 0, 1000, 650);
      textSize(18);
      fill(255);
       textFont('Georgia');
      text('You chose to withhold information. Ben will remember that.',275,40);
    }

    if(timer.count(3000)){
      mode+=1;
      timer.start = false;
    }
  }

  if (mode == 9){
    frame_10();
    textFont('Georgia');

    if(timer.count(10000)){
      frame_11();
    }

    if(timer.count(23000)){
      frame_12();
      hover_scene2();
      fill(random(50),100);
      ellipse(400, 350, 40, 40);

      if (timer.count(40000)){
          textFont('Georgia');
          fill(255);
          textSize(18);
          text('You have 5 seconds remaining',380,20);
        }
        if (timer.count(45000)){
          mode += 1;
          timer.start = false;
        }

    }
  }

  if (mode == 10){
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
      textSize(23);
      fill(255,255,255, 220);
      rect(80, 460, 400, 140, 20);
      fill(0,0,0);
      textFont(f);
      text('Sheriff: "What do you think?"', 115, 530);
    }

     if(timer.count(22000)){
        image(scenes[8], 0, 0, 1000, 650);
        textSize(23);
        fill(255,255,255, 220);
        rect(80, 460, 400, 140, 20);
        fill(0,0,0);
        text('Sheriff: "What do you think?"', 115, 530);
      }

      if(timer.count(29000)){
        mode+=1;
        timer.start = false;
      }
  }
}

  if (mode == 11){
    image(scenes[8], 0, 0, 1000, 650);
    click_scene2();
    decision_3();

    textSize(18);
    fill(255);
    text('*Your decision will have an impact in your relationship with Tanner',200,40);
    if(scene10 == true) {
      image(scenes[8], 0, 0, 1000, 650);
      textFont('Georgia');
      text('You chose to go against Tanner. Tanner will remember that.',260,40);
      frame_instruct();

    }else if(scene11 == true){
      image(scenes[8], 0, 0, 1000, 650);
      textFont('Georgia');
      text('You chose to give Tanner the benefit of the doubt. Tanner will remember that.',180,40);
      frame_instruct();
    }

  }


  if (mode == 12){
    frame_6();
    textFont('Georgia');
    textSize(27);
    fill(255);
    text(story[19], 400, 100, 500, 400);

    if (timer.count(10000)){
      frame_14();
    }

    if (timer.count(17000)){
      // This part is when the decision making makes an impact. These are the conditions that
      // will determine whether they win or lose
      if (hildie_sus == 1 && ben_sus == 1 && tanner_sus == 1 || hildie_sus == 1 && ben_sus == 1 || tanner_sus == 1 && ben_sus == 1){
      frame_lost();
        if(timer.count(25000)){
          clear(); // just to indicate that the game is over although I'm not sure how to actually stop the game.
        }
    } else {
        frame_14a(); // game just moves onto the next scene if they made the right choices
        hover_scene3();

      if(timer.count(47000)){
          textFont('Georgia');
          fill(255);
          textSize(18);
          text('You have 5 seconds remaining',380,20);
        }
        if (timer.count(52000)){
          mode += 1;
          timer.start = false;
        }

    }
    }
  }


  if (mode == 13){
    frame_15();

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

    if (timer.count(73000)){
      frame_25();
    }

    if (timer.count(80000)){
      frame_26();
    }

    if (timer.count(95000)){
      frame_27();
    }

    if (timer.count(115000)){
      frame_28();
    }

    if (timer.count(127000)){
      frame_29();
    }

    if (timer.count(147000)){
      frame_30();
    }

    if (timer.count(154000)){
      frame_31();
    }

    if (timer.count(161000)){
      frame_32();
    }

    if(timer.count(167000)){
      mode+=1;
    }
  }

  if (mode == 14){
    frame_33();
    decision_4();

    if (scene12 == true){
      frame_win();
    }else if (scene13 == true){
      frame_lost();
    }
  }
}


//---------------------------FUNCTIONS----------------------------//
function keyPressed(){
  if (keyCode === ENTER){
    mode += 1;
  }
}


function opening(){
  let txt = "The Last Snowfall";
  image(start, 0, 0, 1000, 650);
  fill(171,186,209,fade);
  textSize(18)
  text('an original short story by Nicholas Blincoe', 324, 375);
  textSize(14);
  text('Creative Coding final project by Janelle Algarra', 20, 630);
  textSize(22);
  text('press enter to begin', random(400,401), random(500,501));

  //Code from Shiver p5.js reference just for text style
  textSize(60);
  let txtH = 48;
  let txtW = textWidth(txt);
  let spacing = txtW / txt.length;

  for(let i = 0; i < txt.length; i++){
    let c = txt.charAt(i);// takes the individual letters of the string

    let offsetX = random(-spacing / 10.0, spacing / 10.0); //to make the letters uneven in both directions by dividing
    //the spacing which is the width of the text/length. Also makes it slightly overlapping
    let offsetY = random(-spacing / 10.0, spacing / 10.0);

    let startX = (width - txtW) / 2 + spacing / 2;
    let y = height / 2; //  + textHeight / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
}

function rules(){
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

  fill(0,0,0, 220);
  rect(80, 460, 840, 140, 20);
  textFont('Georgia');
  textSize(23);
  fill(255);
    text(story[0], 135, 500, 700, 100);
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

}

function frame_5(){
  image(scenes[3], 0, 0, 1000, 650);
}

function frame_5a(){
  image(q_hildie,0,0, 1000,650);
  textFont('Georgia');
  textSize(24);
  text(story[9], 70, 70, 400, 600);
}

function frame_6(){
  image(winter, 0, 0, 1000, 650);
}

function frame_7(){
  cursor(ARROW);
  textFont('Georgia');
  image(scenes[4], 0, 0, 1000, 650);
  textSize(21);
  fill(0,0,0,220);
  rect(100, 460, 350, 140, 20);
  fill(255);
  text(story[10], 130, 500,300,200);

  textFont(f);
  textSize(35);
  text("hey Ben!", random(350,352), 200);
}

function frame_8(){
  image(scenes[5], 0, 0, 1000, 650);
  textSize(23);
  fill(255);
  text(story[11], random(100,102), 50, 780, 100);
}

function frame_9(){
  image(scenes[5], 0, 0, 1000, 650);
  textFont('Georgia');
  textSize(19);
  fill(0,0,0,220);
  rect(80, 460, 840, 140, 20);
  fill(255);
  text(story[12], 110, 495, 780, 100);
  textFont(f);
}

function frame_10(){
  image(scenes[6], 0, 0, 1000, 650);
  textSize(22);
  fill(0,0,0,220);
  rect(400, 300, 300, 200, 20);
  fill(255);
  textFont('Georgia');
  text(story[14], 430, 320, 250, 170);
  textFont(f);
  textSize(30);
  text('"Oh hey Betsy!"', random(290,292), 100);
}

function frame_11(){
  image(scenes[7], 0, 0, 1000, 650);
  textSize(20);
  fill(0,0,0, 220);
  rect(80, 460, 840, 140, 20);
  fill(255);
  text(story[15], 100, 500, 780, 100);
}

function frame_12(){
  image(woman, 0, 0, 1000, 650);
}

function frame_13(){
  image(scenes[8], 0, 0, 1000, 650);
  textSize(22);
  fill(255,255,255, 220);
  rect(600, 400, 300, 180, 20);
  fill(0,0,0);
  text(story[17], 630, 430, 250, 150);
  textFont(f);
  fill(255);
  textSize(30);
  text("I swear I didn't", random(120,122), 50);
  textSize(50);
  text("KILL", random(50,52), 190);
  text("HER", random(320,322), 190);

}

function frame_13a(){
  image(a_sheriff, 0, 0, 1000, 650);
  textFont('Georgia');
  textSize(30);
  fill(255);
  text(story[18], 60, 150, 380, 400);
}

function frame_14(){
  image(scenes[9], 0, 0, 1000, 650);
  textSize(20);
  fill(0,0,0, 220);
  rect(80, 460, 840, 140, 20);
  fill(255);
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
  textFont('Georgia');
  image(suspects, 0, 0, 1000, 650);
  textSize(25);
  fill(0,0,0);
  frameRate(10);
  text('Frank Tanner', random(60,63), random(100,105));
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));
  text('Hildie Johnson', random(780,783), random(140,145));

  textFont('Georgia');
  textSize(20);
  fill(0,0,0, 220);
  rect(80, 460, 840, 140, 20);
  fill(255);
  text(story[23], 113, 505, 780, 100);

}

function frame_16(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  fill(0,0,0);
  textFont('Georgia');
  text('Hildie Johnson', random(780,783), random(140,145));
  textFont(f);
  textSize(21);
  fill(165,205,142, 220);
  rect(720, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[24], 740, 420, 200, 150);
}

function frame_17(){
  image(ben_flossie, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));

  textFont(f);
  textSize(20);
  fill(255,255,255, 220);
  rect(250, 460, 500, 140, 20);
  fill(0,0,0);
  text(story[25], 280, 490, 460, 100);
}

function frame_18(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Hildie Johnson', random(780,783), random(140,145));

  textFont(f);
  textSize(21);
  fill(165,205,142, 220);
  rect(720, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[26],  750, 430, 200, 150);
}

function frame_19(){
  image(hildie_tanner, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Frank Tanner', random(60,63), random(100,105));
  text('Hildie Johnson', random(780,783), random(140,145));

  textFont(f);
  textSize(19);
  fill(192,192,192, 220);
  rect(60, 400, 250, 200, 20);
  fill(0);
  text(story[27],  90, 430, 200, 150);
}

function frame_20(){
  image(ben, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Ben Abott', random(360,363), random(130,135));

  textFont(f);
  textSize(21);
  fill(255,178,102, 220);
  rect(300, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[28], 330, 430, 200, 150);
}

function frame_21(){
  image(ben, 0, 0, 1000, 650);

  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[29], 115, 490, 780, 100);
}

function frame_22(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Hildie Johnson', random(780,783), random(140,145));

  textFont(f);
  textSize(21);
  fill(165,205,142, 220);
  rect(720, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[30], 740, 450, 200, 150);
}

function frame_23(){
  image(flossie, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Flossie Jones', random(515,518), random(160,165));

  textFont(f);
  textSize(17);
  fill(226,204,255, 220);
  rect(460, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[31], 480, 430, 200, 160);

}

function frame_24(){
  image(flossie, 0, 0, 1000, 650);

  textSize(20);
  fill(255,255,255, 220);
  rect(80, 460, 840, 140, 20);
  fill(0,0,0);
  text(story[32], 115, 485, 780, 100);
}

function frame_25(){
  image(flossie, 0, 0, 1000, 650);
  textSize(25);
  text('Flossie Jones', random(515,518), random(160,165));

  textFont(f);
  textSize(20);
  fill(226,204,255, 220);
  rect(460, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[33], 480, 430, 200, 160);
}

function frame_26(){
  image(flossie, 0, 0, 1000, 650);
  textFont('Georgia');
  textSize(20);
  fill(0,0,0, 220);
  rect(150, 60, 840, 140, 20);
  fill(255);
  text(story[34], 170, 80, 780, 100);
}

function frame_27(){
  image(ben_flossie, 0, 0, 1000, 650);
  textSize(25);
  fill(0);
  textFont('Georgia');
  text('Ben Abott', random(360,363), random(130,135));
  text('Flossie Jones', random(515,518), random(160,165));

  textFont(f);
  textSize(16.5);
  fill(255,255,255, 220);
  rect(250, 440, 500, 140, 20);
  fill(0,0,0);
  text(story[35], 280, 460, 460, 100);
}

function frame_28(){
  image(hildie, 0, 0, 1000, 650);
  textSize(25);
  textFont('Georgia');
  text('Hildie Johnson', random(780,783), random(140,145));

  textFont(f);
  textSize(20);
  fill(165,205,142, 220);
  rect(720, 400, 250, 200, 20);
  fill(0,0,0);
  text(story[36], 740, 430, 200, 150);
}

function frame_29(){
  image(suspects, 0, 0, 1000, 650);
  textFont('Georgia');
  textSize(19);
  fill(0,0,0, 220);
  rect(150, 60, 840, 140, 20);
  fill(255);
  text(story[37], 180, 80, 780, 100);
}

function frame_30(){
  image(narrator, 0, 0, 1000, 650);

  textSize(20);
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
    let y = height / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }

}


function frame_lost(){
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
    let y = height / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
}

function frame_win(){
  image(win,0,0,1000,650);
  textSize(43);
  fill(255,255,255);
  textFont(f_2);
  text(story[41], 20, 20, 960, 630);
}

function frame_instruct(){
   fill(0,0,255);
   rect(400,600, 210, 40, 10);
   textFont('Georgia');
   fill(255);
   textSize(18);
   text('press enter to continue',414,626);
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


//-----------CODES FOR INTERACTIONS----------------------------------//
function decision_1(){
  textSize(30);
  fill(0,188,255);
  rect(random(150,152),random(450,452),250,80,25);
  fill(0,154,210);
  rect(random(590,592),random(450,452),250,80,25);
  fill(255);
  textFont(f);
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
  textSize(23);
  fill(0,188,255);
  rect(random(150,152),random(450,452),250,80,25);
  fill(0,154,210);
  rect(random(590,592),random(450,452),250,80,25);
  fill(255);
  textFont(f);
  text('SUSPECT TANNER',168,500);
  text("DON'T ANSWER",620,500);

}

function decision_4(){
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





let mailOpen, mailOpenA,mailOpenB, mailOpenC, yes,no, talk, body,sheriff, hildie_q, forensic1, forensic2;

//Decorative elements for the scenes. Not the actual interactions. Chose to leave the hard numbers as is for this part.
//however, I editted them in the actual interactions

function click_scene1(){
  mailOpen = mouseX > 639 && mouseX < 813 && mouseY > 500 && mouseY < 600;

  if (mailOpen) {
    noStroke();
    fill(255,128,0);
    textSize(16)
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
    textSize(18);
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

//-------------------------------ACTUAL INTERACTIONS----------------------------//

//exact coordinates are written in comments. However, changed the plotting so that it can be compared to the
// width and height of the user's computer screen now.

function hover_scene1(){
  //340, 470, 317, 391
  mailOpenA = mouseX > width/3 && mouseX < width/2 && mouseY > height/2 && mouseY < height/1.5;
  //239,357,188,293
  mailOpenB = mouseX > width/4 && mouseX < width/3 && mouseY > height/4 && mouseY < height/2.2;
  //513, 649, 367, 448
  mailOpenC = mouseX > width/2 && mouseX < width/1.5 && mouseY > height/2 && mouseY < height/1.5;

  if (mailOpenA) {
    textFont('Georgia');
    fill(0,0,0,220);
    rect(80, 400, 360, 150, 20);
    textSize(19);
    fill(255);
    text(story[2], 115, 430, 310, 300);
    fill(255,255,0);
    textFont(f);
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  } else if (mailOpenB) {
    textFont('Georgia');
    fill(0,0,0,220);
    rect(300, 30, 360, 170, 20);
    textSize(19);
    fill(255);
    text(story[3], 330, 45, 310, 300);
    fill(255,255,0);
    textFont(f);
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  } else if (mailOpenC) {
    textFont('Georgia');
    fill(0,0,0,220);
    rect(600, 150, 360, 200, 20);
    textSize(19);
    fill(255);
    text(story[4], 630, 170, 310, 300);
    fill(255,255,0);
    textFont(f);
    text('hover to reveal',mouseX,mouseY)
    //cursor(HAND)
  }
}

function hover_scene2(){
  //124,850,200,450
  body = mouseX > width/8 && mouseX < width/1.2 && mouseY > height/3 && mouseY < height/1.5;

  if (body) {
    textFont('Georgia');
    textSize(21);
    fill(0,0,0, 220);
    rect(80, 60, 600, 200, 20);
    fill(255);
    text(story[16], 113, 80, 540, 180);
    textFont(f);
    fill(255,255,51);
    text('hover to reveal',mouseX,mouseY)
  }

}

function hover_scene3(){
  //280,364,216,286
  forensic1 = mouseX > width/3.5 && mouseX < width/2.7 && mouseY > height/3 && mouseY < height/2.3;
  //627,712,431,500
  forensic2 = mouseX > width/1.6 && mouseX < width/1.4 && mouseY > height/1.5 && mouseY < height/1.3;

  if (forensic1) {
    textSize(22);
    fill(0,0,0, 220);
    rect(50, 80, 180, 170, 20);
    fill(255);
    textFont('Georgia');
    text(story[21], 70, 110, 140, 200);
    fill(0,0,0);
    textFont(f);
    textSize(15);
    text('hover to reveal',mouseX,mouseY)
  } else if (forensic2){
    textSize(19);
    fill(0,0,0, 220);
    rect(750, 100, 200, 350, 20);
    fill(255);
    textFont('Georgia');
    text(story[22], 770, 120, 150, 400);
    fill(0,0,0);
    textFont(f);
    textSize(15);
    text('hover to reveal',mouseX,mouseY)
  }

}



function mousePressed(){
  if (mode==3){
    //639, 813, 500, 600
    if (mouseX > width/1.57 && mouseX < width/1.23 && mouseY > height/1.3 && mouseY < height/1.08){
      scene1 = true;
      //print('clicked');
    }
    //print(mouseX, mouseY);
  }

  if (mode == 4){
    //630,786,69,648
    if (mouseX > width/1.6 && mouseX < width/1.27 && mouseY > height/9.5 && mouseY < height){
      scene8 = true;
    }
  }

  if (mode==5){
    //151,402,452,531
    if (mouseX > width/6.5 && mouseX < width/2.5 && mouseY > height/1.44 && mouseY < height/1.22){
      scene4 = true;
      //hildie is suspicious
      hildie_sus +=1; // variable that when added up may change the course of the game
      print(hildie_sus);
    }else if(mouseX > 551 && mouseX < 800 && mouseY > 452 && mouseY < 531){
      scene5=true;
    }
  }

  if (mode == 7){
    //151,402,452,531
    if (mouseX > width/6.5 && mouseX < width/2.5 && mouseY > height/1.45 && mouseY < height/1.22){
      scene6 = true;
    }
    //551,800,452,531
    else if(mouseX > width/1.8 && mouseX < width/1.25 && mouseY > height/1.45 && mouseY < height/1.22){
      scene7=true;
      //Ben is suspicious
      ben_sus +=1; // variable that when added up may change the course of the game
      print(ben_sus);
    }
  }

  if (mode == 10){
    //619,767,76,648
    if (mouseX > width/1.62 && mouseX < width/1.3 && mouseY > height/8.5 && mouseY < height){
      scene9 = true;
    }
  }

if (mode == 11){
  //151,402,452,531
    if (mouseX > width/6.7 && mouseX < width/2.5 && mouseY > height/1.44 && mouseY < height/1.22){
      scene10 = true;
      //Tanner is suspicious
      tanner_sus +=1; // variable that when added up may change the course of the game
      print(tanner_sus);
    }
  //551,800,452,531
  else if(mouseX > width/1.8 && mouseX < width/1.25 && mouseY > height/1.44 && mouseY < height/1.23){
      scene11=true;
    }
  }

  if (mode == 14){
    //731,880,502,551
    if (mouseX > width/1.37 && mouseX < width/1.14 && mouseY > height/1.3 && mouseY < height/1.18){
        scene12 = true;
      }
    //135,278,502,551
    //337,474,502,551
    //536, 676, 502,551
    else if ((mouseX > width/7.5 && mouseX < width/3.6 && mouseY > height/1.3 && mouseY < height/1.18) || (mouseX > width/3 && mouseX < width/2.11 && mouseY > height/1.3 && mouseY < height/1.18) || (mouseX > width/1.87 && mouseX < width/1.48 && mouseY > height/1.3 && mouseY < height/1.18)){
        scene13 = true;
      }
}
}

// Code made in collaboration with a friend
class Timer {
    constructor() {
        this.start = false; // variable used as a placeholder. otherwise timer wil always = millis()
//use to set timer = millis(), then later on make it false so it stops setting timer to the millis()
        this.time = 0; //used to store the current time

    }
    count(ms) { // ms will be the number of milliseconds we want to run it for (the interval)
        if(this.start == false) {
            this.time = millis() // to store the time elapsed as it begins
            this.start = true;
        }
        else {
            if(millis() - this.time > ms) { // to see whether the current running time minus the last previous time is greater than the interval we set for its run
                return true; // because if its greater, it means the interval (ms) has completed its run
            }
            else {
                return false; // reintialize the process
            }
        }
    }
}
