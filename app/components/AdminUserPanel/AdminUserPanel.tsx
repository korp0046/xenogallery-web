'use client'

/* Core */
import { useState, useEffect } from 'react';

/* Instruments */
import {
  chatSlice,
  modalSlice,
  navSlice,
  selectChat,
  selectChatStored,
  selectEditableUser,
  selectToken,
  selectUserList,
  selectUsername,
  useDispatch,
  useSelector,
  userSlice
} from '@/lib/redux';
import styles from './adminuserpanel.module.css';
import axios from 'axios';
import EditorStringSimple from '../Editors/EditorStringSimple';
import _ from 'lodash';
import EditorDynamicSelect from '../Editors/EditorDynamicSelect';
import { arrayUpsert } from '@/lib/util/util';

function UserRow(props: any) {
    const dispatch = useDispatch();

    const openEditUserTray = () => {
        dispatch(userSlice.actions.setEdit(props.data));
        dispatch(navSlice.actions.setTrayPage('edituser'));
        dispatch(modalSlice.actions.openTray(false));
        dispatch(navSlice.actions.setTrayState(true));
    }
    
    return(
        <div 
            className={styles.usergrid}
            onClick={()=>openEditUserTray()}
        >
            <div>{props.data.name}</div><div>{props.data.role}</div><div>{props.data.email}</div>
        </div>
    )
}

export function EditUser() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const editableUser = useSelector(selectEditableUser);
    const list = useSelector(selectUserList);
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState(editableUser ? editableUser.email : '');
    const [newRole, setNewRole] = useState(editableUser ? editableUser.role : 'user');

    useEffect(()=> {
        setNewPassword('');
        setNewEmail(editableUser ? editableUser.email : '');
        setNewRole(editableUser ? editableUser.role : 'user');
    }, [editableUser]);

    const updateUserField = async (username: string, field: string, newValue: string) => {
          if(token){
              try {
                  let headers = {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer: ${token}`
                  };
                  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/users/update/${field}`, { value: newValue, username: username } ,{ headers: headers });
                  if(res.status == 200){
                    const temp: any = _.cloneDeep(editableUser);
                    temp[field] = newValue;
                    dispatch(userSlice.actions.setEdit(temp));
                    const tempArr: any = _.cloneDeep(list);
                    arrayUpsert(tempArr, "username", username, temp);
                    dispatch(userSlice.actions.setList(tempArr));

                  }
              } catch (e) {
                  console.error(e);
              }
          }
      }
    


    if(editableUser){
        return(
            <div>
                <EditorStringSimple value={newEmail} action={(x: string)=>setNewEmail(x)} label="New Email"/><button onClick={()=>updateUserField(editableUser.username, 'email', newEmail)}>SAVE</button>
                <EditorStringSimple value={newPassword} action={(x: string)=>setNewPassword(x)} label="New Password"/><button onClick={()=>updateUserField(editableUser.username, 'password', newPassword)}>SAVE</button>
                <EditorDynamicSelect value={newRole} list={['user', 'admin', 'superuser']} action={(x: string)=>setNewRole(x)} label="New Role"/><button onClick={()=>updateUserField(editableUser.username, 'role', newRole)}>SAVE</button>
    
            </div>
        )

    } else {
        return null;
    }

}

export default function AdminUserPanel() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const list = useSelector(selectUserList);

  useEffect(()=> {
    (async function() {
        if(token){
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/users`, { headers: headers });
                dispatch(userSlice.actions.setList(res.data));
            } catch (e) {
                console.error(e);
            }
        }
      })();

}, [token]);

  return (
    <div className={styles.main}>
        ADMINUSERPANEL
        <div className={styles.wrapper}>
            {
                list.map((el: any, idx: number)=> {
                    return(<UserRow key={idx} data={el} />);
                })
            }
        </div>
    </div>
  )
}
