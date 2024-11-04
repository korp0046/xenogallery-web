/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectEditableUser = (state: ReduxState) => state.user.edit;
export const selectUserList = (state: ReduxState) => state.user.list;
export const selectUsername = (state: ReduxState) => state.user.username
export const selectRole = (state: ReduxState) => state.user.role;
export const selectDark = (state: ReduxState) => state.user.dark;
export const selectToken = (state: ReduxState) => state.user.token;
export const selectIsSuperuser = (state: ReduxState) => {
    return (state.user.role && state.user.username && (state.user.role == 'admin' || state.user.role == 'superuser'))
};