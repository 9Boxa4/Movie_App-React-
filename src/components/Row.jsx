import React from 'react'
import { useEffect,useState } from 'react';
import { apiKey } from "./config/ApiKey";
import Modal from './Modal';

function Row({genId,getMovieState,selectedMovieIndex,popUp}) {
    const [movies,setMovies] =useState([]);
    
    const fetchData = async (GENRE_ID) => {
        const response= await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${GENRE_ID}&page=1&${apiKey}`)
        const json = await response.json();
        const data= await json.results
        setMovies(data)
        setMovies(data.sort(() => Math.random() - 0.5)) 
    }

    useEffect(()=>
    {      
      fetchData(genId)
      .catch(console.error);
    },[])

    //sending movies API to the parent
    getMovieState(movies)

  return (
<>
     {movies.map((movie,index)=>
        (
              movie.genre_ids.map(movieApiId=>
                {
                  return movieApiId === genId
                  && 
                  <li  key={movie.id} className={`row__poster ${
                    index === selectedMovieIndex 
                  ? 
                  "active" : null
                  } ` }>
                    <img src={'https://image.tmdb.org/t/p/w200/'+movie.poster_path}/>
                  </li> 
                }
                )
                ))}
                {movies.map((mov,ind)=>(
                  mov.genre_ids.map(movieApiId=>{
                    if(movieApiId === genId && ind ===selectedMovieIndex && popUp)
                    {
                      return <Modal key={'modal'+movieApiId} movie={movies.length? mov:null}/>
                    }
                  })
                ))}
</>
  )
}

export default Row
