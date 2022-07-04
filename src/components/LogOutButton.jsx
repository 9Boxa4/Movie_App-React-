import React from 'react'

const LogOutButton = (props) => {

   const handleClick=(e)=>{
        props.recieveTokenItem('token')
        }
        return (
    <button className="logout__button" onClick={handleClick}>
   { props.children}
    </button>
  )
}

export default LogOutButton