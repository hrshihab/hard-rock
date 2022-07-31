// fetch("https://api.lyrics.ovh/suggest/baby")
// .then(res => res.json())
// .then(data => {
//     const lyrics = data
// });

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
  const inputData = document.getElementById("inputForm").value;
  document.getElementById("song-lyrics").innerText = "";
  fetch(`https://api.lyrics.ovh/suggest/${inputData}`)
    .then((res) => res.json())
    .then((data) => displaySong(data.data))
    .catch((error) =>
      displayError("Something went wrong!! Please try again later")
    );
});

const displaySong = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
                     <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead" >Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                    </audio

                     </div>
                     <div class="col-md-3 text-md-right text-center">
                     <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
                 </div>

                  `;
    songContainer.appendChild(songDiv);
  });

  // artist = songs.artist.name;
  // title = songs.title;
  //   document.getElementById('lyric-name').innerText=title;
  //   document.getElementById('artistName').innerText=artist;

  //   getLyrics(artist,title);
};

const getLyrics =async (artist, title) => {
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const res =await fetch(url)
    const data =await res.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    displayError("Sorry! I failed to load lyrics, Please try again later!!!");
  }
}



const displayLyrics = (lyrics) => {
  const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = "";
  lyricsDiv.innerText = lyrics;
};

const displayError = (error) => {
  const errorTag = document.getElementById("error-message");
  errorTag.innerText = error;
};
