       // fetch("https://api.lyrics.ovh/suggest/baby")
                // .then(res => res.json())
                // .then(data => {
                //     const lyrics = data
                // });

                
                const searchBtn = document.getElementById('searchBtn');
                searchBtn.addEventListener('click',function(){
                    const inputData = document.getElementById('inputForm').value;
                    fetch(`https://api.lyrics.ovh/suggest/${inputData}`)
                    .then(res => res.json())
                    .then(data => {
                        displaySong(data.data);
                    
                      
                       })
                    })
            
               
              const displaySong = songs=>{
               const songContainer = document.getElementById('song-container');
               songContainer.innerHTML="";
               songs.forEach(song => {
                  const songDiv = document.createElement('div');
                  songDiv.className='single-result row align-items-center my-3 p-3';
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
              }

                function getLyrics(artist,title)
                {
                  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                  .then(res => res.json())
                  .then (data => {
                   
                     displayLyrics(data.lyrics)
                     //console.log(data.lyrics);
                     //document.getElementById("song-lyrics").innerText=data.lyrics;

                  })
                }

                const displayLyrics = lyrics => {
                  const lyricsDiv = document.getElementById("song-lyrics");
                  lyricsDiv.innerText = lyrics;

                }
 


          
     


         






















