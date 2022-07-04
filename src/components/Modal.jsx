import React from 'react'

const Modal = ({movie}) => {
    
// console.log(movie.tagline);
  return (
        <div className='movie__popup'>
            <h1>{movie.title}</h1>
            <div>
                <img src={`https://image.tmdb.org/t/p/w200/`+movie.poster_path} alt="movie poster"/>
             </div>
            <p>{movie.overview}</p>
            <h2>Vote:{movie.vote_average}</h2>
        </div>  
  )
}

export default Modal