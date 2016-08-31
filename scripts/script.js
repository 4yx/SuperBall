
if (window.addEventListener) 
  window.addEventListener('load', eventWindowLoaded, false);
else 
	alert("O_O!! check if your browser supports EventListener !! y're using legacy Browser !")

//--------------------------------------Declare_Variables-------------------------------------------//
 var numBalls = 3 //Include Player Ball
   , maxSize = 20
   , minSize = 5
   , maxSpeed = maxSize+5
   , ball
   , tempBall
   , tempX
   , tempY
   , tempSpeed
   , tempAngle
   , tempRadius
   , tempRadians
   , tempvelocityx
   , tempvelocityy
   , balls = new Array()
   , paused=false
   , score=0,level=1,levelupRate=2,percentHealth=100
   , playerIndex=0
   , Game ;
     //-----------------------------------Color Contoler---------------------------------------------//
  document.body.style.backgroundColor = "#455A64"; //backgroundPage
  var backgroundBox = "#607D8B"
  ,   boxBorderColor = "#05647a"
  ,   playerBallColor = "#0198E1";

//--------------------------------------Canvas Initial Variables---------------------------------------------//

   var theCanvas = document.getElementById("ballContainer");
   var context = theCanvas.getContext("2d"); 

   

function eventWindowLoaded() {

       canvasApp();
}

function canvasApp() {

    if (!canvasSupport()) {
        return;
        }
    function canvasSupport () {
     return Modernizr.canvas;
      }    

 Game = new GameInterval(drawScreen, 33);

function GameInterval(drawingFun, frametime) {
    var timer = false;
    this.start = function () {
        if (!this.isRunning())
            timer = setInterval(drawingFun, frametime);
    };
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = function () {
        return timer !== false;
    };
}


  // ---------------------------------------Create Balls--------------------------------------- //

  for (var i = 0; i < numBalls; i++) {
   		AddBall();
	}
  PlayerBallProperties();

	function AddBall(){
      tempRadius = Math.floor(Math.random()*maxSize)+minSize;
      var placeOK = false;
      while (!placeOK) {
         tempX = tempRadius*3 + (Math.floor(Math.random()*theCanvas.width )-tempRadius*3);
         tempY = tempRadius*3 + (Math.floor(Math.random()*theCanvas.height)-tempRadius*3);   
         tempSpeed = maxSpeed-tempRadius;
         tempAngle = Math.floor(Math.random()*360);
         tempRadians = tempAngle * Math.PI/ 180;
         tempvelocityx = Math.cos(tempRadians) * tempSpeed;
         tempvelocityy = Math.sin(tempRadians) * tempSpeed;

         tempBall = {
                    x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed, angle:tempAngle, 
                    velocityx:tempvelocityx, velocityy:tempvelocityy, mass:tempRadius*8, 
                    nextx: tempX, nexty:tempY,ballColor:getRGBColor()
                    };
         placeOK = canStartHere(tempBall);          
         }
      
      balls.push(tempBall);
   }   

   function PlayerBallProperties(){
    balls[playerIndex].velocityx=1;
        balls[playerIndex].velocityy=1;

    balls[playerIndex].ballColor=playerBallColor;
   }

  function canStartHere(ball) {
      var retval = true;
      for (var i = 0; i <ball.length; i++) {
         if (hitTestCircle(ball, balls[i])) {
            retval = false;
          }
          //player StartHere
         if(retval && i==playerIndex){
          PlayerBallProperties();
            if(ball[i].tempX-theCanvas.width+ball[i].tempRadius<500 ||
             ball[i].tempY-theCanvas.height+ball[i].tempRadius<500 ||
              ball[i].tempX-ball[i].tempRadius<500 || ball[i].tempY-ball[i].tempRadius<500)
              
               retval=false;
          }
      }
      return retval;
  }
 
 drawScreen();
 canvasPieTimer.init(50, "canvaspietimer", "pietimerholder");

  // ---------------------------------------Game Mechanicanism--------------------------------------- //

// var backgroundX = new Image();
// backgroundX.src = "../images/nebula.jpg";
  function drawScreen () {	
      // Box Background
      context.drawImage(document.getElementById('backgroundBoxy'),
               0,0,$("#ballContainer").width(),$("#ballContainer").height());
      // context.fillStyle = backgroundBox;
      // context.fillRect(0, 0, theCanvas.width, theCanvas.height);

      // Box Border
      context.strokeStyle = boxBorderColor;
      context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);    
 
      update();     
      testWalls();
      collide();      
      render();
   }

   function update() {
   	updateScoreLevelHealth();
      for (var i = 0; i <balls.length; i++) {
         ball = balls[i];
         ball.nextx = (ball.x += ball.velocityx);
         ball.nexty = (ball.y += ball.velocityy);
      }
   }

function testWalls() {
      var testBall;
      for (var i = 0; i <balls.length; i++) {
         ball = balls[i];

         if(i==playerIndex && (ball.nextx+ball.radius > theCanvas.width || ball.nextx-ball.radius < 0 || 
          ball.nexty+ball.radius > theCanvas.height || ball.nexty-ball.radius < 0)) {

              GameOver();
              continue;
            }
         if (ball.nextx+ball.radius > theCanvas.width) {
        
            ball.velocityx = ball.velocityx*-1;
            ball.nextx = theCanvas.width - ball.radius;

         } else if (ball.nextx-ball.radius < 0 ) {
          
            ball.velocityx = ball.velocityx*-1;
            ball.nextx = ball.radius;

         } else if (ball.nexty+ball.radius > theCanvas.height) {
             
            ball.velocityy = ball.velocityy*-1;
            ball.nexty = theCanvas.height - ball.radius;

         } else if(ball.nexty-ball.radius < 0) {
         
            ball.velocityy = ball.velocityy*-1;
            ball.nexty = ball.radius;
         }
      }
   }

function render() {
      for (var i = 0; i <balls.length; i++) {
         ball = balls[i];
         ball.x = ball.nextx;
         ball.y = ball.nexty;
         context.beginPath();
         context.fillStyle = ball.ballColor;
         context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
         context.closePath();
         context.fill();

         //render Health
          if(i==playerIndex) {
            context.beginPath();
            drawHealthCircle(ball.x,ball.y,ball.radius,ball.angle,percentHealth,ball.ballColor);
         }
      }
   }

   function collide() {
       var testBall;
       for (var i = 0; i <balls.length; i++) {
          ball = balls[i];
          for (var j = i+1; j < balls.length; j++) {
            testBall = balls[j];

            if (hitTestCircle(ball,testBall)) {
              if(j==playerIndex || i == playerIndex)
              {
                percentHealth-=25;
                if(percentHealth==0)
                {    
                  GameOver();
                 	continue;
                }
              } 
              collideBalls(ball,testBall);   
            }
          }
        }
     }

   function hitTestCircle(ball1,ball2) {
       var retval = false;
       var dx = ball1.nextx - ball2.nextx;
       var dy = ball1.nexty - ball2.nexty;
       var distance = (dx * dx + dy * dy);
       if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius) ) {
              retval = true;
        }
        return retval;
     }

   function collideBalls(ball1,ball2) {

      var dx = ball1.nextx - ball2.nextx;
      var dy = ball1.nexty - ball2.nexty;

      var collisionAngle = Math.atan2(dy, dx);

      var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + 
          ball1.velocityy * ball1.velocityy);
      var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx + 
          ball2.velocityy * ball2.velocityy);

      var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
      var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);

      var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
      var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
      var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
      var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

      var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + 
          (ball2.mass + ball2.mass) * velocityx_2)/(ball1.mass + ball2.mass);
      var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + 
          (ball2.mass - ball1.mass) * velocityx_2)/(ball1.mass + ball2.mass);

      var final_velocityy_1 = velocityy_1;
      var final_velocityy_2 = velocityy_2;

      ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 + 
          Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
      ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 + 
          Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
      ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 + 
          Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
      ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 + 
          Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

      ball1.nextx = (ball1.nextx += ball1.velocityx);
      ball1.nexty = (ball1.nexty += ball1.velocityy);
      ball2.nextx = (ball2.nextx += ball2.velocityx);
      ball2.nexty = (ball2.nexty += ball2.velocityy);
   }
  // ---------------------------------------Head Status--------------------------------------- //

function updateScoreLevelHealth(){  
    score+=.01;
	$("#Score").text(Math.floor(score));
	$("#Level").text(level);

	if(Math.floor(score) == levelupRate){
          levelupRate+=levelupRate;
          score+=1;
          level+=1;
          numBalls+=1; 
          if(score===50 && percentHealth<=75)percentHealth+=25;     
          AddBall();
      }
}

  // ---------------------------------------Health Circle-------------------------------------- //
var deltaAngle =5;

function drawHealthCircle(x,y,radius,angle,percent,ballColor){
	deltaAngle+=5;
	angle += deltaAngle;

    context.globalAlpha =0.95;
    context.lineWidth = 2;
    //backgroundHealth when hit
    context.beginPath();    
    context.strokeStyle =ballColor;
    context.arc(x,y, Math.abs(radius-10), rad(angle), percentToRad(100), false);
    context.stroke();
    
    //HealthBar
    context.beginPath();
    context.strokeStyle = "red";
    context.arc(x, y, Math.abs(radius-10), rad(angle), percentToRad(percent), false);
    context.stroke();
    
    
  function rad(deg){
    return (Math.PI/180)*deg;
    }

  function percentToRad(percent){
    return rad(angle) + rad ((360 * percent) / 100);
    }
   if(deltaAngle===10000)deltaAngle=5;

  }
  // ---------------------------------------Helper Functions-------------------------------------- //

function getRGBColor() {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
}

}
