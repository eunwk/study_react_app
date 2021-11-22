import { useEffect, useRef } from "react";

export const useClick = (onClick) => {
  // if (typeof onClick !== "function") {
  //   return;
  // }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      // console.log(element.current);
      element.current.addEventListener("click", onClick);
    }
    //clean up
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
      console.log("unmount");
    };
  }, []); //빈 배열을 넣어주므로써  update 될때마다 실행되지 않고, 초기 1회만 실행 된다.
  return element;
};