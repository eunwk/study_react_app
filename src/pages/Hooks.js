import React from "react";
import { Button, Space } from "antd";
import Styles from "./HooksStyles";
import { useInput } from "../hooks/useInput";
import { useAxios } from "../hooks/useAxios";
import { useBeforeLeave } from "../hooks/useBeforeLeave";
import { useClick } from "../hooks/useClick";
import { useConfirm } from "../hooks/useConfirm";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFullScreen } from "../hooks/useFullScreen";
import { useNetwork } from "../hooks/useNetwork";
import { useNotification } from "../hooks/useNotification";
import { usePreventLeave } from "../hooks/usePreventLeave";
import { useScroll } from "../hooks/useScroll";
import { useTabs } from "../hooks/useTabs";
import { useTitle } from "../hooks/useTitle";

function Hooks() {
  // const maxLen = value => value.length <= 10;
  //const maxLen = value => !value.includes("@");
  const regExOnlyEng = /^[a-zA-Z]*$/;
  const maxLen = (value) => regExOnlyEng.test(value.substr(-1, 1)); // substr 마지막 자리 1개를 잘라온다. 영어만 입력 가능. (중간에 한글이 들어감;;;;)
  // const maxLen = (value) => value.includes(regExOnlyEng);
  const name = useInput("Mr.", maxLen); //name = {value: "Mr/"} . name에 객체가 담김.

  //useAxios
  const { loading, data, error, refetch } = useAxios({
    url: "https://api.androidhive.info/contacts/",
  });
  console.log(
    `Loding: ${loading},\nerror: ${error},\ndata: ${JSON.stringify(data)}`
  );

  // useBeforeLeave
  const beforeLife = () => {
    console.log("Don't leave");
  };
  useBeforeLeave(beforeLife);

  // useClick
  const sayHello = () => console.log("hello");
  const title = useClick(sayHello);

  //useConfirm
  const deleteWorld = () => console.log("Delete the world!");
  const abort = () => console.log("Aborted!");
  const ConfirmDelete = useConfirm("are you sure", deleteWorld, abort);

  // useFadeIn
  const fadeInH1 = useFadeIn(5);
  const fadeInP = useFadeIn(4, 3);

  // useFullScreen
  const { element, toggleFullScreen } = useFullScreen();

  // useNetwork
  const handleNetworkChange = (onLine) => {
    console.log(onLine ? "Online" : "Offline");
  };
  const onLine = useNetwork(handleNetworkChange);

  // useNotification
  const triggerNotif = useNotification("can I steal your kimchi?", {
    body: "I love kimchi",
  });

  // usePreventLeave
  const { enablePrevent, disablePrevent } = usePreventLeave();

  // useScroll
  const { y } = useScroll();

  // useTab
  const content = [
    {
      tab: "section 1",
      content: "I'm the content of the Section 1",
    },
    {
      tab: "section 2",
      content: "I'm the content of the Section 2",
    },
  ];

  const { currentItem, changeItem } = useTabs(0, content);

  // useTitle
  const titleUpdater = useTitle("Hook Loding....");

  return (
    <Styles>
      <div className="item">
        <h1 className="tit">1. useInput</h1>
        <input
          placeholder="Name"
          value={name.value}
          onChange={name.onChange}
        ></input>
        <br />
        {/* <input placeholder="Name" {...name}></input> */}
        {/* {...}을 쓰면 name안에 들어있는 값을 그대로 풀어서 입력 한다. */}
      </div>

      <div className="item">
        <h1 className="tit">2. useAxios</h1>
        <h2>{data && data.status}</h2>
        <h3>{loading && "Loding2"}</h3>
        <Button onClick={refetch}>refetch</Button>
      </div>

      <div className="item">
        <h1 className="tit">3. useBeforLeave</h1>
        <p>
          마우스 포인터가 페이지를 벗어나 브라우저 상단 탭 쪽으로 이동하면 발생
        </p>
      </div>

      <div className="item">
        <h1 className="tit">4. useClick</h1>
        <Button ref={title}>useClick</Button>
        <p>엘리먼트에 동적으로 이벤트를 추가하고 clen-up 한다.</p>
      </div>

      <div className="item">
        <h1 className="tit">5. useConfirm</h1>
        <Button onClick={ConfirmDelete}>Delete the world</Button>
      </div>

      <div className="item">
        <h1 className="tit">6. useFadeIn</h1>
        <h1 {...fadeInH1}>hi</h1>
        <p {...fadeInP}>일이삼사오육칠팔</p>
      </div>

      <div className="item">
        <h1 className="tit">7. useFullScreen</h1>
        <div
          style={{ position: "relative" }}
          ref={element}
          id="elem-fullscreen"
        >
          <img
            src="https://cdn2.wanderlust.co.uk/media/1028/cropped-shutterstock_497799013.jpg?anchor=center&mode=crop&width=1440&height=540&format=auto&quality=80&rnd=131915974290000000"
            style={{ width: "100%" }}
          />
          <button
            style={{ position: "absolute", right: "20px", bottom: "20px" }}
            id="fs-toggle"
            onClick={toggleFullScreen}
          >
            확대
          </button>
        </div>
      </div>

      <div className="item">
        <h1 className="tit">8. useNetwork</h1>
        <p>{onLine ? "Online" : "Offline"}</p>
      </div>

      <div className="item">
        <h1 className="tit">9. useNotification</h1>
        <Button onClick={triggerNotif}>Notification</Button>
      </div>

      <div className="item">
        <h1 className="tit">10. usePreventLeave</h1>
        <p>페이지를 닫거나 새로고침 할때 종료하겠냐는 컨펌창이 뜸</p>
        <Space>
          <Button onClick={enablePrevent}>Protect</Button>
          <Button onClick={disablePrevent}>Unrotect</Button>
        </Space>
      </div>

      <div className="item">
        <h1 className="tit">11. useScroll</h1>
        <h1
          style={{
            position: "fixed",
            top: 0,
            right: 20,
            color: y > 200 ? "red" : "blue",
          }}
        >
          Section1
        </h1>
      </div>

      <div className="item">
        <h1 className="tit">12. useTab</h1>
        <Space>
          {content.map((section, index) => (
            <Button
              onClick={function () {
                changeItem(index);
              }}
            >
              {section.tab}
            </Button> //section은 content 배열의 각 아이템을 변수로 받은 것
          ))}
        </Space>
        <div>{currentItem.content}</div>
      </div>

      <div className="item">
        <h1 className="tit">13. useTitle</h1>
      </div>
    </Styles>
  );
}
export default Hooks;
