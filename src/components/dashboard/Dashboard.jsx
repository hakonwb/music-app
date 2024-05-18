
import React, { useState } from 'react';

import { fetchSpotifyAPI } from '../../api/spotifyAPI';

const songs = [
    {
        name: "Bohemian Rhapsody - Queen",
        imageUrl: "https://tse4.mm.bing.net/th?id=OIP.vfXthIhP2W5rwL4CVLQnSQHaEs&pid=Api&P=0&h=180"
    },

    {
        name: "Stairway to Heaven - Led Zeppelin",
        imageUrl: "https://tse3.mm.bing.net/th?id=OIP.rQPVx7Cx137zwkvr2YeERgHaHQ&pid=Api&P=0&h=180"
    },
    {

        name: "Imagine - John Lennon",
        imageUrl: "https://tse1.mm.bing.net/th?id=OIP.2Xq79spKtODJ9NpIuQDZmgHaHa&pid=Api&P=0&h=180"
    },
    {
        name: "Hotel California - Eagles",
        imageUrl: "https://tse1.mm.bing.net/th?id=OIP.8Nzl7xCh7eoRIBuojyAEQAHaHX&pid=Api&P=0&h=180"
    },
    {
        name: "Sweet Child O' Mine - Guns N' Roses",
        imageUrl: "https://tse1.mm.bing.net/th?id=OIP.IRuEMQa6gTMvp620DeAAXwHaHa&pid=Api&P=0&h=180"
    }
];


function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');

    const [form, setform] = useState({
        search: '', artist: ''
    })

    const [results, setResults] = useState('');

    const [type, setType] = useState('')

    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Input Search:', searchTerm);
            event.preventDefault(); // Prevent the default action to avoid form submission
        }
    }
    const types= [
        "album", "artist", "playlist", "track", "show", "episode", "audiobook"
    ]
    
    const HandleSelectChange = (e) => {
        setType(e.target.value)
        console.log(e.target.value);
    }

    
    const HandleChange = (e) => {
        console.log(e.target.value);
        const newValues ={
            ...form, 
            [e.target.name]: e.target.value
        }
        console.log(newValues);
        setform(newValues);
    };

    const handleSearch = async () =>{

        const params = new URLSearchParams();

        params.append('q', encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`));
        params.append('type', type);


        const queryString = params.toString();

        const url = 'https://api.spotify.com/v1/search'

        const updateUrl = `${url}?${queryString}`;

        const token = `Bearer ${localStorage.getItem('token')}`;

        const response = await fetchSpotifyAPI(
            updateUrl,
            'GET',
            null,
            'application/json',
            token
        );

        console.log({response});
        setResults(response.tracks.items)

        
    }

    const getDeviseID = async () => {
        const token =`Bearer ${localStorage.getItem('token')}`;
        const response = await fetchSpotifyAPI(
        `https://api.spotify.com/v1/me/player/devices`,
        'GET',
        null,
        'application/json',
        token
        );
        console.log(response);
    }

    const handlePlayMusic = async (song) => {
        const token = `Bearer ${localStorage.getItem('token')}`;
        const data = {
          uris: [song],
        };
        const id_device = '36dddc91b906f2041db7786013cda6fd8c8fcd00';
        const playSong = await fetchSpotifyAPI(
          `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
          'PUT',
          JSON.stringify(data),
          'application/json',
          token
        );
        console.log(playSong);
      };

    const getToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        let codeVerifier = localStorage.getItem('code_verifier');
        console.log({ codeVerifier });
        const url = 'https://accounts.spotify.com/api/token';
        const clientId = '717b6a7118034ed2b672890171ac6528';
        const redirectUri = 'http://localhost:5173/';
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        };
    
        const body = await fetch(url, payload);
        const response = await body.json();
    
        localStorage.setItem('token', response.access_token);
      };
    



    return (
        <div className="p-8">
            <div className="mb-4">
                <input
                name='search'
                    type="text"
                    className="w-full p-2 border rounded shadow"
                    placeholder="Buscar música..."
                    value={form.search}
                    onChange={HandleChange}
                    onKeyDown={handleKeyDown} // Event handler for key presses
                />
            </div>
            <div>
                <button onClick={handleSearch} className="bg-[#18D760] w=[140px] rounded-[5px] text-[15px] p-1 font-bold">Buscar...</button>
                <button onClick={getToken}  className="bg-[#18D760] w=[140px] rounded-[5px] text-[15px] p-1 font-bold">Get Token</button>
                <button onClick={getDeviseID}  className="bg-[#18D760] w=[140px] rounded-[5px] text-[15px] p-1 font-bold">Get Devise ID</button>
            </div>
            <select name="types" onChange={HandleSelectChange}>
                <option value="Valor1">...</option>
                {types.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <p className='text-white text-left text-[15px]'>Artist</p>
            <select name="types" onChange={HandleSelectChange}>

            </select>

            <input 
                placeholder='artist'
                type='text'
                name='artist'
                value={form.artist}
                onChange={HandleChange}
            />
            <ul>
                {songs.map((song, index) => (
                    <li key={index} className="flex items-center bg-white shadow-lg rounded-lg my-2 py-2 px-4">
                        <img src={song.imageUrl} alt={song.name} className="h-16 w-16 rounded-full mr-4" />
                        <span className="font-semibold">{song.name}</span>
                    </li>
                ))}
            </ul>
            
            {results.length > 0 && (
                <div>
                    {results.map((item,idx) => (

                        <div key={item.id} className='text-White flex justify-center items-center'>

                            <img src={item.album.images[0] .url} width={60}/>
                            {idx + 1 + ' ' + item.name}
                            <button
                                className='bg-[#1BD760] w-[140px] rounded-[5px] text-[15px] p-1 font-bold'
                                onClick={() => handlePlayMusic(item.uri)}
                            >Reproducir</button>
                            
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
