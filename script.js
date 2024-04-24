var player = "X";
let winnerMassge = document.getElementById("winner");
let button = document.getElementById("restart");
let end = document.getElementById("end");
var places;
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
var mouseoverBool = false;
var mouseHoverBool = false;
var win = false;

button.addEventListener('click',()=>{
    button.style.display = "none";
    winnerMassge.style.display = "none";
    end.style.display = "none";
    places.forEach(function(place){
        place.textContent = "";
    })
})

function draw(){
    var ret = Array.from(places).every((place)=>{
        return place.textContent != "";
    })
    return ret;
}

function endGame() {
    if (win) {
        winnerMassge.textContent = 'O jogador "' + player + '" ganhou!';
    }else{
        winnerMassge.textContent = "Jogo empatado!";
    }
    mouseoverBool = false;
    mouseHoverBool = false;
    win = false;
    player = "X";
    winnerMassge.style.display = "inline-block";
    button.style.display = "inline-block";
    end.style.display = "flex";
}

function checkWinner(player){
    return winningCombination.some((combination)=>{
        return combination.every((index)=>{
            return places[index].textContent == player;
        })
    })
}

var eventClickCallBack = function (event) {
    if(winnerMassge.textContent != "")
        winnerMassge.textContent = ""; 
    if (mouseHoverBool) {
        mouseHoverBool = false;
        event.target.textContent = player;
        win = checkWinner(player);
        if(win || draw()){
            endGame();
        }else{
            player = (player == "X")? "O" : "X";
        }
        
        
    }else{
       alert("Já ocupado");
    }
}
var eventHoverCallBack = function (event){
    if (event.target.textContent == '') {
        event.target.textContent = player;
        mouseoverBool = true;
        mouseHoverBool = true;
    }else{
        mouseoverBool = false;
        mouseHoverBool = false;
    }
}

var eventHoverOutCallBack = function (event) {
    if (mouseoverBool && mouseHoverBool) {
        event.target.textContent = '';
        mouseoverBool = false;
    }
}
places = document.querySelectorAll(".cell");
places.forEach(function(place){
    place.addEventListener('click', eventClickCallBack);
    place.addEventListener('mouseover', eventHoverCallBack);
    place.addEventListener('mouseout', eventHoverOutCallBack);
})

