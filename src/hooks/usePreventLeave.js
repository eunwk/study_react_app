/*usePreventLeave.js*/


//페이지를 닫거나 새로고침 할때 종료하겠냐는 컨펌창이 뜸
export const usePreventLeave = () => {
    const listener = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const enablePrevent = () => {
      window.addEventListener("beforeunload", listener);
    };
    const disablePrevent = () => {
      window.removeEventListener("beforeunload", listener);
    };
  
    return { enablePrevent, disablePrevent };
  };