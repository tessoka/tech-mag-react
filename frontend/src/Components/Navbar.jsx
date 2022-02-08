import React from 'react';
import TechMagLogo from '../img/tech-mag-logo_w.png'
import TechMagIcon from '../img/tech-mag-icon.png'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [msg, setMsg] = React.useState();

  const navigate = useNavigate();

  const handleClickUnsub = async() => {
    try{
      const response = await axios.post('http://localhost:5000/unsubscribe', {token: localStorage.getItem("secureToken")});
      localStorage.clear();
      setMsg(response.data.msg);
      setTimeout(()=> {navigate('/'); setMsg()}, 3000);
    }catch (err){
      console.log(err);
    }
  };

  return (
    <div className='navbar'>
        <div className='logo-box'>
          <Link className='logo-1' to='/'><img src={TechMagLogo} alt="TechMagLogo" /></Link>
          <Link className='logo-2' to='/'><img src={TechMagIcon} alt="TechMagIcon" /></Link>
        </div >
        { localStorage.getItem("userName") && 
        <>
        <div className='welcome'>
          <h2>Welcome {localStorage.getItem("userName")}</h2>
        </div>
        <div>
          <button className="btn button-4" onClick={()=> handleClickUnsub()}>Unsubscribe</button>
        </div>
        </>
        }

        {msg && <p className='unMsg'>{msg}</p>}
    </div>
  )
}

export default Navbar;
