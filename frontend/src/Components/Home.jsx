import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {svgPath} from '../svgPath'

const Home = (  ) => {

    const [ subName, setSubName ] = useState("")
    const [ subMail, setSubMail ] = useState("")
    const [ isActive, setIsActive ] = useState(false)
    // const [ userName, setUserName ]= useState("")
    const navigate = useNavigate()
  
    useEffect(() => {
      const userCheck = async () => {
        try {
          const tokenCheck = {secureToken: localStorage.getItem('secureToken')}
          const response = await axios.post('http://localhost:5000/usercheck', tokenCheck)
          console.log(response.data)
          if ( response.data.name ) {
            localStorage.setItem('userName', response.data.name)
            navigate('/news')
          }
        } catch (error) {
          console.log(error)
        }
      }
      userCheck()
    }, [])

    const handleClickSubscribe = async (e) => {
      e.preventDefault()
      
      if(subName !== '' && subMail !== '' ){
        setIsActive(!isActive)
        try {
          const res = await axios.post('http://localhost:5000/subscribe', {username: subName, mail: subMail})
          localStorage.setItem('secureToken', res.data.token)
          localStorage.setItem('userName', res.data.name)
          setTimeout(() => {
            navigate('/news')
          },1500)
        } catch (err) {
          console.log(err)
        }
      }
    }

    return (
      <div className='home-container'>
        <h2>Welcome to our Tech Magazine site!</h2>
        <form>
          <input type="text" placeholder="Name" value={subName} onChange={(e) => {setSubName(e.target.value)}}/>
          <input type="text" placeholder="Mail" value={subMail} onChange={(e) => {setSubMail(e.target.value)}}/>
          {/* <button type="submit" className='btn btn-cta' onClick={handleClickSubscribe}>Subscribe!</button> */}
          <div className="wrapper">
            <button onClick={handleClickSubscribe} className={isActive && subName !== '' && subMail !== '' ? "is_active button" : "button"}>
              <span>Subscribe!</span>
              <div className="success">
                <svg className='svg' viewBox="0 0 29.756 29.756" >
                  <path d={svgPath}/>
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    )
}

export default Home;
