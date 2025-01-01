import React, {useState} from "react";
import styles from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from "../SearchBar/SearchBar";
import {Spotify}  from "../../util/Spotify/Spotify";
function App () {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'Trackskskks',
      artist: 'OneRepublic',
      album: 'Twenty One',
      id: 1
    },
    {
      name: 'Hehehehehe',
      artist: 'Keshi',
      album: 'Ballads',
      id: 2
    }
  ]);
  const [playlistName, setPlaylistName] = useState('default');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'Added name track 1',
      artist: 'Added artist track 1',
      album: 'Added album track 1',
      id: 3
    },
    {
      name: 'Added name track 2',
      artist: 'Added artist track 2',
      album: 'Added album track 2',
      id: 4
    }
  ]);
  function addTrack(track){
    const existingTrack = playlistTracks.find(t => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if(existingTrack){
      console.log('This track is already added');
    }
    else{
      setPlaylistTracks(newTrack);
    }
  }
  function removeTrack(track){
    const rmTrack = playlistTracks.filter(t => t.id !== track.id)
    setPlaylistTracks(rmTrack);
  }
  function updatePlaylistName(name){
    setPlaylistName(name);
  }
  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }
  function search(term){
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }
    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search}/>
          <div className={styles['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults 
              userSearchResults={searchResults} 
              onAdd={addTrack}  
            />
            {/* <!-- Add a Playlist component --> */}
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
        );
}

export default App;