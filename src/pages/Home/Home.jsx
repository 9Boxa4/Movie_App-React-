import React, {useState,useEffect} from "react";
import './Home.css'
import genres from '../../Genres.json'
import Row from "../../components/Row";
import LogOutButton from "../../components/LogOutButton";

function Home({recieveTokenItem}) {
const [state,setState] = useState({selectedRowIndex:0,selectedMovieIndex:0,popUp:false})
let moviesList;

//getting movies from the child element(I know we must lift up state,but at this point it was easier to fetch like this)
const getMovieState=(movies)=>{
  moviesList=movies
}
    
const handleKeyPress = ({key}) =>{
  const maxMovieIndex = moviesList.length? moviesList.length-1:0

  switch (key) {
    case "ArrowUp":
      if( state.selectedRowIndex <=0)return;
      //changing the row index for negative 1
        setState(state=>({...state,selectedRowIndex:state.selectedRowIndex-1}))

        //changing the row we will restart the movie index on "0" on the new row
        setState(state=>({...state,selectedMovieIndex:0}))

      //going up the row the scroll will go by the amount of the 1/3 of the row height (so we can see the previus rows)
      window.scrollBy({top:-document.querySelector('.slider__container').clientHeight/1.3, left:0,behavior: 'auto'})

      //will scroll the previus row to the begining of the scroll
      document.querySelectorAll(`.slider__container ul`)[state.selectedRowIndex].scrollBy({top:0, left:-15000,behavior: 'smooth'})
     break;

      case "ArrowDown":
        if(state.selectedRowIndex >= genres.genres.length-1)return;

             //changing the row index for positive 1
      setState(state=>({...state,selectedRowIndex:state.selectedRowIndex+1}))
        
      //changing the row we will restart the movie index on "0" on the new row
      setState(state=>({...state,selectedMovieIndex:0}))

      //going down the row the scroll will go by the amount of the 1/3 of the row height (so we can see the previus rows)
      window.scrollBy({top:document.querySelector('.slider__container').clientHeight/1.3, left:0,behavior: 'auto'})

      //will scroll the previus row to the begining of the scroll
      document.querySelectorAll(`.slider__container ul`)[state.selectedRowIndex].scrollBy({top:0, left:-15000,behavior: 'smooth'})
      
      break;

      case "ArrowLeft":
        if(state.selectedMovieIndex<=0)return;
        //changing the movie state by-1
        setState(state=>({...state,selectedMovieIndex:state.selectedMovieIndex-1}))

        //while going left will scroll the row by the width of the poster img
        document.querySelectorAll(`.slider__container ul`)[state.selectedRowIndex].scrollBy({top:0, left:-document.querySelector(`.row__poster img`).clientWidth,behavior: 'smooth'})
      break;

      case "ArrowRight":
        if(state.selectedMovieIndex>=maxMovieIndex)return;

        //changing the movie state by positive 1
        setState(state=>({...state,selectedMovieIndex:state.selectedMovieIndex+1}))

        //while going right will scroll the row by the width of the poster img
        document.querySelectorAll(`.slider__container ul`)[state.selectedRowIndex].scrollBy({top:0, left:document.querySelector(`.row__poster img`).clientWidth,behavior: 'smooth'})
 
      break;

      case "Enter":
        setState(state=>({...state,popUp:true}))
      break;

      case "Escape":
        setState(state=>({...state,popUp:false}))
      break;
  
    default:
      console.log(`none of the above`);
      break;
  }
}

  useEffect(()=>{
    window.addEventListener("keydown",handleKeyPress)

    return()=> window.removeEventListener('keydown',handleKeyPress)
  },[state])
  
  return (
    <div className='movie__container'>
      <LogOutButton recieveTokenItem={recieveTokenItem} >Log out</LogOutButton>
    
        {[...genres.genres].reverse().map((gen,i)=>
        {
            
        return    <div className="slider__container" key ={i} > 
          <h1 className="genre-name" key={gen.id+'h1'}>{gen.name} </h1>
          <ul  className="movie__list" key={gen.id+'ul'}>
            <Row 
            selectedMovieIndex={
              i===state.selectedRowIndex 
              && 
              state.selectedMovieIndex
            } 
            getMovieState={getMovieState} 
            genres={genres.genres}  
            genId={gen.id} 
            popUp={
              state.popUp 
              && 
              state.popUp}
            />
          </ul>
     </div>
        }
          )}
  </div>
  )
}

export default Home