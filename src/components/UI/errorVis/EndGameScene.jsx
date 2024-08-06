import React from 'react';
import classes from './style.module.css';

const EndGameScene = ({ error,onClose }) => {

    const DeathScene = ()=>{ 

        return( 
            <div className={`${error.length > 3? classes.modal_error_wrapper:classes.visibilityNone}`}>
                
                <div>
                    death
                    <div>
                        <span onClick={onClose}>retry</span>
                    </div>
                </div>
               
            </div>
        )

    }

  return (
    <DeathScene/>
  )
}

export default EndGameScene