/*useTitle*/
import { useState, useEffect } from "react";

export const useTitle = (inintialTitle) => {
  const [title, setTitle] = useState(inintialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle; //return을 안해도 타이틀 바뀜. 호출하기 위해서는 retruen 을 해주어야 함.
};
