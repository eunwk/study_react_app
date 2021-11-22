
export const useConfirm = (massage = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (!onCancel || typeof onCancel !== "function") {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(massage)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };