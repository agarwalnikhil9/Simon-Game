//alert("hello");
var gamePattern = [];
var userPattern = [];
var btnColors = ["red","green","yellow","blue"];
var level = 0;

function playSound(name){
  if(name=="wrong"){
    var audio  = new Audio("sounds/wrong.mp3");
    audio.play();
  }
  else{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function nextSequence(){
  var randnum = Math.floor(Math.random()*4);
  var randColor = btnColors[randnum];
  gamePattern.push(randColor);
  $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randColor);
  level++;
  $("h1").text("Level " + level);
}

function checkPattern(){
  return userPattern[userPattern.length-1]==gamePattern[userPattern.length-1]
}

$(".btn").click(function(){
  if(level){
    var btnid = $(this).attr("id");
    $("#" + btnid).fadeIn(100).fadeOut(100).fadeIn(100);
    userPattern.push(btnid);
    animatePress(btnid);
    var check =  checkPattern();
    if(!check){
      playSound("wrong");
      $("h1").text("Game Over, Your score is " + (level - 1) + "  Press any key to Restart");
      userPattern = [];
      gamePattern = [];
      level = 0;
    }
    else if(check && userPattern.length==gamePattern.length){
      userPattern = [];
      nextSequence();
    }
  }
});

function animatePress(color){
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  },100);
}
$(document).keypress(function(event){
  if(level==0) {
    nextSequence();
  }
});
