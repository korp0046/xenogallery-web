import styles from './simpletagwrapper.module.css';

function TagWrapper(props: any) {
    const dataArray = typeof props.data == 'string' ? String(props.data).split(',') : props.data;
    if(dataArray && dataArray.length > 0){
        if(props.vertical){
            return (
                <div  className={styles.tagwrapperv}>
                    {props.data.map((el: any, idx: number)=> {
                        return(
                            <div key={idx} className={styles.tag}>{el}</div>
                        );
                    })}
                </div>
            );
        } else {
            return (
                <div  className={props.label ? styles.tagsuperwrapper: styles.tagwrapper}>
                    { props.label ? <div className={styles.label}>{props.label}</div> : null }
                    <div className={props.label ? styles.tagwrapperalt : styles.tagwrapper}>
                        {props.data.map((el: any, idx: number)=> {
                            return(
                                <div key={idx} className={styles.tag}>{el}</div>
                            );
                        })}
                    </div>
                </div>
            );
        }

    } else {
        return null;
    }

  }
  
export default TagWrapper;