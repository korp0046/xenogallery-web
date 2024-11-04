import { useState, useEffect } from "react";

const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [clickObj, setClickObj] = useState('map');
  const [clickId, setClickId] = useState(null);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [svgPoints, setSvgPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    clicked,
    setClicked,
    points,
    setPoints,
    clickObj,
    setClickObj,
    clickId,
    setClickId,
    svgPoints,
    setSvgPoints
  };
};

export default useContextMenu;