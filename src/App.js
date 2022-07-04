import { useEffect,useState } from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {
  const [token, setToken] = useState();
  
 

  function recieveTokenItem(key){
    localStorage.removeItem(key);
    setToken(localStorage.getItem('token'))
  }

  function settingTokenItem(key,value){
    localStorage.setItem(key,value);
    setToken(localStorage.getItem("token"));
  }


  useEffect(() => {
    setToken(localStorage.getItem("token"));
  })

  return (
    <div className="App">
      {
      !token
      ?  
      <Login settingTokenItem={settingTokenItem}/>
      :
      <Home recieveTokenItem={recieveTokenItem}/>}
    </div>
  );
}

export default App;
