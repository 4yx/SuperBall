
//-------------------------------------Listeners-------------------------------------------//

  window.addEventListener('keydown',onKeyDown, false);
  document.getElementById("playAndpause").addEventListener("click", changeImageStatus);
  document.getElementById("RestartGame").addEventListener("click", RestartGame);
  document.addEventListener('keydown', arrowkeyCB, true);
  window.addEventListener('mousewheel',mousewheelCB,false); 


//-------------------------------------Key_Handles------------------------------------------//

 function mousewheelCB(event){
     event.preventDefault();
     event.stopPropagation();
     // if(e.originalEvent.wheelDelta > 0) {
     //        console.log('up 3');
     //    }
     //    else {
     //        console.log('down 3');
     //    }   
       balls[playerIndex].radius += event.wheelDelta/40; 
       if(ball[playerIndex].radius<11){
         balls[playerIndex].radius=11;
       }

       console.log(balls[playerIndex].radius);
  }

  function arrowkeyCB(event) {
     event.preventDefault();
     
     if (event.keyCode === 37 || event.keyCode === 65) {        // left arrow
      balls[playerIndex].velocityx = -12+balls[playerIndex].radius/20; 
      balls[playerIndex].velocityy = 0;
     } else if (event.keyCode === 39 || event.keyCode === 68) { // right arrow
      balls[playerIndex].velocityx = 12-balls[playerIndex].radius/20; 
      balls[playerIndex].velocityy = 0;
     } else if (event.keyCode === 38 || event.keyCode === 87) { // up arrow
      balls[playerIndex].velocityx = 0;
      balls[playerIndex].velocityy = -12+balls[playerIndex].radius/20;   
     } else if (event.keyCode === 40 || event.keyCode === 83) { // Down arrow
      balls[playerIndex].velocityx = 0; 
      balls[playerIndex].velocityy = 12-balls[playerIndex].radius/20;
     }
  }

  function onKeyDown(e) {
  if (e.keyCode == 32) pauseGame(); //press p to pause or play //R code:80||Space code:32
  if (e.keyCode == 82) RestartGame(); //press r to restart the whole page and game
}
