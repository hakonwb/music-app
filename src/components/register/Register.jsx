
import React, { useState } from 'react';
import { fetchSpotifyAPI } from "../../api/spotifyAPI"
import { useNavigate } from 'react-router-dom';
import { getDataAuth,authFLow } from '../../setup';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email, 'Password:', password);

        console.log(response);
    };

    const navigate = useNavigate();

   // const handlelogin = async() => {
        //const client_ID = '717b6a7118034ed2b672890171ac6528';
        //const client_secret= '0b4471e8ed8e46d5aa121cf7273e70ba';
        //const body = 'grant_type=client_credentials';
        //const token = 'Basic ' + btoa(client_ID + ':' +client_secret);
        //const response = await fetchSpotifyAPI("https://accounts.spotify.com/api/token", 'POST', body,'application/x-www-form-urlencoded', token);


        //localStorage.setItem('token', response.access_token);

        //navigate('/Dashboard');
        //console.log(response);
    //}

    const handleLogin = async () => {
        const codeChallengeProm = await getDataAuth ();
        authFLow(codeChallengeProm);
    }

    

    return (
        <div className="h-screen flex bg-gray-100">
            <div className="py-12 px-10 w-100 max-w-md m-auto bg-white rounded-lg border border-gray-300 shadow-xl" >
                <img src="https://www.xtrafondos.com/wallpapers/espiral-deformada-en-rosa-y-azul-3599.jpg" />
                <h2 className="text-2xl font-bold text-center text-gray-700">Music App</h2>
                <p className="mt-3 text-center text-gray-500">Ingresa para descubrir más música</p>
                <form className="mt-10" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 
                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        className="mt-4 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 
                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        required 
                    />
                    <button 
                        type="submit"
                        className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none"
                        onClick={handleLogin}
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
    
}

export default Register