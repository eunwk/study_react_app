import { useEffect } from "react";

//마우스 포인터가 페이지를 벗어나 브라우저 상단 탭 쪽으로 이동하면 발생

export const useBeforeLeave = (onBefore) => {
  // if (typeof onBefore !== "function") {
  //   return;
  // }
  const handle = (event) => {
    //console.log("leaving");
    const { clientY } = event;
    //마우스 포인터가 위로 벗어났을 때만 실행
    if (clientY <= 0) {
      onBefore();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => {
      document.removeEventListener("mouseleave", handle);
    };
  }, []);
};