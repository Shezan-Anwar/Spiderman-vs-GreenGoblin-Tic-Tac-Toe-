let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let winmess = document.querySelector(".winn");
let newgamebtn = document.querySelector("#newgame") 
let count = 0;
let turnO=true;
const winCombo = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [2,4,6]
];
 goblinchn.classList.add("hideimg");
//  spiderchn.classList.add("hideimg");
boxes.forEach(box => {
    box.addEventListener("click" , () => {
        count++;
        if( count === 9){
            showDraw();
        }
        if(turnO){
            
            goblinchn.classList.remove("hideimg");
            box.innerText = "Spiderman";
            box.classList.add("web");
            turnO = false;
            spiderchn.classList.add("hideimg");
            
        }else{
            
            spiderchn.classList.remove("hideimg");
            box.innerText = "Goblin";
            box.classList.add("bomb");
            turnO=true;
            goblinchn.classList.add("hideimg");
            
        }
        box.disabled = true;

        checkWinner();
    })
});
 
const resetGame = () => {
    turnO = true ;
    enableBtns();
    winmess.classList.add("hide");
    count = 0 ;
    goblinchn.classList.add("hideimg");
    spiderchn.classList.remove("hideimg");

}

const disableBtns = () =>{
   for (let box of boxes){
    box.disabled=true;
   }
}
const enableBtns = () =>{
   for (let box of boxes){
    box.disabled=false;
    box.innerText="";
    box.classList.remove("web","bomb");
   }
}

const showWinner = (winner) => {
    msg.innerText = ` ${winner} won the match`;
    winmess.classList.remove("hide");
    goblinchn.classList.add("hideimg");
    spiderchn.classList.add("hideimg");
    disableBtns();
}

const checkWinner = () => {
    for ( let combo of winCombo){
        let pos1val = boxes[combo[0]].innerText;
        let pos2val = boxes[combo[1]].innerText;
        let pos3val = boxes[combo[2]].innerText;
        
        if (pos1val !="" && pos2val !="" && pos3val !="" ){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner",pos1val);
                showWinner(pos1val);
            }
        }
    }
}
const showDraw = () => {
    msg.innerText = "It's a DRAW";
    goblinchn.classList.add("hideimg");
    spiderchn.classList.add("hideimg");
    winmess.classList.remove("hide");
}
resetbtn.addEventListener("click", resetGame);
newgamebtn.addEventListener("click", resetGame);

const bgMusic = document.getElementById('bgmusic');
const muteBtn = document.getElementById('muteBtn');

bgMusic.volume = 0.3;
function startMusicOnInteraction() {
    bgMusic.play().catch(error => {
        console.log("Autoplay of bgmusic prevented", error);
    });
    document.removeEventListener('click', startMusicOnInteraction);
}
document.addEventListener('click', startMusicOnInteraction);
muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(bgMusic.paused){
        bgMusic.play();
        muteBtn.innerText="🎵 Mute";
    }else{
        bgMusic.pause();
        muteBtn.innerText = "🔇 Unmute";
    }
});