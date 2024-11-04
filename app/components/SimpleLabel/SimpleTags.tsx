import styles from './simplelabel.module.css';

export default function SimpleTags(props: any) {
    const tags = props.data;
    return (
        <span>
            {
                tags.split(',').map((el: any, idx: any)=>{
                    return(
                        <span className={styles.flag}>{el}</span>
                    ); 
                })
            }
        </span>
    )
}
