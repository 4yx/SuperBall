function changeImageStatus() {
    document.getElementById("playAndpause").classList.toggle('playing'); 
    if(paused)
      $('#textStatus').text("Played"); 
    else
      $('#textStatus').text("Paused"); 
  }

function pauseGame(){
    changeImageStatus();   
    if(!paused){
       paused=true;
       Game.stop();
    }
    else{
      paused=false;
      canvasPieTimer.init(50, "canvaspietimer", "pietimerholder");
    }

    setTimeout(function(){ $('#textStatus').text(""); } ,1000);
  }

function GameOver(){
    $("#textStatus").text("GameO");
    alert("GAMEOVER");
    RestartGame();
  }
function RestartGame(){
    $('#textStatus').text("Restarting");
    window.location.reload();
  }
