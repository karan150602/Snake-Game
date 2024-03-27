const direction={x:0,y:0};
const foodsound=new Audio('soundss/food.mp3');
const gameover=new Audio('soundss/gameovr.mp3');
const movesound=new Audio('soundss/move.mp3');
const musicsound=new Audio('soundss/gamesound.mp3');
let speed =6;
let score=0;
let lastpainttime=0;
let snakeArr=[{
    x:13,y:15
}];
food={x:6,y:7};
let incspeed=0;



function main(ctime){
    window.requestAnimationFrame(main);
  //  console.log(ctime);
    
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
 

}
function iscollide(snake){
   //if you bump into yourself
   for (let i = 1; i < snakeArr.length; i++) {
   if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
    return true;
   }} 
   // if you bump into the wall
    if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0){
return true;
    }

}
function gameEngine(){
    //updating the snake array and food
if(iscollide(snakeArr)){
    gameover.play();
    musicsound.pause();
    inputDir={x:0,y:0};
    alert("press any key to play again!");
    snakeArr=[{
        x:13,y:15
    }];
    musicsound.play();
    score=0;

}
// if you have eaten the food increement the food and regenerate the food
if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
    foodsound.play();
    score +=1;
   
        if(score%5===0){
            speed+=1;
            console.log(speed);
        }
    
    if(score>hiscoreval){
        hiscor=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscorebox.innerHTML="hiscore:"+hiscoreval;
    
    }
    scorebox.innerHTML="score:"+score;
    snakeArr.unshift({x:snakeArr[0].x+ inputDir.x,y:snakeArr[0].y+ inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}
//moving the snake

for(let i=snakeArr.length - 2;i>=0;i--){
   
    snakeArr[i+1]={...snakeArr[i]} ;}
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //display the snake and food
    //display the snake
  board.innerHTML="";
    snakeArr.forEach((e,index )=> {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        
        snakeElement.style.gridColumnStart=e.x;
    
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');

    board.appendChild(foodelement);
}







//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscore));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="hiscore:"+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
  inputDir={x:0,y:1};//start the game
  movesound.play();
switch (e.key){
    case "ArrowUp":
    console.log("ArrowUp")
    inputDir.x=0;
    inputDir.y=-1;
    break;
    case "ArrowDown":
    console.log("ArrowDown")
    inputDir.x=0;
    inputDir.y=1;
    break;
    case "ArrowLeft":
    console.log("ArrowLeft")
    inputDir.x=-1;
    inputDir.y=0;
    break;
    case "ArrowRight":
    console.log("ArrowRight")
    inputDir.x=1;
    inputDir.y=0;
    break;
default:
    break;
}
});
