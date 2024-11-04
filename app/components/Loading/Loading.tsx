import styles from './loading.module.css';
import corestyles from '../../styles/layout.module.css';
import { useState } from 'react';

function Loading(props: any) { 
    return (
        <div className={styles.main}>
            <img src="/branding/logo.svg" />
        </div>
    );

  }
  
export default Loading;