import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import {
  selectDark,
  useDispatch,
  useSelector,
  userSlice
} from '@/lib/redux';

export default function DarkModeToggle(){
    const dispatch = useDispatch();
    const dark = useSelector(selectDark);

    useMediaQuery(
        {
        query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => {
          dispatch(userSlice.actions.setDark(isSystemDark));
        }
    );

    useEffect(() => {
        if (!dark) {
          document.body.classList.add("light");
        } else {
          document.body.classList.remove("light");
        }
      }, [dark]);

    return (
        <Toggle
        checked={!dark}
        onChange={({ target }: any) => {dispatch(userSlice.actions.setDark(!target.checked))}}
        icons={{ unchecked: "🌙", checked: "🔆" }}
        aria-label="Dark mode toggle"
        />
    );
};