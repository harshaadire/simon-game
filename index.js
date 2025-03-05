var color=["red","green","yellow","blue"];
var store=[];
var i=0;
var started=false;
var userPattern=[];
var currentlevel=0;
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function pattern()
{
    userPattern=[];
    i++;
    $("h1").text("level "+i);
    var random=Math.floor(Math.random()*4);
    var randomcolor=color[random];
    store.push(randomcolor);
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
}

$(".btn").click(function(){
    var userclick=$(this).attr("id");
    userPattern.push(userclick);
    playSound(userclick);
    animatePress(userclick);
    checking(userPattern.length-1);
});

function animatePress(CurrentColor)
{
    $("#" + CurrentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + CurrentColor).removeClass("pressed");
        
    }, 100);
}
$(document).on("keypress",function(event){
    if(!started)
    {
        $("h1").text("level "+i);
        pattern();
        started=true;
    }
});
function checking(currentlevel){
    if (currentlevel < 0 || currentlevel >= store.length) return;
    if(store[currentlevel]===userPattern[currentlevel])
    {
        console.log("sussces");
        if(store.length===userPattern.length)
        {
            setTimeout(() => {
                pattern();
            }, 1000);
        }
    }        
    else
    {
        console.log("fail");
        $('h1').text("Game Over, Press Any Key to Restart");
        var wa=new Audio("sounds/wrong.mp3");
        wa.play();
        $('body').addClass("game-over");
        setInterval(() => {
            $('body').removeClass("game-over");
        }, 200);
        store=[];
        userPattern=[];
        i=0;
        started=false;
    }
}

