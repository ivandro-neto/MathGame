let correctAnswer;
let btn
let secCounter= document.getElementById("secCounter")
let playing = false;
let score = 0;

/*
let accepted = false;

if(checkCookie("accepted") == false){
    setCookie("accepted",accepted);
}else{

    alert(document.cookie)
    accepted = getCookie("accepted");
    if(accepted == false){
        let answer = confirm("We use Cookies for highScore system. Accept our cookies for best experience")
        if(answer == true){
            accepted = true;
            setCookie("accepted",accepted) ;
            document.cookie += "highScore=15;"
        }else{
            accepted = false;
            setCookie("accepted",accepted) ;
            }
            
}
}*/


function generateQA(){
    
        
        let x = 1+ Math.round(9*Math.random());
        let y = 1+ Math.round(9*Math.random());
        correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    let answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            let wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            
        }
    }
}
function verification(showTimer,counter){
    if(showTimer == true){
        document.getElementById("timeremaining").style.display = "block";
        setInterval( function(){
            secCounter.innerHTML =counter; 
            changeColor(counter);
            
            if (counter <= 0) {
                counter=0;
                document.getElementById("gameOver").style.display= 'block';
                document.getElementById("gameOver").innerHTML= `<p>Game Over</p><p>Your score: ${score}</p>`
            }else{

                counter--;
            }
        },1000);
    
        }else{
        document.getElementById("timeremaining").style.display = 'none';
    }
}
function changeColor(counter){
    if (counter >= 21) {
        document.getElementById("timeremaining").style.backgroundColor = 'rgba(0, 182, 0, 0.6)';
    }else{
        if (counter <= 20 && counter >= 11) {
            document.getElementById("timeremaining").style.backgroundColor = 'rgba(182, 179, 0, 0.6)';
        }
        else{
            document.getElementById("timeremaining").style.backgroundColor = 'rgba( 245, 0, 0, 0.6)';
        }
    }
}
//if we click on the start/reset button
document.getElementById("startreset").addEventListener("click", () => {
    let showTimer = false;
    let count = 60;
    //if we arae playing

    
    if(playing == true){
        location.reload();
        showTimer =false;
    }else{
        document.getElementById("startreset").innerHTML = "Reset Game";
        showTimer = true;
        playing = true;
        generateQA(); 
        verification(showTimer, count);
    }
})

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}
for(let i=1; i<5; i++){
    
    document.getElementById("box"+i).onclick = () =>{
    //check if we are playing     
    
        if(playing == true){//yes
            if(document.getElementById("box"+i).innerHTML == correctAnswer){
                //correct answer
            
                //increase score by 1
                if(document.getElementById("gameOver").style.display != 'block')
                    score++;
                else
                    score = score
                document.getElementById("scoreValue").innerHTML = score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                hide("correct");   
                }, 1000);
            
                //Generate new Q&A
            
                generateQA();
            }else{
                //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
                }, 1000);
            }
        }
    }   
}


