
/*useInput.js*/
import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue); //value = "Mr.", setValue = ƒ ()
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
      console.log(willUpdate, value); //true 또는 false를 반환
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange }; //return 시 value 만 넘기면 string이 name = "Mr/"} , {} 로 감싸면 객체가 넘어감.
};