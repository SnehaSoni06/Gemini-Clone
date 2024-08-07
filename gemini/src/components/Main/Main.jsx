import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const  {onSent,recentPrompt,showResult,loading,resultData,input,setInput}=useContext(Context)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSent()
    }
  }


  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src= {assets.user_icon} alt=""/>
        </div>
      
      <div className="main-container">

        {!showResult
        ?<>
              <div className="greet">
            <p><span>Hello, User.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">

            <div className="card">
                <p>Suggest beautiful places to see on upcoming road trip</p>
                <img src={assets.compass_icon} alt=""/>
            </div>
            <div className="card">
                <p>Briefly summarise this concept:urban planning</p>
                <img src={assets.bulb_icon} alt=""/>
            </div>
            <div className="card">
                <p>Brainstorm team bonding activities</p>
                <img src={assets.message_icon} alt=""/>
            </div>
            <div className="card">
                <p>Improve readibility of following code</p>
                <img src={assets.code_icon} alt=""/>
            </div>
        </div>
        </>
        : <div className="result">
              <div className="result-title">
                  <img src={assets.user_icon} alt=""/>
                  <p>{recentPrompt}</p>
              </div>

              <div className="result-data">
                <img src={assets.gemini_icon} alt=""/>
                {loading?
                <div className="loader">
                    <hr/>
                    <hr/>
                    <hr/>
                </div>
                :  <p dangerouslySetInnerHTML={{__html:resultData}}></p>       //The dangerouslySetInnerHTML attribute in React is used to directly insert HTML content into a React component
              }
                   
                </div>

          </div>
      }
       

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" onKeyDown={handleKeyDown} placeholder="Enter a prompt here"/>
            <div>
              <img src={assets.gallery_icon} alt=""/>
              <img src={assets.mic_icon} alt=""/>
             {input? <img onClick={()=>onSent()} src={assets.send_icon} alt=""/> :null} 
            </div>
          </div>
          <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>

      </div>
    </div>
  )
}

export default Main
