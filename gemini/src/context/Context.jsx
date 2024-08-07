import {createContext , useState} from "react";
import run from "../config/gemini";

export const Context= createContext();

const ContextProvider =(props)=>{
 
    const[input,setInput] =useState("");   //to save the input data
    const[recentPrompt,setRecentPrompt] =useState("");   //on clicking send button the input field data will be saved in the recent prompt & will be displayed in tht main component
    const[prevPrompts,setPrevPrompts] =useState([]);   //to store all the input history and display on the recent tab
    const[showResult,setShowResult] =useState(false);  //once it is true it will hide the 4 boxes nd greet text and display the result
    const[loading, setLoading] =useState(false);       //when it is true it will display the loading animation and after getting input data it becomes false to display the data
    const[resultData,setResultData] =useState("false");    // display result

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }



const onSent=async(prompt)=>{
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt!==undefined){
       response=await run(prompt);   //if prompt ius not undefined then we use this prompt
       setRecentPrompt(prompt)
    } else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response=await run(input);
    }
   let responseArray=response.split("**")
   let newResponse="";
   for(let i=0;i<responseArray.length;i++){
    if(i===0||i%2!==1){
        newResponse+=responseArray[i];
   } else{
    newResponse+= "<b>"+responseArray[i]+"</b>"
   }
}
   let newResponse2= newResponse.split("*").join("</br>")
   let newResponseArray=  newResponse2.split(" ");  //whenever we get space it means there is new word & using that we will create array
    for(let i=0;i< newResponseArray.length;i++){
        const nextWord= newResponseArray[i];
        delayPara(i,nextWord+" ")
    }
   setLoading(false)
   setInput("")
}
    


    const contextValue ={                  //this is an object and inside this if we create any variable or function then we can use that funcction or variable anywhere in the project
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


 
    }    
    
    return (
        <Context.Provider value ={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

//to access this context in the project we go to main.jsx and add this contet there
 
