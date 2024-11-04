'use client'

import Splash from '../Splash/Splash';

/* Instruments */
import {
  getRoomsAsync,
  selectActiveRoom,
  selectPage,
  selectUsername,
  useDispatch,
  useSelector
} from '@/lib/redux';


export const Main = () => {
    const dispatch = useDispatch();
    const username = useSelector(selectUsername);
    const room = useSelector(selectActiveRoom);
    const page = useSelector(selectPage);
  
    return (
      <Splash />
    )
  }