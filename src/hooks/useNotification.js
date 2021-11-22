/*useNotification*/

// hook은 아님, window의 API
// 권한요청 후 알림
export const useNotification = (title, options) => {
    console.log("useNotification");
    if (!("Notification" in window)) {
      return;
    }
    const fireNotif = () => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        new Notification(title, options);
      }
    };
    return fireNotif;
  };
  
  //https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
  //permisstion 종류
  // denied - 거부
  // granted - 허가
  // default - 거부로 인식