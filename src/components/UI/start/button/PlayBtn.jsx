import React from 'react';
import classes from './style.module.css';

const PlayBtn = ({ play }) => {
  return (
    <div className={classes.play_wrapper}>
        <span onClick={play}>PLAY</span>
    </div>
  )
}

export default PlayBtn