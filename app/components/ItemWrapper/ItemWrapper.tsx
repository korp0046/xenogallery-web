import styles from './itemwrapper.module.css';

function ItemWrapper(props: any) { 
    return (
        <div className={styles.main}>
            <div className={styles.label}>{props.label}</div>
                {props.data.map((el: any, idx: number)=> {
                    if(el.name){
                        return(
                            <div key={idx} className={styles.tag}>{el.name}</div>
                        );
                    } else {
                        return (
                            <div key={idx} className={styles.tag}>{el}</div>
                        );
                    }
                })}
        </div>
    );

  }
  
export default ItemWrapper;