var musics = [
    {title: 'Blue Bird',
    Artist: 'Naruto Shippuden',
    src:'musics/Blue Bird - Naruto Shippuden.mp3',
    img:'images/4.png'},
    
    {title: 'Dust In The Wind',
    Artist: 'Scorpions',
    src:'musics/Dust In The Wind - Scorpions.mp3',
    img:'images/1.jpg'},

    {title: 'Scar Tissue',
    Artist: 'Red Hot Chili Peppers',
    src:'musics/Scar Tissue -Red Hot Chili Peppers.mp3',
    img:'images/3.jpg'},

    {title: 'Será',
    Artist: 'Legião Urbana',
    src:'musics/Será - Legião Urbana.mp3',
    img:'images/2.jpg'},

    {title: 'Sweet Child O\' Mine',
    Artist: 'Guns N\' Roses',
    src:'musics/Sweet Child O\' Mine - Guns N\' Roses.mp3',
    img:'images/3.jpg'}
  
 
]

let music = document.querySelector('audio');
let image = document.querySelector('img');
let totalTime = document.querySelector('.finish');
let nameMusic = document.querySelector('.description h2');
let nameArtist = document.querySelector('.description i');
let indexMusic = 0;


renderMusic(indexMusic);

document.querySelector('.play').addEventListener('click', playMusic);
document.querySelector('.pause').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', progressMusic)
  
document.querySelector('.arrow-back').addEventListener('click', ()=>{
    indexMusic--;
    if (indexMusic < 0){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

document.querySelector('.arrow-next').addEventListener('click', ()=>{
    indexMusic++;
    if (indexMusic > musics.length){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

function renderMusic(index){
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', ()=>{
        image.src = musics[index].img;
        nameMusic.textContent = musics[index].title;
        nameArtist.textContent = musics[index].Artist;
        if(document.querySelector('.pause').style.display == 'block'){
            music.play();
        }
        progressMusic()
    })
}


function playMusic(){
    music.play();
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.play').style.display = 'none';
    
}

function pauseMusic(){
    music.pause();
    document.querySelector('.pause').style.display = 'none';
    document.querySelector('.play').style.display = 'block';
}

function progressMusic(){
    let bar = document.querySelector('progress');
    let elapsedTime = document.querySelector('.start');

    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    elapsedTime.textContent = indentTime(Math.floor(music.currentTime));
    totalTime.textContent = indentTime(Math.floor(music.duration));

    if(  elapsedTime.textContent == totalTime.textContent){
        
        indexMusic++;
    if (indexMusic > musics.length){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
    }
}


function indentTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    if (seconds < 10){
        seconds = '0' + seconds;
    }

    return minutes+':'+seconds;
}

