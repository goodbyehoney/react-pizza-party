import React from 'react'
import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
  return (
    <h1 className={styles.root}>
    <span>  🫠 </span>
        <br/>
        На жаль, ми нічого не знайшли
      </h1>
  )
};

export default NotFoundBlock;