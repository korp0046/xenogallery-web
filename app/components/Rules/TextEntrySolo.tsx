"use client";
import { docBodyProcessor, gameDocMapper, md2html } from '@/lib/util/util';
import styles from './rules.module.css';
import corestyles from '../../styles/layout.module.css';
import { useRouter } from 'next/navigation';

export function TextEntrySolo(props: any) {
    const router = useRouter();
    return(
        <div className={corestyles.reader}>
            <div className={styles.rulemain}>
                {props.children}
            </div>
        </div>
    )
}