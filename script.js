// initialise the variable
let songIndex =0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Get Up & Sing",songPath:"1.mp3",coverPath:"1.jpg"},
    {songName:"In your Dreams",songPath:"2.mp3",coverPath:"2.jpg"},
    {songName:"Missing Someone",songPath:"3.mp3",coverPath:"3.jpg"},
    {songName:"October",songPath:"4.mp3",coverPath:"4.jpg"},
    {songName:"Shinning sky",songPath:"5.mp3",coverPath:"5.jpg"},
    {songName:"Numb",songPath:"6.mp3",coverPath:"6.jpg"},
    {songName:"Prison Castle ",songPath:"7.mp3",coverPath:"7.jpg"},
    {songName:"Morning Mist",songPath:"8.mp3",coverPath:"8.jpg"},
    {songName:"Reality",songPath:"9.mp3",coverPath:"9.jpg"},
    {songName:"Catching Vibes",songPath:"10.mp3",coverPath:"10.jpg"},

]


songItem.forEach((element, i) => {
    // console.log(element , i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
});



// play / pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity =0;
    }
})


// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    

    // update seekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress ;

    progressBar.addEventListener('change', ()=>{
        // we make it by using L.H.S. = R.H.S. from above formula & logic
        audioElement.currentTime = progressBar.value * audioElement.duration/100;
    })

})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{       
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        // e is the button on which we clicked

        makeAllPlays();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');


        audioElement.src = `${songIndex +1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime =0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');


    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    gif.style.opacity =1;
    audioElement.src = `${songIndex +1}.mp3`;
    audioElement.currentTime =0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');

    masterSongName.innerText = songs[songIndex].songName;

})


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex -= 1;
    }
    gif.style.opacity =1;
    audioElement.src = `${songIndex +1}.mp3`;
    audioElement.currentTime =0;
    audioElement.play();
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');

    masterSongName.innerText = songs[songIndex].songName;
})