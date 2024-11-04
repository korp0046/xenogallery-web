'use client'

/* Core */
import { useEffect, ReactElement } from 'react';

/* Instruments */
import {
    selectActiveRoom,
    selectToken,
    selectUsername,
    useDispatch, useSelector, userSlice,
} from '@/lib/redux';
import Loading from '../Loading/Loading';
import { useRouter } from 'next/navigation';

interface LoginProviderProps extends React.PropsWithChildren {
    children: ReactElement
  }

export default function LoginProvider(props: LoginProviderProps){
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const username = useSelector(selectUsername);
    const roomId = useSelector(selectActiveRoom);

    useEffect(()=>{
        if(!token){
            let potentialToken = localStorage.getItem("ertoken");
            if(potentialToken && potentialToken.length > 100){
              dispatch(userSlice.actions.setToken(potentialToken));
            } else {
                router.push(`/login`);
            }
        }

      },[]);

    if(!token){
        return(<Loading />);
    } else {
        return(
            <>
                {props.children}
            </>
        );
    }
}