
/*useTabs*/
import { useState } from "react";

export const useTabs = function (initialTab, allContents) {
  // if(!allContents || !Array.isArray(allContents)) {
  //   return;
  // }
  const [currentIndex, setCurrentIndexFn] = useState(initialTab); //currentIndex에는 배열이 담긴다.
  return {
    //객체을 리턴
    currentItem: allContents[currentIndex],
    changeItem: setCurrentIndexFn,
  };
};