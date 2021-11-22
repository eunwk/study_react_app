/*useFullScreen.js*/
import { useRef } from "react";

// 버튼을 누르면 사진 영역이 토글, f11을 누르면 document 토글
// 정상작동
export const useFullScreen = () => {
  const element = useRef();

  const getFullscreenElement = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  };

  const toggleFullScreen = ({ target }) => {
    //const clickElem = target;

    if (getFullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozExitFullscreen) {
        document.mozExitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      // clickElem.classList.remove("active");
    } else {
      //document.documentElement.requestFullscreen().catch(console.log);  //전체화면
      if (element.current) {
        if (element.current.requestFullscreen) {
          element.current.requestFullscreen(); //특정영역
        } else if (element.current.mozRequestFullscreen) {
          element.current.mozRequestFullscreen();
        } else if (element.current.webkitRequestFullscreen) {
          element.current.webkitRequestFullscreen();
        } else if (element.current.msRequestFullscreen) {
          element.current.msRequestFullscreen();
        }
      }
      //clickElem.classList.add("active");
    }
  };

  return { element, toggleFullScreen };
};