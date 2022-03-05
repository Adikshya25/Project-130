song1="";
song2="";

scoreLeftWrist=0;
scoreRightWrist=0;

statusSong1="";
statusSong2="";

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;




function preload(){
    song1= loadSound("MT.mp3");
    song2= loadSound("AJ.mp3");
}
function setup(){
    canvas= createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("Left wrist score- " + scoreLeftWrist);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("Right wrist score- " + scoreRightWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        
        console.log("Left wrist X- " + leftWristX + "Left wrist Y- " + leftWristY);
    
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
    
        console.log("Right wrist X- " + rightWristX + "Right wrist Y- " + rightWristY);
    }
}

function modelLoaded(){
    console.log("PoseNet is initialised!!");
}


function draw(){
    image(video, 0, 0, 600, 450);
    
    fill("FF0000");
    stroke("FF0000");

    statusSong1 = song1.isPlaying();
    statusSong2 = song2.isPlaying();

    if(scoreRightWrist>0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(statusSong2 == false) {
            song2.play();

            document.getElementById("stop").style.display="inline-block";
            document.getElementById("song_name").style.display="inline-block";

            document.getElementById("song_name").innerHTML= "Playing: Afghan Jalebi";
            document.getElementById("stop").innerHTML= "Stop";
        }
    }
    
    if(scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(statusSong1 == false) {
            song1.play();

            document.getElementById("stop").style.display="inline-block";
            document.getElementById("song_name").style.display="inline-block";

            document.getElementById("song_name").innerHTML= "Playing: Manali Trance";
            document.getElementById("stop").innerHTML= "Stop";
        }
    }
}
function stop(){
    song1.stop();
    song2.stop();
    document.getElementById("stop").style.display="none";
    document.getElementById("song_name").style.display="none";
    
    
}


