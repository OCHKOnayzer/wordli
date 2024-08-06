import React, { useEffect, useState } from 'react'
import dataWord from '../others/words/words.jsx';
import PlayBtn from './start/button/PlayBtn.jsx';
import classes from './style.module.css';
import StickMan from './errorVis/StickMan.jsx';
import EndGameScene from './errorVis/EndGameScene.jsx';
import refresh from '../others/image/refresh-square-svgrepo-com.svg';
import info from '../others/image/info-square-svgrepo-com.svg';
const Game = () => {
    const [tip,setTip] = useState(1);
    const [max,setMax] = useState(1);
    const [wordID,setWordId] = useState(1);
    const [quizWord,setQuizWord] = useState(); 
    const [quizWordLength,setQuizWordLength] = useState() 
    const [shafledState,setShafledState] = useState([]);
    const [beforeRandom,setBeforeRandom] = useState([]);
    const [result, setResult] = useState([]);
    const [error,setError] = useState([]);
    const [score,setScore] = useState(0);
    const [refreshCount,setRefreshCount] = useState(0)
    const [infoState,setInfoState] = useState(false)
    const [contextState,setContextState] = useState()

    const randomFnc = ()=> {
        const currentWord = dataWord.find(word => word.word_id === wordID);
        setContextState(currentWord.context)
        const word = currentWord.word.split('');
        const test = currentWord.word
        setQuizWord(test)
        console.log(quizWord)
        const shuffledArr = word.sort(()=> Math.random()-0.5);
        setShafledState(shuffledArr)
        const wordLenght = word.length;
        setQuizWordLength(wordLenght)
    }
    
    const randomMath = () => { 
        setMax(dataWord.length);
        const randomNumb = Math.floor(Math.random() * max)+1;
        setWordId(randomNumb);
    }

    useEffect(()=>{ 
        randomFnc()
        setResult('');
    },[wordID])

    useEffect(()=>{ 
        randomMath();
    },[max])

    useEffect(()=>{ 
        console.log(error)
    },[error])

   const play = () =>{ 
    randomMath();
   };

   const onInfo = () =>{ 
    if(tip>0){ 
        setTip(tip-1);
        setInfoState(true)
    }
   }

   const addTip = () =>{ 
    if(score%3 === 0){ 
        setTip(tip+1);
    }
   }

    const selectedLetter = (letter) =>{ 

        if(result.length < quizWordLength ){ 
            setResult(prevResult => [...prevResult, letter]);
        }

    }

    const deSelectLetter = (letter) =>{ 

        const letterIndex = result.indexOf(letter);
    
        if(letterIndex !== -1){ 
            setResult(prevResult => {
                const newResult = [...prevResult];
                newResult.splice(letterIndex, 1);
                return newResult;
            });
        }

    }

    const checkWord = () =>{ 
      if(result.length > 0){ 
        const resJoin = result.join('');
        if(resJoin === quizWord){ 
            randomMath();
            setResult([])
            setScore(score+1);
            setInfoState(false);
            addTip();
          }else{ 
            setError(prevError => [...prevError,error])
            console.log(error)
          }
      }
    }

    const onClose =()=>{ 
        setError([]);
        randomFnc();
        setResult('');
        setScore(0);
        setRefreshCount(0);
    }
    const ref = ()=>{ 
        randomMath();
        setRefreshCount(refreshCount+1)
        if(tip>0){
            setTip(tip-1)
        }
        setInfoState(false);
    }

    const DSnone = { 
        display:"none"
    }
    const DSblock = { 
        display:"block"
    }

    const InfoConteiner = ()=>{ 
        if(infoState === true){ 
            return(
            <div className={classes.tip_Wrapper}>
                {contextState}
            </div>
            )
        }else{ 
            return ( 
                <div>
                </div>
            )
        }
        
    }

  return (
    <div className={classes.game_conteiner}>
        <EndGameScene onClose={onClose} error ={error}/>
        <div className={classes.result_wrapper}>
            <StickMan error = {error}/>
            <div className={classes.count_wrapper}>
                <span>
                    Счет:{score} 
                </span>
                <span>
                    Пропусков:{refreshCount}
                </span>
                <span>Подсказок:{tip}</span>
            </div>
        </div>
        
        <div className={classes.wordli_wrapper}>
        
        <div className={classes.wrapper_content}>
         {
                 [...result].map((item,index)=>( 
                   
                    <div onClick={()=> deSelectLetter(item)}>
                        {item}
                    </div>
                ))
            }
         </div>
         

        <div className={classes.wrapper_content}>
        {
            shafledState.map((item,index)=>( 
                <div onClick={()=> selectedLetter(item)}>
                    {item}
                    
                </div>
            ))
        }
        </div>
        <button onClick={checkWord}><span>Проверить</span></button><div className={classes.button_conteiner} ><div onClick={ref}> <img src={refresh} alt="" /> </div><div onClick={onInfo}> <img src={info} alt="" /></div></div>
        <InfoConteiner/>
        </div>
       
    </div>
  );
};

export default Game