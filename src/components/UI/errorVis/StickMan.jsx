import React, { useEffect, useState } from 'react';
import classes from './style.module.css';
import im1 from './image/1.png';
import im2 from './image/2.png';
import im3 from './image/3.png';

const StickMan = ({ error }) => {

    const Stick = () =>{ 
       return(
        <div className={classes.error_wrapper}>
            <div className={classes.error_conteiner}>
                <div className={classes.error_layout}>
                    <img className={`${error.length > 0 ?classes.visibilityBlock:classes.visibilityNone}`} src={im1} alt="" />
                </div>
                <div className={classes.error_layout}>
                    <img className={`${error.length > 1 ?classes.visibilityBlock:classes.visibilityNone}`} src={im2} alt="" />
                </div>
                <div className={classes.error_layout}>
                    <img className={`${error.length >2?classes.visibilityBlock:classes.visibilityNone}`} src={im3} alt="" />
                </div>
            </div>
        </div>
       )
    }

  return (
    <div><Stick/></div>
  )
}

export default StickMan